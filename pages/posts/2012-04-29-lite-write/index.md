---
title: How I do Word Processing
date: 2012-04-29
layout: post
path: /posts/lite-write/
tags: 
  - documentation
---


<div class="gh-container">
  <a href="https://github.com/Stonelinks/Lite-Write" class="btn btn-primary btn-lg btn-block">github.com/Stonelinks/Lite-Write</a>
</div>

A few months ago I came up with a quick and dirty way to write text documents. I'm calling it [Lite Write](https://github.com/Stonelinks/Lite-Write) because it is so simple. I've been using it in place of a word processor for awhile and been very happy with it.

Like most people who write a lot of code, I'm most comfortable manipulating text in my editor of choice. However, I do a fair amount of writing that needs to be accessible to non programmers, which means my work really can't stay in plain text forever. Lite write is a simple setup (basically a Makefile and some bits of HTML/CSS) that allows you to:

- Write everything in markdown
- Produce a PDF of your document
- Produce a standalone HTML version of your document anyone can view online (this works really nice with dropbox)
- Simple, easy to extended

Over time I've grown very frustrated with traditional word processors (MS Word, OpenOffice, etc.). Google Docs is pretty good, but not well suited for when you're offline or need fine control over formatting. I used LaTeX for awhile because it gave me that control over formatting and produced beautiful looking documents. But while awesome for equations, large amounts of text and so many other things, LaTeX's syntax felt cumbersome for me and seemed way overkill for shorter documents.

Enter Lite Write. Markdown is simple enough that you don't even need to think about it when writing, and if you need finer control over formatting, just write HTML. So far has been great, and hopefully other people will read this, use it and maybe even add more formats to it.
