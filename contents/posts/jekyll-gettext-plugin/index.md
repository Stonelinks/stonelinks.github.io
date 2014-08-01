---
title: Jekyll Internationalization
date: 2014-08-01
template: article.jade
tags: web development, ruby, jekyll, i18n
---

<div class="well" style="max-width: 400px; margin: 0 auto 10px;">
  <a href="https://github.com/Stonelinks/jekyll-gettext-plugin" class="btn btn-default btn-lg btn-block">github.com/Stonelinks/jekyll-gettext-plugin</a>
</div>

As the friendly neighborhood web developer at MUJIN, one of my responsibilities is [our company's website](http://mujin.co.jp/). I made this site mostly by myself using [jekyll](http://jekyllrb.com/), the static website generator that github uses for github pages by default.

Jekyll is pretty awesome, but doesn't support internationalization which we obviously need as a Japanese company. I got something really simple working with [jekyll-multiple-languages-plugin](https://github.com/screeninteraction/jekyll-multiple-languages-plugin), I wasn't happy with it. The translation index had to be manually kept which was a giant pain (especially since non-technical people edit content on the site).

As a long time django user, I really like the way it handles [internationalization](https://docs.djangoproject.com/en/dev/topics/i18n/), namely the fact that the translation index was automatically updated as people edited content in the standard gettext `.po` file format.

I endeavored to create such a solution for jekyll using ruby, something I was completely unfamiliar with. I learned some ruby basics, how [rvm](https://rvm.io/) and [RubyGems](https://rubygems.org/) work, and finally leveraged the existing libraries [get_pomo](https://github.com/grosser/get_pomo) and [fast_gettext](https://github.com/grosser/fast_gettext) which did a lot of the heavy lifting for me. You can read more about how to actually use my library over on [github](https://github.com/Stonelinks/jekyll-gettext-plugin).

I rounded out our internationalization solution by using the [Accept-Language](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4) header to redirect users to the website in their browser's language (but still be able to override it by going to specific language endpoints). Here is the section from  `.htaccess`:

```
RewriteEngine On

RewriteCond %{HTTP:Accept-Language} ^en.*$ [NC]
RewriteCond %{REQUEST_URI} ^/$ [NC]
RewriteCond %{QUERY_STRING} !(^q\=) [NC]
RewriteRule ^(.*)$ /en/ [L,R=302]

RewriteCond %{REQUEST_URI} ^/$ [NC]
RewriteCond %{QUERY_STRING} !(^q\=) [NC]
RewriteRule ^(.*)$ /ja [L,R=302]

```
