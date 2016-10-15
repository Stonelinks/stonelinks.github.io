---
title: Big List of Robots
image: /projects/robots/ied-robot.jpg
date: 2012-01-02
dateFormat: "[1999] - YYYY"
zgallery: [/projects/robots/ied-gallery/100_0376.jpg, /projects/robots/ied-gallery/100_0377.jpg, /projects/robots/ied-gallery/100_0378.jpg, /projects/robots/ied-gallery/100_0379.jpg, /projects/robots/ied-gallery/100_0380.jpg, /projects/robots/ied-gallery/100_0381.jpg, /projects/robots/ied-gallery/100_0382.jpg, /projects/robots/ied-gallery/100_0386.jpg, /projects/robots/ied-gallery/100_03881.jpg, /projects/robots/ied-gallery/100_0388.jpg, /projects/robots/ied-gallery/100_0389.jpg, /projects/robots/ied-gallery/100_0404.jpg, /projects/robots/ied-gallery/100_0405.jpg, /projects/robots/ied-gallery/100_0406.jpg, /projects/robots/ied-gallery/100_0407.jpg, /projects/robots/ied-gallery/DSC02272.jpg, /projects/robots/ied-gallery/DSC02273.jpg, /projects/robots/ied-gallery/front-axle-pic.png, /projects/robots/ied-gallery/rear-hub-axle-assem.png]
---

Robots I've been involved with, unless otherwise mentioned on this here such as the [battlebot](/projects/battlebots/), [FIRST](/projects/FIRST/), etc.

Robotics has been a long standing passion of mine. This page is to showcase robots I have designed, programmed, built or had anything to do with over the years. Other robots such as FIRST or Battlebots can be seen elsewhere on the site (like the [projects](/projects.html) page).

### IED Border Patrol Robot - (2010)

![](/projects/robots/ied-robot.jpg)

This robot went from idea to implementation in six short weeks in response to an open ended project for a "GPS robotic platform" sponsored by Lockheed Martin. We chose to make a robot with the goal of remotely detecting trespassers across out nation's borders. With enough of these robots, our border patrol forces can

- Make individual agents more effective as they have mobile eyes in many places
- Remove agents from potential violence or conflict
- Enables the use aggregated GPS data to figure out trends, such as where the hot spots in border activity exist

On one hand, this project was a failure as we totally failed to produce a mechanically sound robot that could drive around and do what we wanted. On the other hand, I got to write some amazing software to control this thing. some of the software I wrote:

- Internet telemetry framework
- NMEA parser for the GPS data
- MJPG streaming for the video feed
- Work with the Google maps API

I also learned some very important non-technical things:

- How to think about design problems in terms of what a customer wants
- Ways to conduct research and benchmarking against similar products
- How to lead a group
- Present things to a non-technical audience (that one was fun! I couldn't talk about programming at all in the final presentation)
- Make solid technical decisions with a deadline in mind

Probably the most frustrating thing about this robot was that despite having five of our seven team members on the mechanical side of things, the only thing that didn't work were the mechanics. The other two of us (Matt and I) ended up carrying the project. We ended up writing most of the 137 page [technical report](/misc/IED_tech_report_final.pdf). Overall I had a blast, and it remains a robot I am very proud of.

### Litec Blimp - (2010)

![](/projects/robots/IMG_0184-1024x682.jpg)

The Litec blimp was the final project for an embedded control class I took at the end of my Sophomore year. The blimp hardware was provided, but the challenge was becoming familiar enough with the Intel 8051 micro controller to implement things like PID control, I2C, SPI, PWM, interrupts, analog to digital conversion, etc.

The ultimate goal of the blimp was to be able to autonomously hold a specified altitude and heading. More than anything, working with the 8051 made me appreciate how much is being automatically taken care of when working with something like an Arduino and higher level languages.

### Battlebot - (2009 - 2010)

![](/projects/robots/101.jpg)

I designed most of this robot on my own for a now dissolved group of students at RPI interested in starting a Battlebot team. It never made it into the real world but still remains a viable design as far as I am concerned. More written about it [here](/projects/battlebots/index.html).

### Personal robot - (2008 - onwards)

<iframe src="http://www.youtube.com/embed/RRwMJ8GYT7Y" frameborder="0" allowfullscreen></iframe>

This robot at first wasn't even really a robot, just some servos, a pan tilt module and an Arduino. However, just like this website, it has had many incarnations over the years and exists primary as an educational tool for me to learn more and tinker around with whenever I find the time. Over the years it has been controlled from Windows, Linux, LabVIEW, by hand, over the internet and sometimes purely autonomous.

It used to be attached to a netbook and some wheels, and I would to drive it around the dorm and talk to people using text to speech. In its current incarnation, it has functioned mostly as a stationary pan / tilt camera. When I get some time, I have plans to start using it to teach myself more about computer vision. I also don't really have a good picture for it as it is always changing forms, so here is a video of it detecting faces.

### AI Autonomous Boat - (2007)

![](/projects/robots/AIboat.jpg)

One of the best summers of my life was spent in Concord NH at the St. Paul's Advanced Studies Program taking a grad level AI class with Terry Wardrop and other talented students from NH. We spent the summer learning things like game theory, programming in LISP, learning finite state automata, building simple robots, etc.

The culmination however occurred when the whole class pulled together and tried to design an autonomous boat around a FIRST robotics controller, some 8020 aluminum struts, and old sailboat hull and a trolling motor.

I was in charge of the steering system, which failed terrifically as I was not allowed to modify the trolling motor in any way so I tried to do it with rope (spoiler: it didn't work).

Also as you can see from the picture (I did a lot of running that summer and was basically a twig) the class also elected me to be the "test pilot". Nothing like being in an old sail boat hull filled with expensive electronics surrounded by water.

### FIRST Robotics - (2006 - 2008)

![](/projects/robots/2006.jpg)

I had the great fortune of being able to participate and be the captain of a FIRST robotics throughout my time at Gilford High School. A listing of all the robots built with FIRST can be found [here](/projects/FIRST/index.html).

### The RCX Lego Programmable Brick - circa 4th grade (~1999)

![](/projects/robots/rcx.jpg)

I may or may not owe approximately all of my engineering and mechanical intuition to Legos. I used to love playing with these things. The pinnacle of any Lego set I have ever gotten or probably will ever get has to be the Robotics Invention System. Thank god for my generous and understanding parents for not laughing me out of the room when 4th grader me wanted this $200 kit (they made me work for it).

Just writing about it makes me want to jump out of this chair, run down to the basement and start tinkering around like old times. I cannot tell you the hours I spent building and programming this thing. More than any other robot on this page, the RCX played a pivotal role in who I am now. It is endlessly configurable by curious youngsters, and I hope LEGO keeps at it to inspire the next generation of roboticists.
