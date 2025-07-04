---
title: Mindshare
featuredImage: /mindshare/corgi.jpg
date: 2007-01-04
dateFormat: 'yyyy'
---

A forum I used to run for sharing ideas. Has nothing to do with corgis.

Mindshare was an idea I had awhile back as a means of sharing and recording ideas with friends.

Oftentimes I find that some ideas are far fetched or out of a particular project's scope. These ideas are not necessarily bad, just not useful at the time. I thought it would be good to record these for later reference, and even cooler to share them with other people who might read them and maybe respond or share some of their own.

Unfortunately Mindshare is no longer active. It died when I switched stonelinks off wordpress and to the current structure. If there is enough interest, maybe I'll bring it back.

## Mindshare Archive

<ul id="mindshare-archive-anchor"></ul>

<br/>

### Assassins (WebApp)

---

**Guest at 2010-05-03 23:30:22:**

Simple web app to automate the task of running real-life assassins games\* by (optimally) assigning aliases, ranking players, giving players several ways to confirm kills (email/text/log-in) and offering team/group-based support. Also, messaging all members when someone is assassinated, etc.

DATA MODELS:

- Team
  - has_many Players
- Player
  - belongs_to Team
  - has_one Target (another Player)
  - has_one Assassin (another Player)
  - other variables: status (alive/dead/deadlined), deadline (time remaining before next kill must be completed)

see http://en.wikipedia.org/wiki/Assassin_%28game%29

### Better Branch Predictor?

---

**Guest at 2010-03-24 06:26:15:**

