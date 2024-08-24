---
tag: blog
title: Home Assistant Green
excerpt: My experience with the latest Home Assistant hardware from Nabu Casa
image: $assets/posts/home-assistant-green/thumbnail.png
postedAt: 1722579812403
attribution: Images of the Home Assistant Green in the thumbnail background, and under the "What is it?" heading belong to Home Assistant.
---

[Home Assistant](https://www.home-assistant.io/) is the most popular open source home automation software. Think Google Home or Apple Homekit but under your control, running in your house, and powered by a worldwide community of developers. It serves as the central hub of your smart home, allowing you to control, monitor, and automate your devices. Coming in strong with nearly 350,000 active installs and just under 3000 official integrations. It can be installed on any system from a spare computer, to a raspberry pi. Home Assistant is governed by the [Open Home Foundation](https://www.openhomefoundation.org/), so it's here to stay. I won't go any more into the specifics of how Home Assistant works and what you can do with it in this post - but [let me know](https://ghostdev.xyz/contact) if that's something you would be interested in.

I've been running Home Assistant on a Raspberry Pi 3 for some time now and it's been working great, however, when I noticed the [Home Assistant Green](https://www.home-assistant.io/green/) last November I had to try it out.

## What is it?

![Home Assistant Green box]($assets/posts/home-assistant-green/green.png)

The Green is the perfect device for non-technical users; it's ready to go out of the box and has everything you need. It's has a small form factor in a translucent plastic housing with a heatsink base. It's powered by a Rockchip RK3566 SoC with a quad-core Arm Cortext-A55 CPU and includes: 32gb of non-upgradable storage, 4gb of memory, 2 USB 2.0 A ports, Gigabit networking, a HDMI port for diagnostics, and a MicroSD slot for backups.

Home Assistant can easily run on hardware you already own, so if you're a more technical user who has time to tinker with your own home lab, Home Assistant Green might not be for you. The Green costs £86 (\~$110) which is high considering a 4gb Raspberry Pi 4 with and a memory card costs around £60 (\~$76). That's without considering the long list of powerful (and cheaper) [Raspberry Pi alternatives](https://www.youtube.com/watch?v=uJvCVw1yONQ). Regardless of what option you chose, you'll also likely need a Zigbee & Thread/Matter radio, which if you choose the [Home Assistant Connect ZBT-1](https://www.home-assistant.io/connectzbt1) (formerly SkyConnect) costs £31 (~$40). That brings the total for your smart home hub to around £91 - 117 (\~$115 - 149).

Despite it's price point, I think the Green is incredible and its value is in its simplicity. It's beautifully designed, with a good unboxing experience, and is powered by the best home automation software ootb. It's super important that alternatives to navigating the nightmare that is cloud based IoT is easy to access for the average consumer. Devices like the Green are lowering the barrier to entry for non-technical users. While I am confident that they could get it running on a Pi, they shouldn't need to, especially considering that using a proprietary cloud-based alternative is "free".

## Home Assistant Yellow

It's worth mentioning the predecesor of the Green: The Yellow (I'm sensing a theme here...). The Yellow was released in 2021 and is still available. Historically, the primary drawback to the Yellow has been it's reliance on the [PI Compute Module 4](https://www.raspberrypi.com/products/compute-module-4/?variant=raspberry-pi-cm4001000) which have been super hard to get [until recently](https://www.pcworld.com/article/1939160/at-last-the-raspberry-pi-shortage-is-finally-coming-to-an-end.html). This increased the barrier to entry significantly, by requiring you to source a CM4 and install it. There are still some benefits if you would like an integrated Zigbee radio, power over ethernet, or expandable storage (via an m.2 slot). I'd only recommend this device if you want to support Nabu Casa and Home Assistant, but at that point you might as well just [support them directly](https://www.openhomefoundation.org/organization/#support-our-work).

## Unboxing & Setup

It comes in a well designed box with all the peripherals that you would need to get it running: an ethernet cable, a universal power supply, a sticker, a manual you're not going to read, and legal crap.

![Home Assistant Green box]($assets/posts/home-assistant-green/green-box.png)
![Home Assistant Green]($assets/posts/home-assistant-green/green-top-down.png)

The Green fits in super nicely with my home lab:

![homelab]($assets/posts/home-assistant-green/homelab.png)

I also ordered the [Connect ZBT-1](https://www.home-assistant.io/connectzbt1/) which came with a usb extension cable to help mitigate [USB 3.x interference](https://www.home-assistant.io/integrations/zha#zigbee-interference-avoidance-and-network-rangecoverage-optimization) with the Zigbee radio.

![Connect ZBT-1 box]($assets/posts/home-assistant-green/skyconnect.png)

The setup was simple - once you see a yellow led blinking on the Green you can navigate to `http://homeassistant.local:8123` and follow the graphical setup wizard. It was able to detect all devices on my network pretty well, including the zigbee/thread radio provided by the Connect ZBT-1. There is a super detailed setup guide [available here](https://green.home-assistant.io/) if you're interested in a deep dive.

![home assistant setup]($assets/posts/home-assistant-green/hassio-setup.png)
