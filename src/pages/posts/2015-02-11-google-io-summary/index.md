---
title: Google I/O 2015 Summary
date: 2015-02-11
image: /posts/google-io-summary/io15-color.png
tags:
  - javascript
  - web development
---

I had the opportunity to go to Google I/O last week. Overall not a ton of new announcements, 80% of everything was Android related and it was incredibly crowded. That being said, the Google X and ATAP talks were fantastic.

I’ve summarized the salient points of the talks I went to below for your perusal. I’ve stack-ranked and color coded them. Feel free to ask me questions if you want more detail than what is here.

## Moonshots in the real world AKA Google X keynote

- This was probably my favorite talk at IO
- Moonshots
  - Have to be:
    - A huge problem
    - Have a radical solution
    - Using breakthrough technology
- **Fail fast, fail often** was the overall theme of this talk
  - Failing is extremely important and we don’t do it enough
  - Go out in the real world and break your things
    - Its scary but worth it
  - When taking a parallel problem solving approach, this lets you prune the dead branches faster
- Project Wing
  - Goal: self-flying vehicles for delivery
  - Had to pick a "beachhead application" to start with
  - First beachhead: deliver automated external defibrillator (AEDs) to people before they die of a heart attack
  - Started out with two teams:
    - Engineers and scientists who went off and started building things
    - Another team asking if the problem they were solving was dumb
  - The second team ended up concluding that the problem was with people using AEDs, not the availability of the AEDs in the first place
    - So they failed and went after a different problem
    - Went to Australia and started delivering things seemingly at random (???)
    - Cattle farmers wanted vaccines for their cows
- Project Loon
  - Goal: Give the 3rd world internet
  - Team misestimated how much they had to learn
  - Use stratospheric balloons and sail around the layered wind currents up there
  - Balloons are as big as houses, didn’t anticipate the whiplash as they went between wind layers tearing balloons
    - Fail
    - Had to redesign
  - Wanted balloons to last 100 days, but kept leaking
  - As they made leaks better it took longer and longer to find them, victims of their own success
    - They needed to fail faster!
  - Made a "leak squad" that studied leaks in all types of thin membranes that need to be airtight
  - Ended up figuring out that people walking on balloons while filling with socks caused more leaks
  - Figured this out by giving people extra fluffy socks and running an experiment
    - Failure is fine as long as they’re set up like experiments
    - Be hungry to fail!
  - Loon can now circumnavigate the world and fly to within 500m of ground targets (this is insane)
- Self driving cars
  - It is hard to figure out the 10,000 things the world is telling you when driving
  - They thought they were "done" back in 2012 when the cars could drive on the highway pretty well
  - Gave some of them to other googlers, told them to watching the car and take over if it breaks
  - Turns out humans are terrible backup solutions
  - Team had to massively rescope what it was trying to do, figured out car can’t be "good enough" to do highways and rely on the human for the rest of the journey
  - Cars need to go all the way from A to B autonomously
  - Their original solution was a failure because it still relied on humans
    - Very existential and emotional for team
  - They decided they needed a car without a steering wheel so they weren't tempted to rely on the human in the car
    - Built that koala bear smart car thing
  - It got really good at driving around Mountain View
    - Needed it to fail faster
  - Formed a team just for finding negative examples of car performance

## ATAP Keynote

- ATAP is like google’s DARPA, except no defense stuff
- Year long timelines on really difficult technologies with a focus on actually bringing something to market
- Project Soli
  - Watch this, the demo for this is unreal: [https://youtu.be/mpbWQbkl8_g?t=19m45s](https://youtu.be/mpbWQbkl8_g?t=19m45s)
  - I want to put one of these on a drone
  - A virtual touch surface
  - Virtual tool manipulation
    - Sliders
    - Dials
  - Your hand IS the user interface
  - The underlying sensor is microwave radar
  - Designed to be put in phones and wearables
- Project Jaquard
  - Multi-touch inputs woven into textiles
  - Made of special conductive yarn / thread
- Auth
  - Multi-password non-password based auth
  - Based on combining multiple independent things about you
- Project Vault
  - A tiny secure computer in a micro SD form factor
- Project Spotlight
  - 3d movies you watch on a smartphone

## Material keynote

- Material design has been out a year and really popular
- Releasing a new icon library: [http://www.google.com/design/spec/style/icons.html#icons-system-icons](http://www.google.com/design/spec/style/icons.html#icons-system-icons)
- Screen size adjustment / adaptive display reflow guidelines
- New updated google design site: [http://www.google.com/design/](http://www.google.com/design/)
- New examples and tools for actually implementing material design
  - Polymer (now out of beta)
  - Android
    - Support lib
    - Design lib

## Mobile app containers

- AKA intro to kubernetes
- Kubernetes is a tool for managing containers
- Simple enough that it "fits in your head"
- Kubernetes concepts
  - Pods
    - The unit of scheduling in kubernetes
    - 1 or more containers
    - Meant to be ephemeral
  - Labels
    - How to make sense of a cluster
    - A way to group / search things
    - Key / value based
    - Use selectors to select different apps / environments
  - Replication controllers
    - Make sure the specified number of pods are running at any given time
    - They run a control loop, trying to make current state == desired state
    - BTW declared state ISN’T a recipe book (a la chef)
  - Services
    - Load balanced groups of pods
    - Contains a discovery mechanism

## Lovefield

- A relational query-engine in the browser, think sqlite in javascript without caring about the filesystem
- [https://github.com/google/lovefield](https://github.com/google/lovefield)
- Backed by indexDB
- Declare your schema in javascript that is 1-1 with equivalent SQL
- There is no SQL parser! No ORM! Just run queries using JS that maps to equivalent SQL
- Make queries observable so you can watch if data changes

## Chrome devtools and RAIL

- Goal: figure out when things are slow for users
- Important numbers:
  - 16ms: any longer than this between frames and video or animations feel slow
  - 0.1s: perceived as no delay
  - 1s: long enough to for users to maintain their train of thought without distraction
  - 10s: you’ve lost user’s attention
- Apps should be RAIL-aware
  - **R**esponsive to user input, IE no longer than 0.1s
  - **A**nimations should be smooth and consistent, IE no longer than 16ms between frames
  - **I**dle applications should be ready to respond to a user within 50ms
  - **L**oading should ideally take less than 1s
- Should always test on real devices
  - Build a device wall: [http://www.petelepage.com/blog/2014/07/devlab/](http://www.petelepage.com/blog/2014/07/devlab/)
- Remote debugging of chrome on a phone over USB
- Use the flamechart, look for how long event handlers take
- Coming up in devtools:
  - Film strip: devtools will automatically take screenshots as page loads and on state changes
  - Blame game: figure out what 3rd party libraries and network resources are slowing your app down

## Polymer and service workers

- Service workers: basically an event-based worker with special privileges
- Don’t rely on them, you should use them as "progressive enhancements"
- Presented the use case of using them to pre-cache images or resources
- Find this in [https://github.com/PolymerElements/polymer-starter-kit#service-worker](https://github.com/PolymerElements/polymer-starter-kit#service-worker)

## gRPC

- Google’s RPC implementation
- Works everywhere
  - Except embedded!
- The only transport is HTTPS-TLS-TCP

## Designing for Google Cast

- Google cast AKA chromecast can do games now
- Performance is a bit dodgey
- Presenter "sucked at games"
- Talk ended ~10 minutes early
