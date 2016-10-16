---
title: New WebGL Projects
date: 2014-10-11
template: article.jade
tags: webgl, javascript, web development
---

I've been working on some new WebGL related projects for a 3d viewer and editor that targets robotics applications.

### [three.js](https://github.com/Stonelinks/three.js)

All these projects are built on top of three.js. My fork added kinematics support to the collada loader. [Check it out!](stonelinks.github.io/three.js/examples/#webgl_loader_collada_kinematics)

### [Marionette-three.js](https://github.com/Stonelinks/marionette-three.js)

This is a library that wraps three.js components for Marionette. Provides a comfortable, event driven interface that abstracts away a lot of three.js things in an MVC friendly way. For example, a `Drawable` is a `Backbone.Model` instance that maintains its own `three.js` scenegraph node. Pass a `Backbone.Collection` of drawables to a `three.jsRenderer` view and you're off to the races! The library also includes support for controls and loading different types of meshes inside `Drawable` instances. Check out an example [here](http://stonelinks.github.io/marionette-three.js/example/index.html) and code for it [here](https://github.com/Stonelinks/marionette-three.js/tree/master/example).

### [Xaphoon](http://xaphoon.herokuapp.com/)

This is a small heroku app that explores collaborative editing of a 3D environment. It incoporates the previous two projects plus [Backbone.IO](https://github.com/Stonelinks/backbone.io) (which I forked and added socket.io 1.0 support).
