---
title: Door Mounted Robo Schwarzenegger
date: 2010-11-12
template: article.jade
---

<center>
<img src="{{ assets }}/img/posts/downsize_4-225x300.jpg" width="50%">
</center>

I don't get to fool around with my own projects nearly as much as I would like, but this weekend I did devote a few hours to finishing up a robotic internet controlled camera on our apartment door, and I made it look like Arnold Schwarzenegger.

<span class="more"></span>

The pre-existing peep hole on our door didn't exactly work, and I'm tired of people knocking and having no idea who is there, so I felt like this was an appropriate solution. The story of exactly how and why I made this goes back to this summer.

One day in August I had this idea of creating a Generic Web Enabled Robotic Operating System (GWEROS... yeah I know it's a pretty stupid sounding name, give me a break) that would essentially allow you to create an awesome, high functioning robot out of a wide variety of off the shelf hardware and popular web technologies so long as it had a few basic requirements: a webserver, a webcam, a serial port attached to a microcontroller (arduino, pic, whatever) and some servos, motors, wheels or whatever. The aspiring robot enthusiast would cobble together whatever hardware he or she can manage, install GWEROS (make the install/update process really simple like [wordpress](http://codex.wordpress.org/Installing_WordPress)) and be up and running in no time.

Basically I thought it could be like a less hardcore version of [ROS](http://www.ros.org/wiki/) (which is totally badass) for use exclusively in the browser. I even think if done properly and given enough time to gather community support, people much smarter than myself could write plugins that would allow GWEROS users to do powerful things with their robots [right from their web browser](http://mjpg-streamer.svn.sourceforge.net/viewvc/mjpg-streamer/mjpg-streamer/www/javascript_motiondetection.html?revision=83&view=markup&pathrev=83) typically reserved high end or high priced robots.

Needless to say it was an extremely ambitious for a project for the middle of a busy summer internship. While I wish I had the time to pour into making it a reality, I had more than enough on my plate at the Harvard-Smithsonain Center for Astrophysics. Therefore I only started writing the interface and just finished writing some basic camera / telemetry code this weekend. The end result is what you see here:

<center>

<img width="50%" src="{{ assets }}/img/posts/downsize_2-150x150.jpg">
<img width="50%" src="{{ assets }}/img/posts/downsize-150x150.jpg">
<img width="50%" src="{{ assets }}/img/posts/downsize_3-150x150.jpg">
<img width="50%" src="{{ assets }}/img/posts/Screenshot-150x150.png">

</center>

The best part about it? Nobody even knows it's there because it is disguised as Arnold Schwarzenegger.
