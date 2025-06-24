---
title: Harvard - Smithsonian Center for Astrophysics
featuredImage: /amf/chamber.png
date: 2012-01-01
dateFormat: '2009 - yyyy'
---

From 2009 to 2012 I worked at the Harvard-Smithsonian Center for Astrophysics (Harvard-CfA) on producing prototype X-ray optics on a summer internship / part time basis. I helped design the hardware and wrote the software to automate fabrication of multilayer X-ray optics, the kind that would eventually be used in X-ray observatories in space. Along the way, I had the pleasure to work with (astro)physicists Dr. Suzanne Romaine and Ricardo Bruni, both of whom have become great mentors and friends over the years. I'm forever thankful for the oppertunity to work there, and I can't believe they took a chance on me when I was just a freshman!

## Multilayer X-ray optics

Much like a lens for visible light, a multilayer X-ray optic is designed to capture, focus and reflect X-ray photons from deep space back to a detector inside a telescope. If these detectors are arranged into a grid and opened up to space to gather photons, eventually an image will form. The optics are called "multilayers" because they are coated with very thin (sometimes only a couple of angstroms) alternating layers of different materials.

Skip this paragraph if physics isn't interesting to you. This precise but very thin alternation of materials in the multilayer is important because the angle the X-ray photon bounces (or reflects) off the optic is directly related to its energy level, and therefore the intensity of the pixel in the final image. Full disclosure, I'm an engineer not a physicist, but I think of this process like reverse X-ray crystallography. In crystallography, [Bragg's Law](https://en.wikipedia.org/wiki/Bragg%27s_law) is used to analyze the atomic structure of an unknown crystalline material (usually a metal) by shooting it with X-rays of known position and energy, then observing the resulting diffraction pattern. This pattern shows how the X-ray photons bounced off the atoms in the unknown material, and precisely describes its internal atomic structure. This can be very useful to material scientists, metallurgists, etc. trying to understand and characterize the material. For astrophysicists trying to understand X-rays, Bragg's Law is used in reverse. The multilayer behaves like a crystalline material of known structure since it was precisely manufactured by humans (using the software I wrote). When X-ray photons of unknown origin and energy (like ones that spend millions of years traveling across the galaxy) hit it, how it bounces off the multilayer optic can be used to calculate the photon's energy and understand where it came from.

Back on topic -- the system described here is what actually does the coatings of the optic. This is challenging because unlike traditional optics (lenses for visible light), X-ray optics are not all a standard shape. They can be parabolic, hyperbolic, cylindrical, maybe the same shape but repeated in many concentric shells. Our testing is done on flat silicon wafers, but the software has to handle all sorts of weird geometries. Optic shape is ultimately driven a combination of trying to capture as many photons as possible, trying to capture the right kind of photons, keeping the optic size small, light and but still robust enough to fit on a spacecraft and survive a launch. Optics are also very fragile and sensitive -- they need to be either a vacuum chamber or a clean room at all times.

## How to make multilayers

The technique used to actually coat the optic is called DC magnetron sputtering. A good explanation of the basic technique can be found [here](http://www.ajaint.com/whatis.htm). Some quick facts about the process:

- Coating is done in a vacuum chamber, sometimes quite large ones
- Chambers all have different geometries and hardware available for making different optics
- Deposition rates of materials are held constant within a fixed cross section of the stream (called "sputter")
- Sputter cross section and optic substrate are different sizes, so the substrate needs to move around inside the chamber very precisely to ensure an even deposition of material
- The substrate needs move between at least two sputtering sources to form a multilayer

The deposition sources (the magnetrons) are always on during a run and emit the sputter. Usually they're materials like titanium, platinum or silicon nitride. The only way to turn a source "off" is to use a pneumatic device called a shutter that can temporarily block the flow of material from going anywhere. As mentioned earlier, sources only deposit one material and cover a small portion of the total surface of the optic to be coated. Therefore, the algorithms I wrote determine how to move equipment inside the chamber to properly and accurately coat it evenly at the specified thickness.

## Software

The major accomplishment at Harvard-CfA has been writing software to automate the task of creating an multilayer optic given a set of parameters (layer thickness, material types, etc) from a physicist trying to make an optic. Ultimately they want the optic to experiment with, but the experiments they run are far beyond my expertise and out of scope here.

![screen](/amf/screen.jpg)

**Multilayer Fabrication Software**: This is a very old screenshot, but the gray window is for production runs, the blue window is for manually controlling chamber hardware, and the yellow window displays the state of the chamber.

Along the journey of implementing this software, I have had to develop a UI, define and implement control sequences, build hardware monitors, error checking / diagnostic tools, motion control algorithms and more. One of the most challenging parts has been the program's organization over the years. As the complexity has increased, I've had to rework the architecture several times to increase run efficiency (sometimes runs take hours to produce an optic), eliminate redundant code, and ultimately make the whole application much tighter, portable and friendly both for users and me, the developer. The utilities I wrote also allow me to monitor and control chamber hardware without being physically present in the lab (extremely valuable for troubleshooting remotely).

The current incarnation of the software has been split into two major parts. At the lowest level, there is a **LabVIEW hardware interpreter** and other simple tools for manually controlling chamber hardware. This interpreter exists mainly because I got really annoyed with managing large, complex LabVIEW programs. I'd love to ditch LabVIEW altogether, however it is the only means of interfacing with the proprietary motion controller that drives chamber hardware, which would cost a fortune to replace or take lots of time to build ourselves. So I decided to make LabVIEW as dumb as possible.

I developed a simple instruction set for moving chamber hardware. The instructions are things like `MOVE_AXIS`, `OPEN_SHUTTER`, etc. that can all take optional parameters. Lists of these instructions ("programs" if you will) are fed into the LabVIEW interpreter and executed sequentially to move chamber hardware around while material is being deposited on the optic. This is called a "run", the act of actually producing an optic. These lists of instructions have to come from somewhere though.

The other half of the system is a **python / JS web application** with all the UI and high-level logic to read optic parameters, simulate the run and serialize the instructions for the LabVIEW interpreter to follow. It is a [webpy](http://webpy.org/) application, the source code of which is [available on github](https://github.com/Stonelinks/amf). Python does most of the heavy lifting. The UI is HTML, CSS and some of the first JS I ever wrote -- straight jQuery of course.

The decoupling of high-level (Python) and low-level (LabVIEW) is really nice since there are so many different types of coatings, optic geometries and chamber hardware configurations that the system has to keep track of. Since its all in Python, its easy to understand, change and version control everything. Its unfortunate the same can't be said for LabVIEW, which requires such an extraordinary amount of work to develop large scale applications. But keeping LabVIEW simple and generic means its not been touched in many years.

## Hardware

There were many hardware challenges as this system designed and built. Along the way I had to:

- Spec out, purchase and install motion control hardware on the chambers: motion controllers, drivers, power supplies and stepper motors. Even fancy things like vacuum compatible stepper motors, or advanced drivers that do things like holding current cutoff (for motor heat reduction, very important for maintaining a lowest possible vacuum) and microstepping.
- Design and assemble parts for a completely new chamber (pictured below) with Solidworks, including all internal optic manipulation hardware, [ferrofluidic feedthroughs](https://en.wikipedia.org/wiki/Ferrofluidic_seal) (another cool piece of vacuum technology), a heavy-duty chamber stand / dolly, a chamber lid hoist, etc.
- Design and built our own shutter controllers around an arduino, darlington array and some solenoids, which saved money and increased shutter performance.
- Made a mandrel (controlled by vacuum stepper) to add an extra dimension to coatings, which enabled us to coat cylindrical shell optics in addition to flat wafers.

![chamber](/amf/chamber.png)

Other odd jobs I've done at Harvard-CfA include:

- Fixed a $70,000 [profilometer](https://en.wikipedia.org/wiki/Profilometer) used for optic substrate characterizations instead of paying an expensive technician to come do it.
- Helped with data distribution for experiments run on the beamline at Brookhaven National Laboratory, shooting extremely high powered X-rays at our optics.
- Supervising a high school student for a summer.
- Write pages and pages of documentation.
- Probably more things that I am forgetting about.

## Conclusions

I really can't say enough about my time at Harvard-CfA. The end result of all this has been the creation of a robust and easy to use system that makes the once daunting task of producing any kind of X-ray optic safe, easy and as stress free as possible for someone not familiar with the inner working of the lab's vacuum chambers. Hopefully if NASA (or whoever puts scientific instruments in space these days) ever gets enough funding, my tools will end up creating some optics that end up in space!
