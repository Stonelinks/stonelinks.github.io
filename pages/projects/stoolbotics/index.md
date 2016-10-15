---
title: Stoolbotics
image: /projects/stoolbotics/stoolbotics.png
date: 2012-01-03
dateFormat: "YYYY"
path: /projects/stoolbotics
---

A beginner friendly, minimalistic and open source robot simulator. It is a fairly general purpose arm and kinematics simulator aimed at being a teaching tool for aspiring roboticists.

<iframe src="http://www.youtube.com/embed/h3Rus5mUkzY" frameborder="0" allowfullscreen></iframe>

[Home](/projects/stoolbotics/)
|
[Download](/projects/stoolbotics/download/)
|
[Quickstart](/projects/stoolbotics/quickstart/)
|
[Docs](/projects/stoolbotics/use/)
|
[About](/projects/stoolbotics/implementation/)

The motivation for this project was simple: the linear algebra and mathematical concepts behind robotics is difficult for a beginner to understand without any visual context. This is especially true for people who are primarily visual learners.

![Omni](/projects/stoolbotics/omni.jpg)

Stoolbotics (right) simulating a phantom omni (left).

This tool will hopefully fill a gap in many higher education robotics classrooms. It was designed to be easy to use and compatible with other technologies (like MATLAB). The project itself was conceived and implemented halfway through the Fall 2011 semester at RPI by Lucas Doyle with some help from Scott Peck.

For information on how to get Stoolbotics, check out the [download page](/projects/stoolbotics/download.html). To get a quick idea of how to use Stoolbotics, check out the video below or read the [quickstart](/projects/stoolbotics/quickstart.html). To find out more about Stoolbotics, such as how it was implemented, or more detailed uses of the simulator, see the [full docs](/projects/stoolbotics/use.html).

## Features

Stoolbotics has many features that make it attractive to the aspiring roboticist and the higher education robotics classroom. To name a few, Stoolbotics features:

- Low barrier to entry with an easy to use file format for specifying a robot arm
- Ability to visualize any robot that can be specified in such a file
- Compute the forward kinematics of any robot with DH parameters
- Animate and draw paths for arms
- Command line interface within simulator with many useful commands
- Completely customizable simulation environment (time-stepping, etc)
- Ability to record simulator activity
- Ability to playback saved recordings, or even import a recording generated in MATLAB
- Able to be driven in real time from a UDP stream from other programs like MATLAB (includes an example)
- Change variables in the simulator on the fly
- Built in help from simulator command line, and of course this stellar and complete documentation
- Cross platform implementation

## Code

Check out the source code on [github](https://github.com/Stonelinks/Stoolbotics)
