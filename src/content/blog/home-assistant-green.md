---
tag: blog
title: Home Assistant Green
excerpt: TODO
image: $assets/posts/placeholder.png
timestamp: 1720323553276
---

I've been happily running and experimenting with [Home Assistant](https://www.home-assistant.io/) on a spare raspberry pi 3 for some time but when I noticed the [Home Assistant Green](https://www.home-assistant.io/green/) last November I had to try it out. I've been running it non-stop for over six months now and had a great experience.

## What is Home Assistant?

Home Assistant is the most popular open source home automation software. Think Google Home or Apple Homekit but under your control, running in your house, and powered by a massive community of devs. It serves as the central hub of your smart home allowing you to control your devices, monitor, and automate them. Coming in strong with nearly 350,000 active installs and has just under 3000 official integrations. It can be installed on any system from a spare computer in your house, to a raspberry pi. Nabu Casa, the company created by the founders of Home Assistant, also have been making their own hardware which is what this post is about.

I won't go any more into the specifics of Home Assistant works and what you can do with it in this post - but [let me know](https://ghostdev.xyz/contact) if that's something you would be interested in.

## Why go Green?

<!-- ![Home Assitant Green box]($assets/posts/home-assistant-green/green.png) -->

The Green is the latest device from Nabu Casa powered by a Rockchip RK3566 SoC with a quad-core Arm Cortext-A55 CPU. It includes a non-upgradable 32gb of storage and 4gb of memory with 2 USB 2.0 A ports, Gigabit networking, a HDMI port for diagnostics, and a MicroSD slot for backups.

It's priced at £86 (\~$110) which is a hard price point for some considering a 4gb Raspberry PI 4 with and a memory card is around £60 (\~$83). That's without considering the long list of powerful [Raspberry PI alternatives](https://www.youtube.com/watch?v=uJvCVw1yONQ). However, for others it's very reasonable; it's target market seems to be those who want Home Assistant ready to go out of the box which it does perfectly. You'll also likely need a Zigbee & Thread/Matter radio which if you chose the Home Assistant [SkyConnect](https://thepihut.com/products/home-assistant-skyconnect) costs £31 (~$40).

It's important that alternatives to navigating the nightmare that cloud based IoT brings the average consumer are available. Devices like the Green are lowering barrier to entry for non-technical users. While I am confident that they could get it running on a PI they shouldn't need to, especially considering that using a proprietary cloud-based alternative is "free".

### Home Assistant Yellow

The Green isn't the first hardware device that title goes to the Blue which has since been since discontinued. The more notable Yellow was released in 2021 and is still available. Historically the primary drawback to the Yellow has been it's reliance on the [compute module 4](https://www.raspberrypi.com/products/compute-module-4/?variant=raspberry-pi-cm4001000) which have been hard to get until recently. This increased the barrier to entry significantly, by both requiring you to source a cm4 and install it. There are still some benefits if you would like an integrated Zigbee radio, power over ethernet, or expandable storage (via an m.2 slot).

## Unboxing 

It had a super nice unboxing experience and came with the Green, an ethernet cable, a universal power supply, a sticker, a manual you're not going to read, and legal crap. The Green is a super well built box in a frosted case with a solid metal heatsink on it's bottom.

![Home Assistant Green box]($assets/posts/home-assistant-green/green-box.png)
![Home Assistant Green]($assets/posts/home-assistant-green/green-top-down.png)

The Green fits in super nicely with my home lab:

![homelab]($assets/posts/home-assistant-green/homelab.png)

I also ordered the SkyConnect which came with a usb extension cable to help mitigate [USB 3.x interference](https://www.home-assistant.io/integrations/zha#zigbee-interference-avoidance-and-network-rangecoverage-optimization) with the Zigbee radio.

![SkyConnect box]($assets/posts/home-assistant-green/skyconnect.png)

## Setup

The setup, as expected, was super easy. I plugged it in and after waiting I can navigate to `http://homeassistant.local:8123` to be greeted by the familiar Home Assistant setup page. It's loaded with Home Assistant OS which is their recommended install and can also be installed on your own hardware. There is a [simple step-by-step guide](https://green.home-assistant.io/) available online for setup.

![home assistant setup]($assets/posts/home-assistant-green/hassio-setup.png)