See [http://en.wikipedia.org/wiki/Branch_predictor](http://en.wikipedia.org/wiki/Branch_predictor) for background.

Any novel ideas? I'm trying to come up with a new one for a final project.

---

**Guest at 2010-03-26 03:25:24:**

Thought/read about this for a couple hours yesterday and today. It seems fascinating but very far over my head (at least in this current point in my life).

I somehow started reading about genetic algorithms. Would these have any application here? Maybe you load the processors hardware / software configuration into such a program and have it "evolve" competing architectures, complete with things like "mutation", "adaptation", "inheritance" etc. If nature has shown us anything it is that it is very capable of developing things like the brain from such rules.

### CallMe (WebApp)

---

**Guest at 2010-03-22 04:52:12:**

WebApp

Prelim:
Schedule a call by entering your number, a time, and the number you want to dial. For example, if you want to call the Florist at 9am on Friday, enter the information online, and on Friday you'll receive a call "from" the florist, which will dial the number as soon as you pick up (much like 411).

---

**Guest at 2010-03-22 05:05:27:**

I think this would be incredibly useful. I often add "call x" to my list of things to do, and inevitably I end up putting it off or realizing that normal people don't answer phone calls at 1:00AM, and so things sometimes take longer then they should.

Would something like the link be useful in developing this?
https://developer.skype.com/wiki/Skype4Py

I've never done anything telephony related

---

**Guest at 2010-03-22 05:10:38:**

I agree. The way Google Voice currently works, you can "dial" a number from the voice.google.com portal and it will connect whatever line you specify with the number you dialed. Perhaps there is an API for this.

See http://code.google.com/p/pygooglevoice/ and http://lmgtfy.com/?q=google+voice+api

There must be a way to do this without restricting it to another program or user account, though starting with a few services might be the way to go.

### Cardboard Umbrella

---

**Guest at 2010-03-22 19:15:25:**

...that is biodegradable, disposable, and cheap but doesn't fall apart in the rain. Could be printed cheaply with company logos or given out at "green" events.

---

**Guest at 2010-03-23 01:36:10:**

could be waterproofed by depositing a layer of wax on the side in contact with the rain, similar to a dixie cup. How would it fold (if at all) or would the user simply throw it out after it stops raining?

---

**Guest at 2010-03-23 03:21:47:**

If the cardboard/paper is thin or pliable enough, it will fold itself (like those paper drink umbrellas). No?

### City Drone

---

**Guest at 2010-06-04 06:52:03:**

I think it would be a cool idea to make a robot that either roved around the city at night autonomously (aggregating data or something) or was driven by a user.

The main thing I am interested in is how to get good control over the robot VIA the internet. With my experience so far, I am mostly used to having the robot automatically connect to a wireless network. So far things have worked out pretty well because I've been on college campuses where one giant network usually blankets an area that the robot operates in.

I'd like to develop a system that gets around this for the robot. Basically, as the robot drives through the city it updates it's IP address based on which wifi networks it can access.

How it will access networks:

Walking around an area like Cambridge and looking at the numerous networks, it is easy to see that they all have varying degrees of security. For the spirit of this project i'm going to avoid using the harvard wireless network as much as possible.

Connection logic:

For each wireless connection successfully made (i'll define 'successful' as able to send and receive HTTP), the robot must do the following:

- Forward the relevant ports (namely port 80, maybe 22 for SSH, maybe some other port for a webcam stream) to itself on the router (using UPnP probably). This is not necessary when the connection metric of the wireless interface is 0 (meaning that the robot is connected directly to the internet). This is easy to test for in linux.
- Register the WAN IP of the router with some DNS server so that I can go to a domain and control the thing despite the ever-changing IP address as it drives out of range in one network. The annoying thing is that DNS servers are usually slow (ttl is usually like 60 seconds) which means that there will be delays between each network change that will be as long as it takes to successfully connect, and then contact the DNS server.

Now for the connection logic itself. The key problem being solved here is how to automatically and forcefully connect to a wireless network. We are making assumptions about these networks: That they are sufficiently dense such that some are left unsecured or partially secured and are therefore able to be used by the robot. We are also assuming the network topology is random. This means that every time the robot goes out of range on a network that was working for it, it needs to re-figure everything out to establish a new reliable connection. This means that some kind of decision making priority structure needs to be established (calling that the connection logic). For example, the best case scenario (and therefore the first thing the robot would test for when making a networt hop) would be an unsecured network with high signal strength. The worst case scenario (and lowest on the priority) is that it cannot find anything to use and therefore must reconnect to and remain in the old networks range.

Actions after a network hop is to be made:

- An unsecured wireless network with a decent signal strength exists within the vicinity of the robot. Connect to it, attempt to establish internet connection. Forward the appropriate ports. If two way traffic is accomplished, then update the DNS with the current IP and quit (successful).
- If above fails at any point, try to find a network in range with decent signal strength that is secured with WEP. Attempt to crack this with aircrack. If successfully cracked, again attempt to establish internet connection. Forward the appropriate ports. If two way traffic is accomplished, then update the DNS with the current IP and quit (successful).
- If above fails, reconnect to the old network and notify the user that the hop was unsuccessful

The robot should probably aggregate information in a database as it goes along. Things like network names, types, locations (GPS?) would be useful. Considerations also need to be made for bandwidth usage. We want the UI to be useful but not wasteful. Upstream speeds on most home modems are pitifully low. Last, this may seem like solving a problem that does not exist because you could get around all of this by using 3g. My answer to that is that I don't want to pay for a data plan and have to worry about tethering and whatnot. Besides with 3g you lack anonymity. The ever-changing IP address model ensures that the robot is using other peoples IP address to connect and can't easily be traced back to someone. Besides this whole thing is a very good exercise in automation, linux, and networking protocols.

It is undoubtedly a huge project, but I already have most of the hardware and some of the knowledge and software to do this.

Thoughts?

---

**Guest at 2010-06-04 07:11:30:**

I should also say that if there are duplicates within type in the connection logic, it should prioritize based on signal strength.

So if these networks are in range of the robot:

<pre>
SSID     Protection     Strength
foo      WEP            89%
bar      none           30%
cake     WEP            30%
ass      none           40%
burgers  WEP            50%
feet     none           50%
</pre>

It should try establishing connections in this order:
feet
ass
bar
foo
burgers
cake

Depending on how long it takes to crack WEP I might change this to prioritize based on strength instead of type of protection. Also of worth noting is that anything other than WEP or no protection will be filtered out of the potential network pool (so things like WPA, 802.1x, WPA2, etc) wont show up as well as whatever the old network was. For instance if the above networks were again in range, however the robot had just come off the 'foo' network it would not consider it when making a new connection.

Another thing about the port forwarding. That may end up being a pain in the ass to do correctly. Maybe doing everything through UDP traffic would be better. This would, however, require major changes in the software. Part of the reason I want to do this project is because I already have software written to control the robot over a web browser. HTTP however is a TCP protocol so I would have to rewrite EVERYTHING which would not be cool.

### Explode (C)

---

**Guest at 2010-03-22 04:53:36:**

Computer Program
Language: C

Prelim:

usage: explode [program].c

output: [program]_main.c [prog]_[func1].c [prog]\_[func2.c] ... Makefile

function: explode a C progam file into separate function files

how it works:

- keep track of scope
  - { = scope++
  - } = scope--
  - if scope == 0 && encounters a function header
    - open new file and copy function
  - \#include extern files in [prog]\_main.c
  - write makefile

### Fecal Ink Printer

---

**Guest at 2010-03-22 04:26:56:**

A printer that draws its ink source from fecal matter. I hate paying for Ink because it is really expensive. Oftentimes, it is actually cheaper to buy a whole new printer with ink already in it. This is annoying, and like most I find annoying, it got me thinking of ways to eliminate the problem.

Somehow I got on the train of thought that went something along the lines of "whats cheaper than poop?"

I'm sure there are a million possible criticisms to this idea, but right now I have no reason to think that they could not be overcome.

The health risks are the most obvious. The fecal matter would somehow have to be refined by the printer so that things printed by this machine met some acceptable standards.

The color of the ink and how well the ink adheres to the paper is of concern as well. I was thinking of somehow baking or burning the feces prior to a print job. This would both char the feces to be black as well as kill most bacteria.

Now that i think of it, the problem doesn't really lie in the printer, but the ink.

Any more ideas on how to make feces-derived ink feasible? Would a special printer head need to be designed or could the hypothetical ink be printed with a standard print head?

### First date cheat code

---

**Guest at 2010-05-25 22:20:47:**

1st Date Cheat Code for MEN: Never tell a girl where you're going or how to dress. Instead, tell her to "dress for a first date with a guy she really likes". Now, pick three places you'd like to go: someplace fun and active (bowling, pool, mini golf, go-kart racing, ballgame, etc), something romantic and classy (nice restaurant, upscale lounge, art gallery opening) and something in between (nice bar, coffee shop, comedy club). Now, when you pick her up, let the way she's dressed decide which you're going to do: If she's wearing something sexy and revealing (dress, high heels, low cut top, etc.) than she wants to go somewhere classy and romantic. If she's sporting some jeans, tennis shoes or flip-flops, and a tee, the bowling ally or pool hall may be a good bet. If she's wearing jeans, high heeled boots, and nice top or blouse, than she's not really jonesing for the super romance treatment, and she put in more effort than mini golf deserves (eighteen holes of mini golf in heels... seriously?), so a comedy club or some place with live music is a good choice. And never, EVER, do a movie on the first date! EDIT: Men: You're going to wear a pair of CLEAN, NEAT jeans, a pressed stylish LONG sleeve button down shirt, nice shoes or boots (try to avoid tennis shoes of sneakers). Works for ANY occasion!

### Harvard Dining Club

---

**Guest at 2010-03-22 05:03:13:**

Harvard Dining Club
Social Club / Student Organization

Prelim:

Harvard is only a few minutes from Boston, some of the best restaurants in the nation. What prevents people from attending is not lack of money or time but lack of company. Premise - provide a social dining atmosphere, group events, get ppl together any time.

- Get UC/etc Student Life funding to eat off campus
- Rate restaurants - Privately(?)
- Website with restaurant of the month
- Restaurant Week in Boston

### Home Locator

---

**Guest at 2010-03-23 01:57:20:**

Somehow parse all the houses in google streetview (say buildings in the city of cambridge for example) into some kind of map. Then, use something like the tineye API to search through user submitted queries (AKA pictures from a cellphone or something) and it could spit back an address and/or information about the place. Major problem is that the tineye API isn't free and doesn't let you add images to their index. Maybe could do something homebrew with openCV?

come to think of it i think i just described something pretty close to augmented reality.

---

**Guest at 2010-03-23 03:25:11:**

Or Skynet perhaps.

The difficulty I foresee is that whether from the top or the front, thousands of American houses look almost exactly the same. Combined with a basic address (street or town), we might be able to narrow down the results.

Am I missing the purpose?

---

**Guest at 2010-03-23 22:24:54:**

I don't think you are. The idea is to be able to take a picture of a building on a smartphone and have information on the building appear based on the picture contents and current GPS location.

like say i was in Rome and didn't want to go all mainstream and pay to be in with a tour group. I could be the asshole american walking around taking pictures and reading about buildings on his smartphone.

yeah.........

---

**Guest at 2010-03-24 06:25:05:**

That'd be cool, but if you have a GPS-capable phone and a browser then there's a far simpler way to do this that would actually be pretty sick.

Take a look at Google Maps and the number of Wikipedia articles and tourist photos that have already been overlaid on common destinations (Maps>More>Photos,Wikipedia). What you should really do is use input from the phone's camera and search images tagged on Maps,etc. within a certain radius for matches. Depending on the GPS accuracy, you might not even need to go that far.

Regardless, I agree that we need more Augmented Reality apps. You should heck out Layar, which seems to be the current AR front-runner:

http://layar.com/layar-30-launched-5-cases-to-show-the-power-of-the-platform/

---

**Guest at 2010-04-05 03:34:23:**

Love the home locator idea with a twist. The app should reach out to multiple listing services in the area you are in download the available properties with your specification show you locations and driving directions. For Industrial Site Selectors the app should download available commercial buildings let you drive by and then show you the interior of the structure of the space that is for rent and all the other parameters of the area. Data would be provided by industrial development agencies and commercial real estate brokers

I also would twist this to allow tourists to download an itinerary of things they would like to see. Data would be posted to a tourism website. Something like Tripit but with a focus on what to see not where to stay.

This may be a little plebeian for you but I have not seen it done

### Ice Thickness Robot

---

**Guest at 2010-03-22 04:41:07:**

Every year people and machines fall through the ice on ponds and lakes. The side effects misjudgment of of ice thickness can be anything from hypothermia, loss of an expensive piece of equipment, or even death.

If a robot were made to autonomously monitor and display the thickness of ice on a body of water, it very well could help avoid these kinds of situations.

The robot would have to be able to withstand the elements and traverse the terrain normally encountered on a frozen body of water. It could use GPS data / google maps to navigate the frozen body of water, gauge ice thickness, and report back to some kind of server if the ice is safe or not.

The key to everything is the bots ability to accurately determine the thickness of the ice. This could be done with ultrasound or with a small drill.

The approach I favor most is the drill due to my immediate ease of understanding. Basically the robot would drill a hole in the ice and lower a probe with exposed contacts on the end. If the probe hits water, the circuit completes and the robot records the depth of the probe. If the depth is less than what a human could stand, then the ice is not safe.

---

**Guest at 2010-03-22 05:12:54:**

My immediate concerns would be the cost of replacing a robot like this, should the worst happen and it fall through the ice. Is there any way to do this remotely using radio waves, sonar, etc. (If this sounds foolish, my knowledge of sonic properties is sorely lacking.)

---

**Guest at 2010-03-22 05:41:37:**

This is not at all a foolish concern. Inevitably, as with all design problems, it must be assumed that the end user will do absolutely everything wrong when using your product. The bot falling through the ice would be an expensive mistake indeed.

The best way to fix a problem like this is to prevent it. The way to do this would be to minimize the weight of the robot while maximizing the effective surface area of the drive components in contact with the ground. Something like treads are ideally suited for applications like this. Making the machine float / waterproof is another, more complicated option.

As for your suggestion, I am by no means an expert either, but I do know that ultrasonics are used primarily for seeing changes in density, and therefore edges, in objects. Sonar is like ultrasound, only it is more accurate over long ranges and only works in a single medium.

In short, I don't know what the ideal wave-based solution would be.

### In & Out Board

---

**Guest at 2010-03-22 04:58:44:**

In & Out Board

Prelim:

Small wall-hanging chalk board - Divided down the center with two sections - (in->left and out->right) - 3 Columns in each section - who, what, when - Several rows of blank lines underneath

<pre>
		_____	____________________________	______
		Matt ------ Deathproof & Planet Terror ------  1/22/09
</pre>

Purpose: Keep track of things borrowed (in) and lent (out)

---

**Guest at 2010-03-22 05:50:18:**

I see it took like 13 tries to get this right :) my apologies for the monospace editor. I think html works in here? [edit: no it does not]

Don't things like this already exist? how would this be different?

---

**Guest at 2010-03-22 06:48:38:**

These probably do exist. I was just frustrated by Mandrews's inability to return anything, came up with the idea, and pictured it in the pages of Good Housekeeping. Not necessarily different, but cheap and marketable.

### Porting iPhone Apps to Windows Phone API

---

**Guest at 2010-03-22 05:20:00:**

Windows has already released the development tools for their new Windows Phone launch, though it seems they're going the standard "App" route and will start deficiently short of Apple. Is there a way, with the new iPhone, Google Phone, and Windows Phone platforms, to create a standard mobile language and then port whatever app to each one of these APIs? (vs. developing different apps in each?) A helpful analogy would be creating a universal console game IDE and then compiling for Xbox 360, PS3, etc.

Windows Phone Developer Tools CTP

[http://www.microsoft.com/downloads/details.aspx?FamilyID=2338b5d1-79d8-46af-b828-380b0f854203&displaylang=en](http://www.microsoft.com/downloads/details.aspx?FamilyID=2338b5d1-79d8-46af-b828-380b0f854203&displaylang=en)

Windows Mobile 6.5 SDK

[http://www.microsoft.com/downloads/details.aspx?familyid=20686A1D-97A8-4F80-BC6A-AE010E085A6E&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=20686A1D-97A8-4F80-BC6A-AE010E085A6E&displaylang=en)

### TenReasons (WebApp)

---

**Guest at 2010-03-22 04:56:05:**
Language: Ruby on Rails

Prelim:

10 Reasons / Reasons Why / 10 Reasons Why

"[redefining] soical suggestion"

why [not] to [verb-intrans / verb-trans [obj] [prep-clause]

<pre>
ex: why not to by a rabbit
    why to run in the winter
    why this website is cool (?)
 -> [obj] [verb-clause]
</pre>

background:

social advise, evaluation, commenting, suggestion
look up reasons why to/not to do something
search by topic, to/not to, grammar
add a suggestion to a current page or create your own

### Text to Image (WebApp)

---

**Guest at 2010-03-22 05:04:49:**

Prelim:

Online app to convert user text to an image of specified color and dimension

Example: convert all displayed email addresses to images to prevent spam

INPUT: user-typed / -uploaded (rtf, txt) text
OUTPUT: image (jpg, png, bmp, ...) containing text

PROPERTIES:

- Fixed: Font Size [12] Height [600] Width [800]
- Font Family: ()()()
- Font Color: #000000
- Background Color: #FFFFFF
- Errors: Text Overflow [] ...

---

**Guest at 2010-03-23 01:40:22:**

Didn't you do something similar to this with c++ raytracing?

---

**Guest at 2010-03-23 03:23:00:**

Nope, that was just basic 3D rendering.

### The "Shower" Field Generator

---

**Guest at 2010-03-26 06:35:23:**

I hate taking showers in the morning. I actually hate the whole morning routine in its entirety, but by far the most time consuming thing (and, therefore the 'bottleneck' of me getting out the door) in the morning is the shower.

In my mind, I take showers for one reason only: so I'm not filthy and smell like a pile of garbage, scare off women (though I do that anyway) get sick and die because of my poor hygiene. Some people derive pleasure from their showers, and I'm not saying I don't derive some form of pleasure from covering my body with mildly scalding water as well. What I'm trying to say here is that I would trade the pleasure I get from taking a shower for time savings in the morning. There are 6,692,030,277 people on earth, and I can't be the only person out there who feels this way.

Down to my idea: What does all the hot water and soap encountered in the shower actually do? It kills the 'bad' germs.

Enter what I'd like to call the shower field generator. This would be a device, installed in a bathroom doorway or someplace similar, that a user could strip down, walk through, and receive the same eradication of germs as you would from a normal shower.

If such a device could actually be implemented, it would have many, many applications beyond the just home. Imagine a hospital where nurses do not have to sponge down patients who cant move from their beds. They could just lie there with no clothes on in the hospital bed and make two passes under the field emitter (one face up, the other face down). Imagine being able to contain diseases by using these things as doors, etc. Applications don't even need to be on humans. Put one of these bad boys on a road, and you have an instant carwash.

I don't even have the faintest idea about how one would go about implementing this. I know that for it to be viable, it must preserve the body's naturally occurring germs, which would make targeting the bad germs particularly difficult.

### Universal "Apps" IDE

---

**Guest at 2010-03-22 05:31:14:**

With the rise of Netbooks, migrating more and more processing and storage to "the Cloud," and the popularization of the Adobe AIR and Mozilla Prism platforms that bring web applications to the desktop, we are drifting away from traditional, all-inclusive programs and starting to use smaller and more specialized "apps".

Can we develop a "universal" app IDE with porting to mobile (iPhone/Windows Phone/Google Phone), web, and more traditional (notebook/desktop/netbook) platforms?

Or is the Internet + AIR/Prism already doing that?

See Intel's new AppUp store
http://www.intel.com/Consumer/Products/appup.htm

---

**Guest at 2010-03-22 06:09:39:**

Oh man so hard yes. This is the kind of thing I wish ANSI or IEEE or something thought of before six companies came out with mobile phone OSes.

Side notes:

- I just tried out an Adobe AIR application and it performed like an abortion in the back of a Nascar during the Daytona 500
- Mozilla prism seems like a web browser without navigation controls plus a few basic features. Not at all a bad idea.
- I like how Windows vista is not supported in Appup but XP is

The way I see getting this done, at least for phones, is writing several separate platform specific applications (one for windows phone, android, iphone, webOS, blackberry, etc) that function as an abstraction layer. This, while potentially cantankerous, monstrously inefficient, limited or all of the above, would be designed to provide the would-be application programmer a standard instruction set available across all platforms. One could then do the same thing but on a computer and bingo, the app is running on something other than a phone.

Of course you make a very strong point that the web browser is basically the universal application nowadays, which might render the previous paragraph useless

### UpperClassMan

---

**Guest at 2010-03-22 04:57:49:**

UpperClassMan online magazine

Prelim: Men's Health + GQ + Esquire for Harvard

Logo: 3 colors ("Uppper", "Class", "Man")

- Columns:
  - Viriltas
  - Sons of Harvard
  - Salutations
  - Turning Her Crimson
  - (interview w/ legacy)
  - (all about social groups)
  - (visit to the BL)
- Advertisements:
  - Barbershop Lounge
  - Gold's Gym
  - Classic Tuxedo

### Waste Based Plastic Moulding

---

**Guest at 2010-03-22 04:18:56:**

The idea is to build a machine that melts down the plastic commonly found in trash or other places where large amounts of plastic (mostly cups) are thrown out, and form them into various objects.

The incentive and best application I can think of for this is to produce solo cups and ping pong balls out of the reclaimed plastic. Such a device would cut down on wasted plastic and excess waste at many college campuses across the country and provide fraternities and sororities (or any other similar organization) with 'free' supplies to play that oh-so-popular college drinking game.

### WhatShouldIGet? (WebApp)

---

**Guest at 2010-03-22 04:51:43:**

WebApp

Prelim:

- Input song/movie/artist, query something like musicplasma search engine, IMDB, pandora, etc.
- Have ability to add multiple artists to increase recommendation accuracy

Return ranked set of recommendations with % accuracy / similarity / rating, etc.
