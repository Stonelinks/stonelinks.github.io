---
title: Download - Stoolbotics
---

[Home](/projects/stoolbotics/)
|
[Download](/projects/stoolbotics/download/)
|
[Quickstart](/projects/stoolbotics/quickstart/)
|
[Docs](/projects/stoolbotics/docs/)

### Windows Prebuilt

Stoolbotics comes in a pre-packaged, portable build for Windows:

#### [Windows Prebuilt](https://drive.google.com/open?id=0B8M9JkcII4wdTWxQSjRHWU13WkE)

Simply unzip and run `stoolbotics.bat`, and you should be up and running!

### From Source (all platforms)

#### [https://github.com/Stonelinks/Stoolbotics](https://github.com/Stonelinks/Stoolbotics)

If you're feeling more adventurous, or want to develop Stoolbotics, you can run the simulator through python from the command prompt. You will need to install a few dependencies though:

- Python (2.7 works best)
- Numpy
- PyOpenGL
- (optionally) the python imaging library (PIL)
  - If you choose not to install PIL, the only functionality that will be effected is the ability to take screenshots from within the simulator.

Once the above is installed, make a clone of our repository by running `git clone https://github.com/Stonelinks/Stoolbotics.git`, then just run `sh Stoolbotics.sh` to fire up the simulator. Any time you wish to update, just run `git pull` from inside the repository.
