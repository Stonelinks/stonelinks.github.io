---
title: Stonelinks
template: page.jade
---

<div class="media-container">

<img src="/images/projects/stonelinks-web-framework.png">

</div>

"Stonelinks" is a name I use for myself all over the internet and of course the name of this website. In one form or another, Stonelinks the website has been online since late 2008 when I decided to figure out how the internet / websites work (a task which is still ongoing... I'll report back).

Since 2008, Stonelinks has gone through many incarnations. It started out life hosted out of my dorm room on a window's machine as an ugly hodge-podge of PHP and dreamweaver garbage. For a long time after that, it ran on [wordpress](https://wordpress.org/). At some point I decided that since Stonelinks is fundamentally static content, all of these solutions were too heavyweight and no server-side scripting languages were needed.

I wrote the stonelinks web framework back in 2012, which you can still see [here](https://github.com/Stonelinks/stonelinks.org) and [here](/projects/stonelinks/old.html). It statically generated the website HTML from some markdown which was then rsync'd off to a web server. Again this worked pretty well for my needs up until 2014.

After a year and a half at MUJIN learning how to be a serious front-end developer, I decided to transition stonelinks to a more modern 3rd party static generator called [wintersmith](http://wintersmith.io/) built on top of [nodejs](http://nodejs.org/). The switch made sense because wintersmith was fast, feature complete, simple and well tested. In addition, it also fit in nicely with the development tool's I've come to rely on in my professional life ([grunt](http://gruntjs.com/), [npm](https://www.npmjs.org/), [bower](http://bower.io/), etc.). It also supports a bunch of simple [plugins](https://github.com/jnordberg/wintersmith/wiki/Plugins) to do things like tagging, livereloading and whatnot.

So there you have it! From an author's and a developer's perspective, it is a dream come true. Hope you enjoy the website.

##Code

Check out the source code for stonelinks on [github](https://github.com/Stonelinks/stonelinks.github.io)
