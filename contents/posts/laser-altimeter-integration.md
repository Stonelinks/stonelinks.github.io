---
title: Laser Altimeter Integration on Pixhawk
date: 2014-12-11
template: article.jade
tags: airplane, drones
---

As some of you may know, I have left Tokyo and the world of industrial robotics and am now in the midst of immirsing myself in the world of drones in San Francisco. Its a very exciting time in my life! Among other things, I did some research into the different drone platforms out there.

As a sample excercise, I took an in-depth look at how I'd go about integrating a laser altimeter on to the 3DR Pixhawk.

##Step 0: Source a sensor

All signs of googling point to the [SF02/F laser altimeter](http://www.lightware.co.za/shop/en/lrf-modules/7-sf02f.html) as the quickest option to get something working.

<div class="media-container">

<img src="https://pixhawk.org/_media/peripherals/sf02_f_laser_rangefinder_pixhawk_wiring.jpg?w=600&tok=605f64">

</div>

**Specs**:

- **Manufacturer**: A South African company called [lightware](http://www.lightware.co.za/shop/en/)
- **Weight**: 69 g
- **Range**: 0-40 m
- **Resolution**: 1 cm
- **Price and availability**: $300 each, currently on backorder!
- **Update rate**: 12 hz
- **Outputs & interfaces**: Analog, serial and digital
- **Power supply voltage**: 6.5-9.0 V or 5.0 V ± 0.5 V DC
- **Power supply current**: 150 mA (maximum)
- **Dimensions**: 27 x 59 x 86 mm

**Pros**:

- Good [example applications](https://pixhawk.org/platforms/planes/phantom_fpv_flying_wing#px4_fmu_build_log) on UAVs using Pixhawk already out there.
- [Documentation](https://pixhawk.org/peripherals/rangefinder) on how to interface and a [Pixhawk driver](https://github.com/PX4/Firmware/tree/master/src/drivers/sf0x) already exists.
- It is a high quality piece of equipment. This guy gave it [a unbiased, positive review](http://diydrones.com/profiles/blogs/sf02-laser-altimeter-review).
- Manufacturer includes [software](http://www.lightware.co.za/shop/en/content/8-software) that can be used to test the sensor independently from the Pixhawk.
- Good activity and info from the [manufacturer's DIY drones account](http://diydrones.com/profile/LaserDeveloper). Seem to help people with their problems and provide good feedback.

**Cons**:

- The 40 m range is likely too short for any application other than automated landings. 40 m is fine for landings since those obviously occur close to the ground. However if you're using the rangefinder for data acquisition the entire flight, then 40 m is too short. [Supposedly the company is developing another similar sensor](http://diydrones.com/forum/topics/looking-for-new-technology-1?commentId=705844%3AComment%3A1761627&xg_source=activity) with a longer range.
- Expensive! At $300 a pop, equipping a fleet of drones with these will be pricey.
- Looks like the manufacturer is making these only for the hobbyist market. This means that they may make them in bulk, they might not be made to high industrial standards or that there it could be suddenly discontinued if they decide the hobbyist market isn't worth it.

**Alternatives**:

To address some of the SF02's cons (and given that we're equipping a fleet), I looked for an alternate sensor on [Alibaba](http://www.alibaba.com/). If you're not familiar with Alibaba, it is basically a way to buy wholesale electronics / components / sub-assemblies directly from Chinese suppliers. The best option I found for a laser rangefinder module is [this sensor](http://www.alibaba.com/product-detail/rangefinder-module_713054756.html). It is $100 - $300, so potentially a third of the cost per unit compared to the SF02, which is a massive savings. The range is also much better (says 10 - 800 m). Details on power consumption and how to interface with it are not clear, but I'm sure talking with the manufacturer (which is easy on Alibaba) would clear that up. Finally, the stated minimum distance (10 m) and accuracy (1 m vs. the SF02's 1 cm) is pretty bad and won't be useful for landings.

[This sensor is intriguing](http://www.dragoninnovation.com/projects/32-lidar-lite-by-pulsedlight) but not yet available. Good to keep an eye on, especially since [3DR seems to be supporting it](https://store.3drobotics.com/products/lidar-lite/). Far cheaper and smaller but still only a 40 m range.

So while these other sensors may potentially work, for the sake of this analysis I'm going to with the SF02.

##Step 1: Connect to the Pixhawk

The wiring from the SF02 to the Pixhawk goes like this:

<table class="table table-striped table-bordered table-condensed">
  <thead>
    <tr>
      <th>Pixhawk UART pin</th>
      <th>SF02/F pin</th>
      <th>Comment</th>
    </tr>
  </thead>

  <tbody>
    <tr class="row1">
      <td>1 / +5V</td>
      <td>3 / +5V</td>
      <td>Power supply</td>
    </tr>

    <tr class="row2">
      <td>2 / TX</td>
      <td>9 / RX</td>
      <td>3.3V UART SF02/F receive</td>
    </tr>

    <tr class="row3">
      <td>3 / RX</td>
      <td>8 / TX</td>
      <td>3.3V UART SF02/F transmit</td>
    </tr>

    <tr class="row4">
      <td>6 / GND</td>
      <td>2 / -</td>
      <td>Ground</td>
    </tr>
  </tbody>
</table>

Since the SF02 uses screw terminals, depending on how much the aircraft vibrates it may be a good idea to soldier up the leads to the screw terminal. This is the [cable / connector](https://store.3drobotics.com/products/df13-6-position-connector-45-cm) you'd use. Plug the SF02 into TELEM2 of the Pixhawk.

##Step 2: Install on the aircraft

You'll want to put the sensor pointing at the ground obviously, keeping it perpendicular to the aircraft. The sensor should also be mounted in a recessed position so that the optics arn't scratched during a rough landing. Also, it should be positioned such that it doesn't mess with the center of gravity for the aircraft otherwise it will affect glide characteristics.

##Step 3: Software integration

**Drivers**

The [sf0x driver](https://github.com/PX4/Firmware/tree/master/src/drivers/sf0x) needed for the Pixhawk is already part of the firmware. To start the driver:

```bash
sf0x start
```

And to run a test and verify the sensor is working:

```bash
sf0x test
```

Add a file called `etc/extras.txt` to your microSD card with this content to autostart the driver:

```bash
sf0x start
```

**Receiving sensor data in your PX4 application**

PX4 has some great hardware abstraction, so we don't have to directly interact with the driver at all. Instead, we [subscribe to inter-process messages](http://pixhawk.org/dev/px4_simple_app#step_5subscribing_sensor_data) published by the sensor driver. In order to get data from the laser rangefinder, we need to subscribe to the topic that it publishes on. [This](http://pixhawk.org/dev/shared_object_communication) is a good resource on how to do that. Looking at the source for the `sf0x` driver, we need to subscribe to the `sensor_range_finder` topic which comes from [`drivers/drv_range_finder.h`](https://github.com/PX4/Firmware/blob/master/src/drivers/drv_range_finder.h). So in our application we'd subscribe like this:

```c
#include <drivers/drv_range_finder.h>
..
int rangefinder_sub_fd = orb_subscribe(ORB_ID(sensor_range_finder));
```

To actually get data out of the subscriber, we need to use the `poll()` POSIX system call. This approach will sleep the thread (consuming no CPU cycles) until data from the sensor actually gets published. We achieve this like so:

```c
#include <poll.h>
#include <drivers/drv_range_finder.h>
..
int rangefinder_sub_fd = orb_subscribe(ORB_ID(sensor_range_finder));
 
/* one could wait for multiple topics with this technique, just using one here */

struct pollfd fds[] = {
  { .fd = rangefinder_sub_fd,   .events = POLLIN },
};
 
while (true) {

  /* wait for sensor update of 1 file descriptor for 1000 ms (1 second) */

  int poll_ret = poll(fds, 1, 1000);
..
  if (fds[0].revents & POLLIN) {

    /* obtained data for the first file descriptor */

    struct range_finder_report rangefinder_data;

    /* copy rangefinder data into local buffer */

    orb_copy(ORB_ID(sensor_range_finder), rangefinder_sub_fd, &rangefinder_data);
    printf("Rangefinder distance:\t%8.4f\t%8.4f\t%8.4f\n", (double)rangefinder_data.distance[0]);
  }
}
```

##Step 4: use it in your application

The code snippet above isn't a complete application, but you get the idea. Once the range finder data is copied into that `range_finder_report` struct instance, the sky is the limit (pun intended) for what you want to do to it. This is where higher level, application specific things get implemented. Some things I can think of to do with altimeter data:

- Log the data, fly the drone fleet in a lawnmower / zig zag pattern to try to cover a large area, and then use it for 3d reconstruction later. To do this you would also need a decent estimate of aircraft position and orientation.
- Transmit data to a ground station for similar logging purposes. The ground station could be the central data aggregation point for the fleet. If the ground station has an internet connection, it could run a webserver for others to monitor aircraft data in real time from off-site. 
- Implement an automated landing routine. Would need to figure out at what speed / altitude you'd need to flare the aircraft right before touchdown.

Without knowing any more details about the exact application, I think this is where I'll stop.
