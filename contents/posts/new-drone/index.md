---
title: New Aerial Drone
date: 2012-04-22
template: article.jade
---

<div class="text-center"><iframe width="500px" height="400px" src="http://www.youtube.com/embed/3jVKegQwZ24" frameborder="0" allowfullscreen></iframe></div>


Good news and bad news! The good news is that in the last month or so at RPI, my friend Drew and I were able to cobble together some electronics with my airplane and squeeze in some successful flights of an RC drone! In the video above you can see one of our voyages. I successfully piloted the plane over RPI's campus for about a half hour until the winds started to pick up and things got messy.


<div class="text-center">

<img src="{{ assets }}/img/posts/drone.jpg" class="thumbnail" width="80%">

Early mock up of the drone with the wings removed.

The camera has since been mounted to a custom pan/tilt module under the engine.

</div>

<br>
<br>

Which leads to the bad news. The bad news is that it crashed! Or rather I crashed it. Basically the wind was really strong and blew it out of range. We think it took a nose dive several hundred feet into the ground and crashed near Troy Highschool, which was very far away from us. It was lost for two days before we recovered it thanks to [Reddit](http://www.reddit.com/r/RPI/comments/tj2b2/anyone_seen_a_red_rc_plane_last_seen_doing_a_nose/).

The damage was substantial. Besides the airframe being totally trashed, I lost my camera and a brushless motor. Drew faired better, only suffering minor damage to his radio equipment.

Future plans for the drone are:

- Repair it to pre-crash condition, and never fly in heavy winds again
- Make it controllable from a computer (probably with a microcontroller and an Xbee)
- Make it autonomously fly! (with GPS, some kind of horizon sensor, accelerometers, gyros etc.)

Other cool applications I can think of:

- Make 3d maps of things (e.g. map my neighborhood by flying around it while saving images with location and orientation of the drone)
- Automatically follow things (maybe use another GPS as a beacon or build a classifier for OpenCV)
- Go to waypoints and drop things (how cool would it be to stand in the middle of a field and have a candy bar drop from the sky?)

At any rate, a fun new experiment!