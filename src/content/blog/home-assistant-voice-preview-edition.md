---
tag: blog
title: Home Assistant Voice Preview Edition
excerpt: todo
image: $assets/posts/placeholder.png
postedAt: 1740442848354
---

todo mention year of voice

I've not got around to setting up voice for my Home Assistant yet. However, recently Nabu Casa announce the Home Assistant Voice Preview Edition which is a hardware device of the likes of Alexa/Google Home/etc. I had to pick one up, at the least just to support the Home Assistant project, and it gives me a good excuse to set voice up.

## Unboxing

As always the unboxing experience was superb. The Voice PE comes in a consistently styled small cardboard box, with the Home Assistant Voice mark embossed on top.

![]($assets/posts/home-assistant-voice-preview-edition/box-top.jpg)

On the underside the box comes with a drawing of the device, a list of the contents, and what you'll need to get started.

![]($assets/posts/home-assistant-voice-preview-edition/box-bottom.jpg)

Inside the box you'll find your new Voice PE, as well as a cute voice themed Home Assistant sticker, a Get Started card, and warranty information.

![]($assets/posts/home-assistant-voice-preview-edition/contents.jpg)

## Device

The Voice PE is a small square box with a white top surface featuring a ring light, volume control disk, and button. The rest of the Voice PE is a frosted white. There is a mute switch on the right side of the device, with the power input and audio jack on the back.

![]($assets/posts/home-assistant-voice-preview-edition/device-side-view.jpg)
![]($assets/posts/home-assistant-voice-preview-edition/device-back-view.jpg)

## Setup

The Voice PE does not come with a cable, so you'll have to buy that seperately. I went with a Raspberry Pi 5 power supply. Once you've plugged that in, the Voice PE's light ring will start twinkling.

![]($assets/posts/home-assistant-voice-preview-edition/device-on-power-supply.jpg)

Next open the Home Assistant app on your phone, and navigate to Settings > Device & Services and the Voice PE appears as an integration. The setup is initially done over bluetooth, then you pair the Voice PE to your WiFi network. The voice will prompt you to authorise the connection by pressing the button on the center of the device. Once it's connected the led ring will turn blue, and you'll be prompted to add the device via ESP Home. The guided setup has a cute little home assistant guy floating around there too. You have three choices of wake words: Ok Nabu (the default), Hey Jarvis, and Hey Mycroft.

## Voice Processing

Voice processing is not done on the Voice PE, but via your Home Assistant server. Nabu Cassa has a cloud offering for this, or you can do it locally. The local experience will be slower if you don't have powerful hardware. You can easily connect your own server running [Wyoming Protocol](https://www.home-assistant.io/integrations/wyoming) if you want to self-host your voice, but on a different machine to the one Home Assistant is running on.

When you select the local option, Home Assistant will install the Whisper and Piper add-ons in order to enable the voice processing. Both of which worked out of the box for me. On my Home Assistant Green it was taking around 2.5 - 3 seconds to generate a response. However, it definitely struggled with my english accent on these low settings, and I had to speak very clearly.

todo You can also apparently configure wake words: https://github.com/dscripka/openwakeword

### Home Assistant Cloud

I signed up for a Home Assistant Cloud free trial to see what the speeds are like. It brings responses up to a snappy ~1 second. It was super easy to setup and was largely automated, I just had to go into my Voice PE settings and select the new Home Assistant Cloud assistant that was created.

## Voice Config

Home Assistant allows you to configure multiple different "Assistants". Each Assistant has it's own config associated with it, which boils down to it's language and text to speech settings. The Voice PE setup will automatically create one for you using either your local whisper and piper settings, or your cloud settings.

todo more on this

## LLMs

## Control

The Voice PE provides a variety of options (exposed as entities) you can interact with. This being Home Assistant everything is neatly reactive and the data is all there to play with.

I can also use it as a speaker from Home Assistant. todo this + automations + speaker thing + maybe spotify connect
