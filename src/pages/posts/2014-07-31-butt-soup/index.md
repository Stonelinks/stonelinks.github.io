---
title: Butt Soup
date: 2014-07-31
path: /posts/butt-soup/
tags:
  - javascript
  - web development
---

[Buttsoup](http://buttsoup.herokuapp.com/) is a silly little text to speech web chat thing I made a few months ago. It allowed me to familiarize myself with a few technologies I'd been meaning to try out. There are also a few easter eggs built in (try typing "cage mode" in and see what happens). Code for buttsoup itself is on [github](https://github.com/Stonelinks/buttsoup).

## Web Sockets

Blown away by how easy they are to use. I use tools every day that leverage web sockets (the live reloading feature of [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload) comes to mind), but I guess I didn't realize how simple they were. Obviously they have pros and cons over HTTP, but for large real-time systems, all you need is a simple events API and you can get something amazing running in a few hours. I used [socket.io](http://socket.io/) which was great but if I had to do it again I might go with the even higher level [primus](https://github.com/primus/primus).

## Web Workers and Emscripten

The text to speech part of the chat was done with [speak.js](https://github.com/kripken/speak.js/) which is a javascript port of eSpeak (written in C++) made with [Emscripten](https://github.com/kripken/emscripten), an LLVM bytecode to javascript compiler. Since speech synthesis is a fairly CPU intensive task (and javascript runtimes are almost all single threaded), speak.js runs in a web worker, which is a javascript runtime in a separate thread.

## Heroku

Last but not least is [Heroku](https://www.heroku.com/). Heroku is a PaaS (platform as a service) implementation. Companies like Amazon and Rackspace provide customers raw (virtual) servers for them to run their applications on. A PaaS takes this concept further by providing a platform for customers to run their applications. You don't have to think about operating systems, security updates, creating / provisioning VM images, deployment, configuring databases, web servers, proxies, load balancers, etc. You just write code and push it, and in minutes it is running in the cloud with no work from you. It is a dream for most developers.

I'd say Heroku and [Google App Engine](https://cloud.google.com/products/app-engine/) are the two best PaaS implementations out there, but both cost money. I've been keeping an eye on open source PaaS alternatives, most notably [flynn](https://flynn.io/). It isn't quite ready for prime time as of this writing though.

Heroku is great if for no other reason than it provides an amazing set of templates and guidelines for developing a web application using really sensible best practices. It does this in a way that is largely agnostic towards languages and libraries (and even Heroku itself). [docs.heroku.com](http://docs.heroku.com/) is just amazing. If you're newcomer (or even an old fart looking to brush up) to developing web apps, this is a godsend.
