---
title: Super_robert / Anystats
featuredImage: /anybots/qb.jpg
date: 2011-01-01
dateFormat: 'yyyy'
---

Tools for Anybots that statistically monitor and compute information about fleets of robots.

<div class="summary-end"></div>

I spent the summer of 2011 at an internship with [Anybots](http://anybots.com), a small robotics startup in Mountain View. For a long time Anybots was mostly a research company, producing robots like Monty and Dexter (both pictured below). However, two years ago they began to design QB (pictured above), a telepresence robot that aims to act as a robotic avatar to allow users to project their presence to other people from afar.

During my short time at Anybots, I noticed a severe lack of infrastructure for monitoring the fleet of about ~130 robots out in the world. This was several million dollars' worth of robots deployed over the country and in some cases outside of the country. A coworker of mine, Robert, was spending a tremendous amount of time every day manually checking what robots were online by SSHing into each one and reading the logs, which were often thousands of lines long. Because scalability is one of the things that can kill a startup and because I wanted to free up his time, I wrote `super_robert` and Anystats to help him out by automatically gathering logs from robots and computing information and statistics about global robot fleet status.

![](/anybots/montydexter.jpg)

Anybots research robots Monty (left) and Dexter (right)

## Super_robert and Anystats

Super_robert is a program that attempted to procedurally log into robots out in the field, pull down their logs and compute some information about them. This information was then passed over to Anystats, which statistically tracked, analyzed and prioritized the different events that appeared in the logs.

Depending on what state a robot was in, how long it had been that way, what the logs showed, etc., bugs and other faults could be automatically tracked and diagnosed (like [sentry](https://getsentry.com/welcome/) but for robots).

## Why it was awesome

- There were several cases where a bug would be affecting robots in our office, and it was useful to see if the same bug was affecting robots worldwide
- We could automatically compute lists of the healthiest robots, the sickest robots, etc. that could be broken down into sub-groups like hardware revision, location, etc. for us to diagnose
- If the robot in question was in the hands of a customer and we did discover something wrong with it, we could be proactive and contact that customer to let them know we were aware of the problem and working to fix it

## Features

- Present all information in an intuitive manner through a web interface
- Automatically sent daily global fleet status emails to engineering team
- Used google APIs to back all data in existing google spreadsheets which would generate charts
- Kept track of "deltas" for all robots (e.g if a robot was online yesterday and offline today, we would be notified)
- Maintained various rankings for most healthy robots, sickest robots, robots with a specific error, etc.
