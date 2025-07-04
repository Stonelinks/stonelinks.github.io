---
title: LabVIEW Custom Documentation Formats
date: 2010-11-21
tags:
  - harvard
  - astrophysics
  - labview
  - documentation
---

LabVIEW is a necessary and constant evil with my work at the Harvard-Smithsonian Center for Astrophysics, but sometimes it pulls through. Earlier today I found myself with a need to extract a whole bunch of icons, block diagrams and VI hierarchies a bunch of LabVIEW programs for some documentation I was writing. In my case, I was using LaTeX and wanted to include visuals from my LabVIEW stuff.

Up until now I thought this would mean trying to do a million screenshots over VNC on my work computer, and then going back and cropping what I needed. This seemed horrible though and on further research I was thrilled to find out that LabVIEW can pretty much do this on its own. See the [NI website on printing VI documentation](http://zone.ni.com/reference/en-XX/help/371361B-01/lvconcepts/printing_vis/).

Basically what I did was import the VI hierarchy for my top level VI (the lab dashboard in my case), create a custom format for my documentation, check off what I want to appear, and then output it all as HTML. Since the directory where the HTML was generated is now chock full o' images, I just took what ones I wanted and inserted them into my documentation and discarded the HTML. Just goes to show you how a user can find many different ways to use a one part of a program for what it might not have originally been intended. Probably a couple hours of tedious screenshotting saved! And I can re-run the process any time if things change.
