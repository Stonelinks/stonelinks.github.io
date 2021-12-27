---
title: FCC ECFS Comment Dataset
date: 2014-08-19
tags:
  - net neutrality
  - datasets
---

**Update (9-18-2014)**: Turns out the FCC just ended up releasing all the data in bulk and [other people have already cleaned it up and are doing cool things with it](http://sunlightfoundation.com/blog/2014/09/02/what-can-we-learn-from-800000-public-comments-on-the-fccs-net-neutrality-plan/).

<div class="summary-end"></div>

[github.com/Stonelinks/FCC-Proceeding-14-28-Data](https://github.com/Stonelinks/FCC-Proceeding-14-28-Data)

If you've looked at US news in the last couple months, you've no doubt heard something about "net neutrality". A lot of people have probably heard of it but probably don't know what it is or why it is important. [John Oliver](https://www.youtube.com/watch?v=fpbOEoRrHyU) does an awesome job motivating the topic for the average person. Fair warning, it is a bit scatological.

The FCC has opened up its [electronic comment filing system](http://apps.fcc.gov/ecfs/) (ECFS) for public comments about legislation that threatens the fairness and openness of the internet. Problem is that the FCC website is slow, PDF only and saves only the last 100 pages of comments. The system is cumbersome at best and inaccessible at worst. To solve this I wrote a scraper several months ago and have been scraping the comments on proceeding 14-28 almost every day. To date I've collected 153720 comments and about 570 MB of comment plain text. You can find download instructions and more over on [github](https://github.com/Stonelinks/FCC-Proceeding-14-28-Data).

Today I'm releasing the dataset because I want to see what other people can do with it. I really want to use it to get my hands dirty with natural language processing, sentiment analysis and topic analysis. Hope someone finds it useful!
