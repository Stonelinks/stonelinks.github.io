---
title: Using the Simulator - Stoolbotics
---

[Home](/projects/stoolbotics/)
|
[Download](/projects/stoolbotics/download/)
|
[Quickstart](/projects/stoolbotics/quickstart/)
|
[Docs](/projects/stoolbotics/docs/)

This section of the documentation goes into some more detailed use of Stoolbotics. Before reading this you should probably check out the [quickstart](/projects/stoolbotics/quickstart/).

## Working with Robots

Since the principal function of Stoolbotics is simulating robots, it is important to know how to specify them in a format that Stoolbotics can understand, load them into the simulator and command then to do things.

### Robot.json File

As covered in the quickstart, robots are specified in json files that contain sections in it for defining various aspects of a robot to be simulated. Here is an example file for the Phantom Omni and the explanation again in case you skipped over the quickstart:

```javascript
"N" : "3",

"h1" : "z",
"h2" : "x",
"h3" : "x",

"q1" : ".1*t",
"q2" : ".1*cos(t)",
"q3" : ".001*t + .2*sin(t)",

"l1" : "40",
"l2" : "50",
"l3" : "50",

"P01" : "[0, 0, 0]",
"P12" : "[0, 0, l1]",
"P23" : "[0, l2, 0]",
"P3T" : "[0, l3, 0]",

"R01" : "rot(h1, q1)",
"R12" : "rot(h2, q2)",
"R23" : "rot(h3, q3)",
"R3T" : "eye(3, 3)"
```

- `N` is first declared to tell the simulator the number of joints to expect in this robot.
- All the joint axes are specified with an `h` and an index. In this case, shorthand is used (e.g. use of `z` instead of `[0, 0, 1]`), but if we wanted a non-standard axis vector we could have used something like `[-.1, .2, .4]`.
- Angle parameters are specified with a `q` and an index. These can be completely arbitrary functions of time, static numbers, or whatever you like. These parameters represent how much an axis has rotated or displaced along its axis.
- Link lengths are specified with an `l` and an index.
- Position vectors (`P` + index) tell the simulator how to get from one frame to the next. Prismatic joints can be created by including a joint axis parameter (a `q`) in the vector.
- Finally, rotation matrices (`R` + index) are specified by using the `rot()` command, which calculates the rotation matrix using the Euler-Rodriguez formula. If no rotation is desired, just specify the identity matrix with the `eye()` command. Sometimes, for static links it is necessary to specify extra frames that don't have any rotation matrix. If this is the case, you would also just use the `eye()` command here.

### Loading a robot into the simulator

First, all robots are pulled from the `robots` directory in the root directory of the simulator. It is recommended to actually copy an existing robot file and modify it to suit your needs.

Writing and/or modifying one of these files is for the most part a straightforward process. The only hiccup you may encounter is in specifying extra frames in order to get the simulator to handle extra links. Additionally, another interesting way of specifying robots is by programmatically generating a json file. An example of this can be seen with `snake.py` which generates `snake.json`.

Once you have written a robot.json file, there are two commands that will help you out getting it into the simulator. First, use the `list` command to see all robot configuration files that the simulator believes to be properly configured and placed correctly. You should see a list containing the Omni, Puma560, etc. and whatever else you have put in the robots directory. Next, use the `load` command to load your robot.

## Command Overview

Here is a detailed list of all the commands built into Stoolbotics:

