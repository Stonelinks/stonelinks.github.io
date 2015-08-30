---
title: Harvard - Smithsonian Center for Astrophysics
template: page.jade
---

<div class="media-container">

<img src="/images/projects/amf/chamber-logo.png">

</div>

Since 2009 I have worked at the [Harvard-Smithsonian Center for Astrophysics](http://www.cfa.harvard.edu/hea/) on a wide array of projects for Dr. Suzanne Romaine and Ricardo Bruni. Mainly I've been designing hardware and software that automates the fabrication of multilayer (and sometimes non-multilayer) coatings on the surfaces of optics to be used for X-ray imaging (mostly in astronomy).

These multilayer coatings are designed to capture, focus and reflect the X-ray photons from deep space back on to an array of detectors inside of the telescope to form an image. The coatings are called "multilayers" because they consist of very thin (sometimes only a couple of angstroms) alternating layers of different materials (they are essentially highly specialized man-made [bragg crystals](http://en.wikipedia.org/wiki/Bragg's_law)).

My time at Harvard-CFA has been tremendously valuable to me. While there, I have:

- Honed my troubleshooting and analytical problem solving abilities
- Developed strong communication skills by working with astrophysicists, engineers, hardware vendors, etc.
- Gained valuable technical experience with automation, programming, engineering, astrophysics, materials science and more

##The Software

My major accomplishment at Harvard has been writing a software suite to automate the task of creating an optic given a set of parameters. Along the journey of implementing this software, I have had to develop a complex UI, control sequences, hardware monitors, error checkers and motion control algorithms.

One of the most challenging parts has been the program's organization. As the complexity of the programs have increased, I've had to rework the architecture several times to increase run efficiency (these things take hours sometimes), eliminate redundant code, and ultimately make the whole application much tighter, portable and friendly both for users and me, the developer. The utilities I wrote also allow me to monitor and control chamber hardware without being physically present in the lab (extremely valuable for troubleshooting remotely).

The current incarnation of the software has actually split into two major parts. At the lowest level, there is a __LabVIEW hardware interpreter__ and simple tools for manually controlling the chambers. Fundamentally, there a simple instruction set (with things in it like `MOVE_AXIS`, `OPEN_SHUTTER`, etc.) that it implements. Lists of these instructions are fed into it and it executes them sequentially and moves chamber hardware. The other program, a __simple [webpy](http://webpy.org/) application__, actually generates and keeps track of these instructions and the parameters used to generate them. The source code for this web ui is [available on github](https://github.com/Stonelinks/amf). This decoupling is really nice since there are so many different types of coatings, optic geometries and chamber hardware configurations. LabVIEW requires an extraordinary amount of work for developing large scale applications such as this, so keeping the LabVIEW components simple has turned out to be a fantastic choice.

<div class="media-container">

<img src="/images/projects/amf/screen.jpg">

<p>**Multilayer Fabrication Software**: The gray window is for production runs, the blue window is for manually controlling chamber hardware, and the yellow window displays the state of the chamber.</p>

</div>

##The Hardware

The technique used to actually coat the optic is called DC magnetron sputtering. A good explanation of the basic technique can be found [here](http://www.ajaint.com/whatis.htm). Some quick facts about the coating process:

- The coating is done in a vacuum chamber
- Deposition rates of materials are held constant within a fixed cross section of flux
- Since sputter cross section and optic substrate are different sizes, the position of the substrate needs to move around inside the chamber in order to get an even deposition
- The substrate also needs to be able to move between two sputtering sources to form a multilayer

The deposition sources (magnetrons, also called the cathodes) are always on during a run. They can only deposit one material and only cover a small portion of the total surface on the optic to be coated. Therefore, my control algorithms had to determine how to move equipment inside the chamber to properly and accurately coat the optic evenly. Things that I had to design and build to achieve this are:

- Spec out and buy many stepper controller / driver / power supply / motors, including vacuum compatible steppers and drivers that do fancy things like holding current cutoff (for heat reduction) and microstepping
- Design and build a completely new chamber (pictured above) with CAD, including all internal optic manipulation hardware, ferrofluidic feedthroughs, chamber stand/dolly, lid hoists, etc.
- Made a mandrel (controlled VIA a vacuum rated stepper) to add an extra dimension to coatings (coat cylindrical shell optics in addition to flat wafers)
- Assorted power supplies and instruments to monitor temperature, flow rate, etc.

##Other Work

Other odd jobs I've done at the CFA include:

- Supervising a high school student for a summer
- Fixing a $70,000 profile-meter used for optic substrate characterizations
- Decreased chamber shutter latency and saved money by designing a cheap solenoid controller with an arduino
- Helped with data distribution for an experiment run at Brookhaven National Laboratory
- Probably more things that I am forgetting about

##Conclusions

Ultimately the end result has been the creation of a robust and easy to use platform that makes the daunting task of producing any kind of X-ray optic safe, easy and as stress free as possible for someone not intimately familiar with the details. Hopefully if NASA ever gets enough funding, my tools will end up creating something that ends up in space!
