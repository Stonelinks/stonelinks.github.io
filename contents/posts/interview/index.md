---
title: Web Developer Interview Questions
date: 2014-07-31
template: article.jade
tags: javascript, web development
---

We're constantly looking for talented people to join our small team where I work. When talking to candidates, I felt like I needed a set of questions I could use to guide the conversation and see where they're at.

Most of the topics have something to do with web development (particularly with javascript), but they start out pretty general and get more specific. Here is what I came up with.

<span class="more"></span>

You can click along and reveal the answers one by one or show them all at once.

<div id="controls" class="btn-group">
  <button type="button" class="btn btn-default btn-lg show-all">
    <span class="glyphicon glyphicon-plus"></span> Expand all
  </button>
  <button type="button" class="btn btn-default btn-lg hide-all">
    <span class="glyphicon glyphicon-minus"></span> Hide all
  </button>
</div>

<br/>

<div class="well">
<p class="interview-question">

What are some of the pros / cons of a language that uses an interpreter versus a statically compiled one?

</p>
<p class="interview-answer">

Answers at the very least should say something addressing performance, debugging and security concerns.

</p>
</div>

<div class="well">
<p class="interview-question">

Why are module loaders and dependency management important?

</p>
<p class="interview-answer">

Modules separate functionality into logical pieces that are easy to isolate, test and debug. Dependency management allows an application to easily declare what it needs to run, which makes it easy to create a new runtime (and go back in time and replicate an old runtime). All of these are super important in large applications.

</p>
</div>

<div class="well">
<p class="interview-question">

You have two identical libraries that do the exact same thing from a feature standpoint. How do you decide which one to use?

</p>
<p class="interview-answer">

I really like this question. It throws some people off, but insightful developers will look at the communities around each library and decide. Does one have an awesome mailing list? A ton of stars and issues being resolved on github? Frequent releases with meaningful changelogs? Those might be good signs. Has it been forked a million times? Does it have terrible, out of date or non-existent documentation? Was the last release or commit from the maintainer back in 2006? Those might be bad signs.

</p>
</div>

<div class="well">
<p class="interview-question">

Do you write tests? Can you list tools/techniques you use for testing?

</p>
<p class="interview-answer">

Expect to talk about unit test, code coverage, CI solutions, mocking, etc.

</p>
</div>

<div class="well">
<p class="interview-question">

What is the functional role of deployment in an application’s life cycle? How would you ideally deploy an application?

</p>
<p class="interview-answer">

Deployment is where you actually “ship” your code and get it running on a customer-facing machine. Lots of potential answers for ideally deploying an application. I’m personally against using git to deploy, and would instead prefer something like rsync. There are many other purpose built deployment tools out there like capistrano (if they’re a ruby person), salt, ansible etc.

</p>
</div>

<div class="well">
<p class="interview-question">

What is the point of virtualization? Does every application have something to gain by being virtualized?

</p>
<p class="interview-answer">