<table><tr><td><h4>Command</h4></td><td><h4>Usage</h4></td><td><h4>Description</h4></td></tr><tr><td><b>axis</b></td><td><b>axis <on/off></b></td><td>Turn robot axis on/off. Providing no arguments toggles the axis.</td></tr><tr><td><b>eval</b></td><td><b>eval <expression></b></td><td>Return some variable from the simulator. e.g. 'eval robot.P01'. Output might look a little weird.</td></tr><tr><td><b>exit</b></td><td><b>exit or quit</b></td><td>Closes the simulator.</td></tr><tr><td><b>floor</b></td><td><b>floor <on/off></b></td><td>Turns the floor on and off. Providing no arguments toggles the floor.</td></tr><tr><td><b>ghost</b></td><td><b>ghost <on/off/interval> <number></b></td><td>turn robot ghosts on/off. If <interval> is present, provide a number to set the ghost interval. Providing no arguments toggles the ghosts.</td></tr><tr><td><b>help</b></td><td><b>help <cmd (optional)></b></td><td>If <cmd> is provided, display help for that command. Otherwise  it just list all commands.</td></tr><tr><td><b>hide</b></td><td><b>hide</b></td><td>Hides this terminal.</td></tr><tr><td><b>list</b></td><td><b>list</b></td><td>Lists all the robots that can be loaded into the simulator. To add something to this list, just place a valid robot.json file in the 'robots' folder.</td></tr><tr><td><b>load</b></td><td><b>load <robot file></b></td><td>Loads a robot file into the simulator. Use the 'list' command to see what robots are able to be loaded.</td></tr><tr><td><b>play</b></td><td><b>play <file (optional)></b></td><td>If <file> is present, the simulator plays that file. Otherwise, it just starts the simulator.</td></tr><tr><td><b>record</b></td><td><b>record <file></b></td><td>Outputs current arm movements to a file which can be exported or played back later.</td></tr><tr><td><b>screendump</b></td><td><b>screendump</b></td><td>Take a picture of the current screen and save it to disk.</td></tr><tr><td><b>set</b></td><td><b>set <var> <expression></b></td><td>Sets a symbolic variable in the simulator. e.g. 'set q3 cos(t)', 'set t 0', 'set tscale -.1', 'set P23 [0, 0, l2 + q2]'.</td></tr><tr><td><b>skew</b></td><td><b>skew</b></td><td>Enters skew mode, where the view of the robot and simulation speed can be rapidly adjusted.</td></tr><tr><td><b>status</b></td><td><b>status</b></td><td>Tells you what the simulator is currently doing.</td></tr><tr><td><b>stop</b></td><td><b>stop</b></td><td>Halts the simulation.</td></tr><tr><td><b>trace</b></td><td><b>trace <on/off/clear/limit> <number></b></td><td>Turn robot traces on/off, or clear the current set of traces. If the <limit> argument is used, provide a number to set the maximum number of traces.</td></tr></table>

## Examples

Here are some quick examples of what you can use commands for in Stoolbotics.

### Changing the Environment

The cosmetics of the simulation environment are highly configurable. Here are some of the commands that can modify the appearance:

- Axis
  - The joint coordinate frame axis display can be turned on and off with the use of the `axis` command.
- Floor
  - The floor in the simulator can be turned on and off with the use of the `floor` command.
- Ghosts
  - A 'ghost' is a shadow of a robot in a previous articulated position. Use the `ghost` command to control them.
  - The interval of when ghosts appear can be set with `ghost interval <somenumber>`.
- Traces
  - The trace that the robot leaves behind is completely configurable with the `trace` command.
  - The number of traces saved can be set by executing `trace limit <somenumber>`.
  - Finally, traces can get kind of ugly and annoying sometimes, so it is nice to be able to clear them by running `trace clear`.

Here is an example of some simulation environment manipulation with the above commands and the result:

![](/stoolbotics/8.png)

### Skew mode

Skew mode allows you to rapidly adjust where the camera is positioned in the simulation as well as adjust the timestep. To enter skew mode, just type `skew`. From there you can use the arrow keys to translate the camera up or down, use 'f' and 'd' to speed up or slow down the simulation, and finally 'j' and 'k' to zoom in and out. While in skew mode, none of the other commands work, so to exit you need to type 't'. Its hard to show a picture of skew mode in action.

### Set

The `set` command is highly versatile. You can set any variable in the simulator or the robot with this command. Here are some examples of clever ways to use the set command:

<table><tr><td><h4 style="width: 300px;">Command</h4></td><td><h4>Effect</h4></td></tr>
<tr>
<td><pre>set t 0</pre></td>
<td>Resets the time in the simulator back to time = 0.</td>
</tr>

<tr>
<td><pre>set tscale 0.05</pre></td>
<td>Manually sets the timescale in the simulator (the same effect could also be done with the skew command).</td>
</tr>

<tr>
<td>
<pre>
set q1 0
set q2 0
set q3 0
(etc ...)
</pre>
</td>
<td>Sets all joints in the robot to zero position.</td>
</tr>

