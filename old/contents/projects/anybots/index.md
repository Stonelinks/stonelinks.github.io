---
title: Super_robert / Anystats
template: page.jade
---

<div class="media-container">

<img src="/images/projects/anybots/qb.jpg">

<p>Anybots QB</p>

</div>

I spent the summer of 2011 at an internship with [Anybots](http://anybots.com), a small robotics startup out in Silicon Valley. For a long time Anybots was mostly a research company, producing robots like Monty and Dexter (both pictured below). However, two years ago they began to design QB (pictured above), a telepresence robot that aims to act as a robotic avatar to allow users to project their presence to other people from afar.

During my short time at Anybots, I noticed a severe lack of infrastructure for monitoring the fleet of about 130 robots out in the world. We're talking several million dollars' worth of robots deployed over the country and in some cases outside of the country. A coworker of mine, Robert, was spending a tremendous amount of time every day manually checking what robots were online by SSHing into each one and reading the logs, which were often thousands of lines long. Because scalability is one of the things that can kill a startup and because I wanted to free up his valuable time, I wrote Super_robert and Anystats to help out by automatically gathering logs from robots and computing information and statistics about global robot fleet status.

![anybots](/images/projects/anybots/montydexter.jpg)

Anybots research robots Monty (left) and Dexter (right)

## Super_robert and Anystats

Super_robert is a program that to sequentially logged into robots out in the field, pulled down their logs and computed information about them. This information was then passed over to Anystats, a webapp which statistically tracked, analyzed and prioritized the different events that appeared in the logs.

Depending on what state a robot was in, how long it had been that way, what the logs showed, etc., bugs and other faults could be automatically tracked and diagnosed (like [sentry](https://getsentry.com/welcome/) but for robots).

## Why it was useful

- There were several cases where a bug would be affecting robots in our office, and it was useful to see if the same bug was affecting robots worldwide
- If the robot in question was in the hands of a customer and we did discover something wrong with it, we could be proactive and contact that customer to let them know we were aware of the problem and working to fix it
- We could automatically compute lists of the healthiest robots, the sickest robots, etc. that could be broken down into sub-groups like hardware revision, location, etc. for us to diagnose

## Features

Some highlights of the system are:

- Present all information in an intuitive manner through a web interface
- Automatically sent daily global fleet status emails to engineering team
- Used google APIs to store data in existing google docs spreadsheets and generate attractive charts
- Kept track of "deltas" for all robots (e.g if a robot was online yesterday and offline today, we would be notified)
- Maintained various rankings for most healthy robots, sickest robots, robots with a specific error, etc.

## Other Work at Anybots

Working with the actual codebase for the robot was tough because it was very large, several years old and I only had a few months there. However, I did developed some UI features for the touchscreen on the forehead of the robot, including a "dashboard" to display internal robot device health and connectivity. I also wrote call screen to allow users to answer or deny calls made to their robot.