Tricky question to answer. Visualization abstracts hardware away from your application’s runtime at the cost of some performance on a per-host level. In aggregate, good visualization solutions allow for easy scaling of complex application architecture. Really awesome developers will say something about [Docker](https://www.docker.com/) here.

</p>
</div>

<div class="well">
<p class="interview-question">

Talk to me about the functional roles HTML, javascript and CSS play in a web browser

</p>
<p class="interview-answer">

This is an extremely basic question, but you want to make sure people have a solid foundation. HTML is the structure and layout of the page, CSS is the styling, presentation and (to an extent) animation and javascript is program logic that can be used to create complex applications and UI.

</p>
</div>

<div class="well">
<p class="interview-question">

Give me an example of something in HTML5 that we use or might use in the MUJIN Controller interface

</p>
<p class="interview-answer">

WebGL is the extremely obvious answer here, if they've seen our UI, but we also use the video element, local storage and the history API. Websockets and the audio API are also used for development.

</p>
</div>

<div class="well">
<p class="interview-question">

In CSS, what is the point of media queries? Why might they be useful?

</p>
<p class="interview-answer">

Media queries allow different CSS rules to be applied depending on different viewing device parameters. They can be used to make web pages look good on a desktop or a cell phone without changing the content (HTML) of a page.

</p>
</div>

<div class="well">
<p class="interview-question">

What does jQuery do? Is it necessary? Why might you not use jQuery?

</p>
<p class="interview-answer">

Another favorite question of mine. jQuery is primarily a DOM manipulation, AJAX library and cross browser friendly event library. It makes the native DOM, networking and event APIs exposed by the browser easier to use. jQuery is a huge library, so if you’re only using it to call one function consider implementing something natively.

</p>
</div>

<div class="well">
<p class="interview-question">

What are data attributes on HTML elements used for? Why is it important not to abuse or overuse them?

</p>
<p class="interview-answer">

They store small bits of relevant application data stored in the DOM. Using them too much can make the DOM super messy (pollution) and hard to debug. Improper use may also lead to bad synchronization issues between DOM state and application state. Frameworks like Knockout have two way DOM-data bindings in them to get past this.

</p>
</div>

<div class="well">
<p class="interview-question">

What is the point of minifying code? If there was a bug with some minified code how would you go about debugging it?

</p>
<p class="interview-answer">

Minifying code can be used to speed up large webapps. It is less total bandwidth and code is usually run through an optimizer so it executes faster. It DOES NOT make your application secure -- people can still read your source and look at the DOM. It offers weak security at best. Generally you debug minified code by having source maps or a debug version of your app where you can clearly reproduce and figure out where the error is happening.

</p>
</div>

<div class="well">
<p class="interview-question">

What would the best way to store a large list of numbers in javascript (like the 3d coordinates for all the vertices in our WebGL viewer for instance)?

</p>
<p class="interview-answer">

This question is to test their knowledge of data types. For a large list of numbers, there are native implementations of things like a Float32Array that are higher performance than the native array implementation.

</p>
</div>

<div class="well">
<p class="interview-question">

Is javascript object oriented? Talk about how inheritance is implemented in javascript.

</p>
<p class="interview-answer">

Javascript is object oriented, meaning everything not a native type (like an int or whatever) is an object. Inheritance is implemented with prototyping. Every object has a prototype, and if you access an attribute on an object that isn’t there, the runtime will check up the prototype chain until it finds something. If it reaches all the way to the root object, then the attribute returns as undefined. Inheritance is implemented with the prototype chain where different objects “extend” off of others.

</p>
</div>

<div class="well">
<p class="interview-question">

How do you safely check if something is undefined?

</p>
<p class="interview-answer">

Use the triple equals (blah === undefined). Double equals will cast them to strings and compare the strings.

</p>
</div>

<div class="well">
<p class="interview-question">

How does scoping work in javascript? How do you prevent global namespace pollution? What is the window object for?

</p>
<p class="interview-answer">

Javascript has function (as opposed to block) level scoping. Namespace pollution can be prevented by wrapping in a closure like so: (function() { safe code here... })(). The window object is a special global object representing the browser window that is always in scope.

</p>
</div>

<div class="well">
<p class="interview-question">

What is a websocket? Describe a situation where they’d be better than HTTP.

</p>
<p class="interview-answer">

A websocket is a raw TCP socket connected to the browser via javascript. It is useful when the server needs to push data to the browser without the browser periodically polling. They are also well suited to applications where a lot of IO and near-real time communication is necessary. A situation where they’d be useful would be pushing robot position updates to the browser while it is moving in the real world.

</p>
</div>

<div class="well">
<p class="interview-question">

Why is templating useful? Is it faster to render templates on the server or browser? Are you familiar with client side templates? Why might you choose to render templates on the client?

</p>
<p class="interview-answer">

Templating is useful because it allows a separation between model data and view layout. It is essentially bulk manipulation of the DOM. Server side templating is almost always faster, but client side templates are awesome for javascript-heavy apps. They are easier to re-render if data changes and are usually smaller and easier to maintain than their server side equivalent.

</p>
</div>

<div class="well">
<p class="interview-question">

Discuss how a client side MVC framework like Backbone.js are useful in the browser. How does it differ from a server side MVC framework like django or rails?

</p>
<p class="interview-answer">

Lots of ways to answer this, but generally M = data coming to or from a server, V = a form or section of the DOM manipulating that data, and C = a router that uses the URL to map to a specific application state. It is different from server side MVC since the pattern is essentially applied recursively for a particular page, meaning that pieces of the MV part of the application can be contain or be contained by other views. Django applies the whole MVC paradigm once on a per-page basis.

</p>
</div>

<div class="well">
<p class="interview-question">

Discuss how the MVVM pattern could be useful, especially if a view gets really complicated.

</p>
<p class="interview-answer">

MVVM is useful when a view (or set of views) get complicated enough where it makes sense to create another model (the ViewModel) just to encapsulate view state.

</p>
</div>

<div class="well">
<p class="interview-question">

What is a RESTful API? What are they good at? What are they bad at?

</p>
<p class="interview-answer">

REpresentational STate transfer refers to an API designed to make it easy to manage groups of resources. Typical operations supported are fetch, modify, create and delete through HTTP methods (GET, PUT, POST and DELETE respectively). Resources are uniquely identified through their URLs. They’re awesome at managing groups of resources, but they’re bad at RPC type things since servers are ideally stateless. Also, there is no standard when it comes to REST, it is a convention that every library and framework follows slightly differently.

</p>
</div>

<div class="well">
<p class="interview-question">

What is node.js? Have you used it for anything? What is it good at? Bad at?

</p>
<p class="interview-answer">

Node is a browserless javascript runtime. Like its browser counterpart it is simple, powerful and incredibly versatile. You can use it to write command line or GUI programs, utilites, or even your own webapps. It is particularly good at asynchronous and I/O heavy applications. Since javascript is single threaded, it is bad for multiprocessing and other CPU intensive tasks. 

</p>
</div>

<div class="well">
<p class="interview-question">

Have you ever used a javascript module loader?

</p>
<p class="interview-answer">

Good answers here will talk about commonjs and/or AMD and their implementations such as requirejs.

</p>
</div>

<div class="well">
<p class="interview-question">

What are some tools you use when building a webapp?

</p>
<p class="interview-answer">

Really no wrong answer here, but some of the tools we use at MUJIN: Grunt, Bower, NPM, Webkit inspector. Some other javascript-specific tools that are quite good: gulp, component, 

</p>
</div>

<div class="well">
<p class="interview-question">

What browser do you use when building a webapp and why?

</p>
<p class="interview-answer">

Bad answers here are IE or Firefox (unless they are a firebug wizard). Good answers chrome with some mention of the webkit inspector.

</p>
</div>

<div class="well">
<p class="interview-question">

Why is chrome fast?

</p>
<p class="interview-answer">

A perfectly acceptable answer might be that it has the best engineers and billions of dollars behind it. Technical reasons are that it uses V8, which is an extremely fast javascript engine. V8 is fast because of its JIT and that it directly emits executable machine code and doesn’t screw around with bytecode like most VM-based interpreters (like python for instance). Chrome’s architecture also makes heavy use of multiprocessing. For instance, each tab is its own process. This allows for more parallel execution and better use of a computer's hardware.

</p>
</div>
