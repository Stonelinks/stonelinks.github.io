---
title: SSH Periodic Screenshot
date: 2014-10-08
path: /posts/ssh-periodic-screenshot/
tags:
  - hacks
---

I came up with this fairly scary bash one liner that will periodically ssh into a machine that you have access to, take a screenshot and copy it back to your machine. Just fill in the USER and HOST variables.

```bash
USER=www-data; HOST=dev0; bash -c "while [ 0 ]; do ssh $USER@$HOST DISPLAY=:1.0 import -window root /tmp/a.png; date +%s | xargs -I {} scp $USER@$HOST:/tmp/a.png $USER@$HOST-{}.png; sleep 2; done"
```
