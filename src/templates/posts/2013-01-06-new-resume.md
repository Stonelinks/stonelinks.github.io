---
title: New Resume
date: 2013-01-06
---

Over the holidays I finally got around to implementing what I wish existed back when I was looking for a job: a quick, easy and flexible way to write and publish a resume in many formats. The more people who see your resume, the better your chances of getting an interview or call back from a potential employer. This means the more formats and places that your resume is viewable in, the better. I tried to follow this strategy, however quickly tired making the same change on multiple versions of my resume.

Like any programmer that has to do anything more than once, I wanted to automate this tedious editing. So I endeavoured create a better reseume authoring solution. Specifically, I wanted these features:

- Explicit seperation of resume data from resume formatting
- Store data in an intuitive and easy to manipulate format
- Write once, publish and deploy resume everywhere

In order to separate data from formatting, I decided the best thing would be to store the resume data in a JSON file and then use a python script to print out different views of the content. I called this program the "generator" since it essentially generated a resume instance from an input JSON file. The generator uses different "writers" to print it back out in different formats. Here is a breakdown of the different formats supported using a combination of the generator and some macros in a Makefile:

- text
- html
- pdf (using [wkhtmltopdf](http://code.google.com/p/wkhtmltopdf/))
- markdown
- stonelinks-specific markdown (which is what is used to generate the html for my resume on this website)

Anyhow it is finished and it works great for my purposes. The code is available [here](https://github.com/Stonelinks/resume) on github. It should be easy for others to use it, just fork and modify the JSON with your resume data and use the generator to re-generate the resumes.
