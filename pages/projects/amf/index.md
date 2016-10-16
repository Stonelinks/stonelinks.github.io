---
title: Harvard - Smithsonian Center for Astrophysics
image: /projects/amf/chamber.png
date: 2012-01-01
dateFormat: "[2009] - YYYY"
---

![chamber](/projects/amf/chamber.png)

Since 2009 I have worked at the Harvard-Smithsonian Center for Astrophysics on prototyping X-ray optics Dr. Suzanne Romaine and Ric Bruni. There I've helped designed hardware and wrote all of the software to automate the fabrication of multilayer X-ray optics.

These multilayer coatings are designed to capture, focus and reflect X-ray photons from deep space back on to a detectors inside of the telescope to form an image. The optic coatings are called "multilayers" because they consist of very thin (sometimes only a couple of angstroms) alternating layers of different materials.

My time at Harvard-CFA has been tremendously valuable to me. While there, I have:

- Honed my troubleshooting and analytical problem solving abilities
- Developed strong communication skills by working with astrophysicists, engineers, hardware vendors, etc.
- Gained valuable technical experience with automation, programming, engineering, astrophysics, materials science and more

## The Software

My major accomplishment at Harvard has been writing a software suite to automate the task of creating an optic given a set of parameters. Along the journey of implementing this software, I have had to develop a complex UI, control sequences, hardware monitors, error checking tools and motion control algorithms.

One of the most challenging parts has been the program's organization. As the complexity of the program(s) have increased, I've had to rework the architecture several times to increase run efficiency (these things take hours sometimes), eliminate redundant code, and ultimately make the whole application much tighter, portable and friendly both for users and me, the developer. The utilities I wrote also allow me to monitor and control chamber hardware without being physically present in the lab (extremely valuable for troubleshooting remotely).

The current incarnation of the software has actually split into two major parts. At the lowest level, there is a __LabVIEW hardware interpreter__ and simple tools for manually controlling the chambers. This separation / interpreter exists mainly because I got really annoyed with managing complex logic in LabVIEW. I'd love to ditch LabVIEW altogether, however it is the only means of interfacing with the motion controller that drives chamber hardware. I decided to come up with a simple instruction set for moving hardware. I defined a simple instruction set (with instructions like `MOVE_AXIS`, `OPEN_SHUTTER`, etc.) that it implements. Lists of these instructions are fed into it and it executes them sequentially and moves chamber hardware.

The other half of the system is a **python application** with all the high-level logic actually reads optic parameters and generates instructions for the interpreter to follow. It is a [webpy](http://webpy.org/) application, the source code of which is [available on github](https://github.com/Stonelinks/amf).

This decoupling is really nice since there are so many different types of coatings, optic geometries and chamber hardware configurations that the software has to work with. LabVIEW requires an extraordinary amount of work for developing large scale applications such as this, so keeping the LabVIEW components simple has turned out to be a fantastic choice.

![screen](/projects/amf/screen.jpg)

**Multilayer Fabrication Software**: This is a very old screenshot, but the gray window is for production runs, the blue window is for manually controlling chamber hardware, and the yellow window displays the state of the chamber.

## The Hardware

The technique used to actually coat the optic is called DC magnetron sputtering. A good explanation of the basic technique can be found [here](http://www.ajaint.com/whatis.htm). Some quick facts about the coating process:

- The coating is done in a vacuum chamber
- Deposition rates of materials are held constant within a fixed cross section of flux
- Since sputter cross section and optic substrate are different sizes, the position of the substrate needs to move around inside the chamber in order to get an even deposition
- The substrate also needs to be able to move between two sputtering sources to form a multilayer

The deposition sources (magnetrons, also called the cathodes) are always on during a run. They can only deposit one material and only cover a small portion of the total surface on the optic to be coated. Therefore, my algorithms determine how to move equipment inside the chamber to properly and accurately coat the optic evenly at the specified thickness.

Hardware-wise, these are things that I had to design and build to achieve this:

- Spec out and buy many stepper controller / driver / power supply / motors, including vacuum compatible steppers and drivers that do fancy things like holding current cutoff (for heat reduction) and microstepping
- Design and build a completely new chamber (pictured at the top of this page) with CAD, including all internal optic manipulation hardware, ferrofluidic feedthroughs, chamber stand/dolly, lid hoists, etc.
- Made a mandrel (controlled VIA a vacuum rated stepper) to add an extra dimension to coatings, which enabled us to coat cylindrical shell optics in addition to flat wafers
- Assorted power supplies and instruments to monitor temperature, flow rate, etc.

## Other Work

Other odd jobs I've done at the CFA include:

- Supervising a high school student for a summer
- Fixing a $70,000 profile-meter used for optic substrate characterizations
- Decreased chamber shutter latency and saved money by designing a cheap solenoid controller with an arduino
- Helped with data distribution for an experiment run at Brookhaven National Laboratory
- Probably more things that I am forgetting about

## Conclusions

Ultimately the end result has been the creation of a robust and easy to use platform that makes the daunting task of producing any kind of X-ray optic safe, easy and as stress free as possible for someone not familiar with the inner working of our lab's vacuum chambers. Hopefully if NASA ever gets enough funding, my tools will end up creating something that ends up in space!
