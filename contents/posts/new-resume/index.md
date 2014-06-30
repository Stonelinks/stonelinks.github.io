---
title: New Resume
date: 2013-01-06
template: article.jade
tags: documentation
---

Over the holidays I finally got around to implementing what I wish existed back when I was looking for a job: a quick, easy, flexible way to write and publish a resume in many formats. The more people who see your resume, the better your chances of getting an interview or call back from a potential employer. This means the more formats and places that your resume is viewable in, the better. When I was looking for a job, I tried to follow this strategy but quickly tired making the same change on multiple versions of my resume in different formats.

Like any programmer that has to do anything more than once, I wanted to automate this tedious editing. So I endeavoured create a better reseume authoring solution. Specifically, I wanted these features:

- Explicit seperation of resume data from resume formatting
- Store resume data in an easy to manipulate format
- Write once, publish and deploy the resume everywhere

I ended up engineering a solution that used a JSON file to store resume data, and a simple python program that would use different "writers" to spit out the resume in different formats. Here is a breakdown of the supported formats using a combination of the generator and some macros in a Makefile:

- text
- html
- pdf (using [wkhtmltopdf](http://code.google.com/p/wkhtmltopdf/))
- markdown
- stonelinks-specific markdown (basically a special markdown template used specifically for the resume on this website)

Anyhow it is finished and it works great for my purposes. The code is available [here](https://github.com/Stonelinks/resume) on github. It should be easy for others to use it, just fork and modify the JSON with your resume data and have at it!
