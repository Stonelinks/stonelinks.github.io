---
layout: page
title: Site map
base_url: "../"
---

#Site map

##Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | remove: 'index.html' }}">{{ post.title}} </a>
    </li>
  {% endfor %}
</ul>

##Pages

<ul>
  {% for page in site.pages %}
    {% if page.layout != nil %}
      {% if page.layout != 'feed' %}
        <li>
          <a href="{{ page.url | remove: 'index.html' }}">{{ page.title }}</a>
        </li>
      {% endif %}
    {% endif %}
  {% endfor %}
</ul>
