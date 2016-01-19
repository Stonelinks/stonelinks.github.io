---
title: Boeing Robotic Wingbox
template: page.jade
---

My capstone team was tasked to develop a simulation and control system for a robot designed to operate inside an aircraft wing. If you're wondering why Boeing would want this, check out [this](#why). In addition to being the the team leader and coordinating with Boeing, I also wrote all the code for the simulator and the control system as other members of the team were not familiar with programming. The general architecture of the system was split into three parts: a client, server and simulation data.

<div class="media-container">

<img src="/images/projects/boeing/sc14.png">

<p>Screenshot of the client aligning to bolt holes.</p>

</div>

### Client

General operation started out with the client to coordinate and control the robot. Using joysticks, renderings of the robot in its environment and a video feed, the operator could modify the client's simulation environment to be in some desired state.

### Server

Modified state from the client could then be sent to the server, which would do all the heavy computations necessary to smoothly and safely transition the robot from current state to the desired state. The server also did other computationally intensive tasks, such as object recognition of things like bolt holes, physics calculations, etc. Ultimately, the server was designed to control a physical robot, so an abstraction layer was developed to allow generic information from the simulation to be translated into hardware specific instructions. Support was also implemented between client and server to allow many clients to safely control a single robot.

### Simulation Data

Finally, all the simulation data (descriptions of the kinematic bodies that comprise a robot, the location and contents of the simulation environment, etc) was kept separate to increase flexibility and portability of the software as it was used in both the client and the server.

<div class="media-container">

<iframe src="http://www.youtube.com/embed/slJodwZfds0" frameborder="0" allowfullscreen></iframe>

<p>Demonstration of the whole system in operation.</p>

</div>

## Why

So why do any of this? The wings of a modern commercial aircraft are one of the most sophisticated, complex and precisely manufactured feats of engineering that mankind has ever produced. They not only provide the lift and structural support that allow the aircraft to fly, but also house many critical pieces of equipment such as fuel lines, hydraulic pumps, electrical wires, hoses, etc.

This equipment is kept in interior spaces inside the wing called wingboxes. Unfortunately these wingboxes need to be human accessible during assembly and maintenance, which introduces a significant ergonomic constraint into the design of the wing. Boeing has to cut big access holes in the outside skin of the wing, as well as modify the interior spaces to be more human accessible. Both of these things compromise the structural integrity and decrease the aerodynamic efficiency of the wings.

Boeing is very interested in developing a robotic system that could operate inside the wing to assist with assembly and maintenance tasks. Removing the need for a human accessible wingbox would have massive implications in the design of the wing and the efficiency of the aircraft. The cost savings from decreased fuel usage over the lifetime of the aircraft alone would be huge. This solution would also carry with it the benefits inherent to robotics: increased speed, repeatability and accuracy during assembly and maintenance.

## What I learned

This was a big project for me, and I am immensely proud of how the final product turned out and had a ton of fun working with RPI and Boeing on the project. I learned too many things to reasonably articulate, but there are two things I wish I could change with this project.

First, I either wish that I wasn't team leader so I could spend more time coding, or someone else on the team also could have also coded along side me so I could be a better leader. I felt spread too thin between coding this massive application and also being a manager. I would rather do one thing and do it well as opposed to do two or more things and not be able to give each my best.

Second, I can't show any of my work off! This is probably the biggest and best engineered piece software I've written. All the intellectual property is technically owned by RPI / Boeing, so I can't release any of it. In the future I'd like to get permission to gut out any proprietary information, polish a few things up and release it as a collaborative robot planning tool.

## Shout outs

My capstone team:
  - Sairina Mirchandani
  - Amber Mosal
  - Chris Low
  - Edward Shambeau
  - Sam Michon

From the RPI Design Lab for their excellent guidance, especially when it comes to the management side of things:
  - Casey Goodwin
  - Joshua Hurst
  - Mark Steiner

From Boeing for their technical input and valuable feedback:
  - Jamel Bland
  - Hillary Barr
  - Mark Goldhammer

Rosen Diankov for his assistance and OpenRAVE, a really helpful library
