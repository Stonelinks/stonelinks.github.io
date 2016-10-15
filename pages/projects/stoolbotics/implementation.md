---
title: Implementation - Stoolbotics
---

[Home](/projects/stoolbotics/)
|
[Download](/projects/stoolbotics/download/)
|
[Quickstart](/projects/stoolbotics/quickstart/)
|
[Docs](/projects/stoolbotics/use/)
|
[About](/projects/stoolbotics/implementation/)

Many technical challenges were overcome during the development of Stoolbotics, but it was a lot fun to write! To take a look at the code yourself, here is a [link](https://github.com/Stonelinks/Stoolbotics) to our GitHub. Choice algorithms and segments of the code will be explained and highlighted in this section.

## Symbolics

In order to properly make use of the json file that describes robots, a symbolic solving engine had to be implemented to evaluate arbitrary symbolic expressions that users specify. This means that given a symbolic string like `rot(h1, q1)`, the solver knows what the values of h1 and q1 are, and knows how to call the `rot()` function on them and generate a numeric answer. This solver is also used for evaluating joint parameters as a function of time. For example, given the joint parameter `.001*cos(t) + PI / 2`, spit out the correct answer for a given time `t`, and be able to recognize special cases of variables (in this case PI) that are not first order robot class variables.

To accomplish this, the robot object contains two dictionaries, `\_d` and `syms`. As you probably could have guessed, `syms` contains the symbolic expressions much in the same state as they are in the configuration file. At every time step, this syms dictionary is parsed and evaluated into numeric values that are entered into the other dictionary, `\_d`. This has the advantage of being able to set any string into the syms dictionary, and then being to immediately see its effect on the simulation without having to restart the simulator. This is indeed how the `set` command in the simulator works for setting variables inside the robot object.

Once every time-step, a function called `eval_syms()` is called. This function goes through the syms dictionary and uses string manipulation, substitution, collision detection (to make sure it can tell the difference between things like `l1` and `l10`) and finally the python `eval()` command to turn everything into numerical answers. These numerical answers are plugged into `\_d`. It is from `\_d` that the values for the various links are assigned, which ultimately dictate how the robot is drawn. Additionally, after evaluating `\_d`, a function called `sync_d()` is called that simply uses the built in python `setattr()` function to make each entry in `\_d` a class variable within the robot object instance. This allows calling of things like `robot.P01` to work instead of having to do `robot._d['P01']` every time you want to get at a variable inside `\_d`.

Links are then constructed from all these variables as a convenient way to group related variables together. These links contain things like a joint's rotation matrix, position vector, joint parameter and joint axis. As we'll see later on, links are used mostly for accessing information about a robot arm.

## Kinematics

Once all symbolics for the robot are evaluated, it is actually pretty easy to solve for the forward kinematics of the arm. We use the product of exponentials approach to solve this. First, computing `R0T` is as simple as this:

```python
robot.R0T = eye(3, 3)
for link in robot.links:
    robot.R0T = dot(robot.R0T, link.R)
```

As you can see, `R0T` starts out as the identity matrix. The links of the robot then are traversed in order from the base to the end, and along the way the current `R0T` is multiplied by the link's individual rotation matrix (which comes from `\_d`). When this is all done, the resulting matrix is the correct `R0T`.

For positions, the algorithm is a bit more involved:

```python
tmp = eye(3,3)
robot.P0T = zeros((3, 1))
p = None
for link in robot.links:
    robot.P0T += dot(tmp, link.P)
    tmp = dot(tmp, link.R)

    p = (robot.P0T[0][0], robot.P0T[1][0], robot.P0T[2][0])
    self.verts.append(p)
```

First, a few variables are initialized. `tmp` is the temporary rotation matrix for all links up until the current iteration. It starts off as the identity matrix. Second, the overall position vector, `P0T`, starts out as a three by one zero vectors. Next, for each link in the robot arm, the representation of the link's position vector in terms of the base frame is added to the current position vector. This is done by using the dot product of the `tmp` rotation matrix and the link's position vector. The temporary rotation matrix is then updated, and the current position vector is appended to the `verts` list, which contains all the robot's vertices for the current time-step. This list is later used to draw things like the arm ghosts and trace.

## Rendering Joints

When drawing the robot in a certain configuration in OpenGL, it is necessary to indicate which joints are rotational or prismatic. This is done inside the link class. Additionally, static links need to be distinguished from prismatic joints.

The drawing of rotational joints is done by using a `gluCylinder` along the axis of the joint. Unfortunately, OpenGL can only use `gluCylinder` along the Z axis. To accommodate this as our frame is independent of our rotation axis, we calculate the rotation need from the axis we want to draw along (some arbitrary axis - the rotation axis within our frame) to the Z vector within this same frame. Once this is rotated, drawing along the Z axis inside this new frame will draw along the rotation axis in the old frame. After the cylinder is drawn, end caps were drawn so enclose this cylinder by using a &#8216;for' loop to iterate around a circle of points for gl_triangle_fan. This is done by using `glPushMatrix` and `glPopMatrix` with all the drawing taking place within the new calculated rotated matrix.

For prismatic joints, a method was developed to draw a rectangular prism along an arbitrary axis. This was done using a length and width/height (square area) as well as a start and end point. From there, a matrix is pushed onto the model view which is the rotation from the vector (end-start, same as shown above) to the Z axis. Then, a simple `gl_quads` was used to draw the 6 faces of the rectangular prism of the size provided and the matrix popped off. After the joint is drawn, the frame is rotated along the axis of rotation by the amount specified using `glRotate`. Then it is translated using `glTranslate` along the link which is representative in the rotated frame so no additional calculations are needed.

Now that the frame is at the next joint, the process is repeated till all joints are displayed. This process works off of the stack pushing and popping matrices. Joint 3 is related to Joint 2 which is a rotation and translation from Joint 1. Problems encountered while drawing the robot include the drawing of the `gluCylinder` along the axis or rotation as the rotation matrix needed to draw along the Z axis was causing issues due math errors in the passing of parameters to the cross and dot product. Another issue was trying to draw the entire robot in one frame as python was already calculating all the necessary information. This led to complexity issues that were troublesome to debug and even harder to comment and follow. The last troublesome part was using `glLoadMatrix` to force OpenGL to load a matrix that python had already calculated for internal purposes. The problem became known when rounding errors in python of the rotation matrix caused the determinate not to be 1.000 in all cases which would cause OpenGL to clip triangles of the screen and paint the pixels white.

## Rendering Links

Links are drawn from the current frame after being rotated by the rotation matrix associated with the joint and the next joint location. This works due to links being relative to the current joint. A simple `gl_lines` from [0,0,0] to P(N-1)(N) where N is the next frame is drawn to symbolize a link. The existence of prismatic joints also play a role in how this line looks.

## Terminal Implementation

The implementation of the OpenGL terminal was entirely non-trivial. However the algorithms that go into it will not be featured here, as they have nothing to do with robotics or graphics. Instead, what will be mentioned is the reasons behind implementing the terminal.

It was a carefully calculated design decision. The end goal was to have an easy way for users to enter commands to the simulator. Since OpenGL works by registering callback functions whenever an event occurs, the simulator has to ultimately submit control flow to the main OpenGL loop. This means that keyboard interrupts and stdin can never reach the program.

To get around this, we could have used a windowing toolkit. There are many windowing toolkits for python that we could have used: PyQT, wxPython, Tkinter, etc. However, not all of them support OpenGL widgets and they introduce portability issues when considering the cross platform nature of our simulator (yet another dependency). Finally, windowing toolkits are complex beasts and there simply wasn't enough time to learn how to use them before the simulator needed to be completed.

Therefore, the decision was made to implement a simple terminal window inside OpenGL. This gave us the most control with regards to commands entered to the command prompt. Additionally, it makes the application more portable because no additional library dependencies are introduced.