<tr>
<td>
<pre>
set h1 x
set h2 [1, 1, 1]
set h3 z
(etc ...)
</pre>
</td>
<td>Sets all joints axis in the robot to arbitrary vectors. Use of shortcuts like "x" is entirely optional, you can do things like [1, 0, 0] and accomplish the same effect.</td>
</tr>

<tr>
<td>
<pre>
set l1 50
</pre>
</td>
<td>Set link one to be 50.</td>
</tr>

<tr>
<td>
<pre>
set P12 [0, 0, l2 + q2]
</pre>
</td>
<td>Make a prismatic joint in the Z direction from frame one to frame two.</td>
</tr>

<tr>
<td>
<pre>
set R12 eye(3, 3)
</pre>
</td>
<td>Sets R12 to be the identity matrix, effectively creating a static link.</td>
</tr>
</table>

### Playback and Recording

The simulator also includes functionality to play back and record robot motion through the `play` and `record` commands.

#### File Format

The file format that Stoolbotics uses to store robot activity is very straightforward. Each row is a slice of time. The first entry in each row is always time, but since the timescale can be adjusted in the simulator, this column almost doesn't matter. The remaining entries in the row corresponds to joint angles (in radians) starting from the first joint out to the end of the arm. An example snippet for a three joint arm is shown below:

<pre>

0.0, 0.1, 0.0540302305868, 0.169294196962
0.2, 0.02, 0.0980066577841, 0.039933866159
0.4, 0.04, 0.0921060994003, 0.0782836684617
0.6, 0.06, 0.082533561491, 0.113528494679
0.8, 0.08, 0.0696706709347, 0.14427121818
1.0, 0.1, 0.0540302305868, 0.169294196962
1.2, 0.12, 0.0362357754477, 0.187607817193
1.4, 0.14, 0.01699671429, 0.198489945998
1.6, 0.16, -0.00291995223013, 0.201514720608
1.8, 0.18, -0.0227202094693, 0.196569526176
2.0, 0.2, -0.0416146836547, 0.183859485365
2.2, 0.22, -0.0588501117255, 0.163899280764
2.4, 0.24, -0.0737393715541, 0.13749263611
2.6, 0.26, -0.0856888753369, 0.105700274364
2.8, 0.28, -0.0942222340669, 0.0697976300312
3.0, 0.3, -0.09899924966, 0.031224001612

</pre>

#### Recording

Recording is as easy as using the `record` command. Providing an argument to the command, such as "example" will automatically start recording to a file called "example.csv" in the root folder of Stoolbotics.

#### Playback

When playing back, all you need to do is use the `play` command with the filename you want to play back. For example, after recording to "example", you could type `play example.csv` to start playing what was recorded in the file.

### Realtime Control from Matlab

Stoolbotics also has the capacity to be driven by external applications like Matlab _without_ the use of saved recordings. This is done through a UDP socket that accepts a comma separated list of joint angles and moves the arm to this position.

Matlab can therefore compute things like inverse kinematics, and send the joint angles to the simulator to have them visualized over UDP. In order to accept UDP connections, the `server` command needs to be used. Specifically, running something like `server start 5005` will be run to start the server listening on port 5005. Then, from matlab you can use the included `judp.m` to send UDP messages to the simulator.

A rudimentary example of this technique can be seen in the `matlab` folder by running `omni_invkin_example` in matlab. This is a drastically simple example attempts to move the phantom omni in a circle. Here it is reproduced below:

```python

host = '127.0.0.1'
port = 5005

p = zeros(3, 1)

for t = .01:1:1000
    p(1) = 40 + 15*cos(t);
    p(2) = 30;
    p(3) = 50 + 15*sin(t);

    q = omni_invkin(p);

    msg = strcat(num2str(q(1)), ',', num2str(q(2)), ',', num2str(q(3)));
    disp(msg)

    % send to stoolbotics
    judp('send', port, host, int8(msg));
    pause(.1);
end
```

As you can see, since this is technically operating over a network we need to specify a host. If you're running matlab and stoolbotics on the same machine, this will always be 127.0.0.1 for localhost. Technically, you could be running the simulator and matlab on two separate computers. As long as you had the IP address of the computer running the simulator plugged into the 'host' variable inside matlab, everything will still work.

Next, the port needs to match what you entered with the `>server start` command. From then on, all that needs to happen is to do some calculation, and pass off the comma separated list of joint angled to the simulator.
