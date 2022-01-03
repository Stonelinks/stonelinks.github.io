---
title: New WebGL Projects
date: 2014-10-10
tags:
  - webgl
  - javascript
  - web development
---

<iframe style="height: 500px; width: 100%;" src="http://stonelinks.github.io/three.js/examples/webgl_loader_collada_kinematics.html"></iframe>

I've been working on some new WebGL related projects for a 3d viewer and editor that targets robotics applications.

### [My three.js fork](https://github.com/Stonelinks/three.js)

All these projects are built on top of three.js. My fork added kinematics support to the collada loader. [Check it out!](https://stonelinks.github.io/three.js/examples/#webgl_loader_collada_kinematics)

### [Marionette-three.js](https://github.com/Stonelinks/marionette-three.js)

This is a library that wraps three.js components for Marionette. Provides a comfortable, event driven interface that abstracts away a lot of three.js things in an MVC friendly way. For example, a `Drawable` is a `Backbone.Model` instance that maintains its own `three.js` scenegraph node. Pass a `Backbone.Collection` of drawable models to a `three.jsRenderer` view and you're off to the races! The library also includes support for controls and loading different types of meshes inside `Drawable` instances. Check out an example [here](http://stonelinks.github.io/marionette-three.js/example/index.html) and code for it [here](https://github.com/Stonelinks/marionette-three.js/tree/master/example).

### [Xaphoon](http://xaphoon.herokuapp.com/)

This is a small heroku app that explores collaborative editing of a 3D environment. It incorporates the previous two projects plus [my fork of Backbone.IO](https://github.com/Stonelinks/backbone.io) (which I forked and added socket.io 1.0 support).
