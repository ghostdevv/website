---
tag: blog
title: Linux Setup
excerpt: todo
image: $assets/posts/placeholder.png
postedAt: 1787071336268
atUri: 'at://todo'
---

> todo: mimeapps, dconf, systemd user, utils, shell, further reading, screenshots

Ricing linux can be a complex topic, there's so much you can fiddle with to get things just how you like them. When it becomes harder in other ways is when you leave the major desktop environments for a window manager like Niri or Hyprland. Suddenly you realise all the parts that make a desktop environment what it is, from the little bits of software that to the full suite of apps. When you build your own experience on top of this.

There are projects that aim to help with this, the controversially owned but otherwise probably fine (I haven't tried it) project [Omarchy](https://omarchy.org/) comes to mind. You might otherwise here these referred to as "dotfiles", or to put it simply someone elses configuriation. Often people's dotfiles are just that, theirs - but sometimes people intentionally make them usable by others.

You've probably heard the term "shell" thrown around. The shell provides the foundation of the user experience beyond what the window manager does. It often provides visual elements like a panel, lock screen, notifications, prompts, etc. You can compose these parts yourself, but there are also projects like [Dank Material Shell](https://danklinux.com) which aim to provide the whole experience.

Pulling everything together yourself can feel quite overwhelming, there's so much software out there and it's hard to find it all let alone pick it. Most of my system was what I found about a year ago, so there might be better choies even besides ones that just fit your vibe different. My strongest recommendation is to start with Niri or Hyprland and then ask yourself, "how do I do this" or "what functionality am I missing". My first week on Niri after GNOME was a lot of, "oh yeah I forgot about that" followed by some intense searching for how to solve my problem in a way that felt right.

I hope this should be a good jumping off point in terms of what software you might want or need, and how I configured it. My dotfiles are more expansive than this, and you can [poke around at them on GH](https://github.com/ghostdevv/dotfiles).

## Managing Dotfiles

My system for managing them is old, and consists of some shell scripts I wrote that basically download the files from GitHub into the correct places. I have two main commands I use: `update-dotfiles`, and `update-system`.

### `update-dotfiles`

This has a long list of the actual files in the repo that I manually maintain - at some point I should probably generate this. There was some attempt at making it more intelligent, when I breifly borrowed a friends mac to try it I needed to only install some stuff on linux and some on mac, but that's since become tech debt I don't even use. It does do a check to see if it actually needs to download by keeping the latest git hash in a file, as well as checks if a file has changed on disk since I last pulled as there is a lot of dotfiles in here that are edited by apps such as Zed.

> [!TIP]
> Use [Chezmoi](https://www.chezmoi.io/), I'll refactor to use this at some point

### `update-system`

This does everything else, it enables systemd services, does a bunch of dconf stuff for apps that use gtk, installs flatpaks and arch packages from a list, adds me to groups, and basically all the little commands you might need to run to fix random issues you've ran into over the years but would never remember to do after you reinstall.

I use Arch btw, so I install packages with `pacman`/`yay` as well as `flatpak`. When I reinstall my system I'd never remember what packages I need, and so I have a list of both in my dotfiles repo and `update-system` installs them. I also have a `pkg-diff` command that tells me which packages I haven't added to that list so that I can add them. Every now and then I'll also make sure to go through the list and remove things I don't need, especially things that are in the AUR.

## Niri Setup

I use [Niri](https://niri-wm.github.io/niri/) for my window manager, it's a scrollable tiling wm which means that windows are primarily tiled (not floating around the place) and it's scrollable meaning that you have an infinite x axis of windows that you can scroll back and forth.

Since Niri isn't a desktop environment as previouslly discussed I have to bring my own software. I also didn't opt to use a full shell, instead making my own but even then it's really just the panel.

### Launcher

I use [ULauncher](https://github.com/Ulauncher/Ulauncher)'s v6 branch which is in beta iirc. It allows me mainly to open apps, but it also supports plugins which allows me to do stuff like grab emojis, control home assistant, manage my laptops fan speed (great to bump up the speed when I'm using it on my lap as it's not fun having a hot laptop).

I've used ulauncher for a long time, and I have a lot of love for it. However, it's much more limiting than something like Raycast on macos in terms of what you can do and display. You can update the render for example without a keystroke, so I have it display the fan speed but it doesn't update.

```kdl
window-rule {
    match app-id="Ulauncher"
    match title="Ulauncher - Application Launcher"
    open-floating true
    default-floating-position x=0 y=200 relative-to="top"

    shadow {
        on
    }
}

binds {
	Mod+Space repeat=false hotkey-overlay-title="Toggle ulauncher" { spawn "ulauncher-toggle"; }
}
```

I use these plugins currently (some of which I wrote):

- [Home Assistant](https://github.com/qcasey/ulauncher-homeassistant)
- [Emoji Picker](https://github.com/Ulauncher/ulauncher-emoji)
- [Tailscale Toggle & Node IPs](https://github.com/ghostdevv/ulauncher-tailscale)
- [Framework Fan Control](https://github.com/ghostdevv/ulauncher-fw-fanctrl)
- [Llama Swap model starter](https://github.com/ghostdevv/ulauncher-llama-swap)

I also wrote a [Deno Script Runner plugin](https://github.com/ghostdevv/ulauncher-deno-scripts) plugin but never finished it, and probably won't currently

### Terminal

I use [ghostty](https://ghostty.org) for this and have some basic niri configs to configure it how I like

```kdl
// Prevent focus ring backdrop on ghostty
// this makes it so that the transparency is
// usable when window is focused
window-rule {
    match app-id="com.mitchellh.ghostty"
    draw-border-with-background false
}

binds {
	Mod+T repeat=false hotkey-overlay-title="Open terminal" { spawn "ghostty" "+new-window"; }
}
```

### File Manager

I use Nautilus which is GNOME's file manager, and I just bound `Super+F` to open it.

```kdl
binds {
	Mod+F repeat=false hotkey-overlay-title="Open file manager" { spawn "nautilus"; }
}
```

### Dropdown Terminal

I use [`guake`](https://github.com/Guake/guake) which is left over from my GNOME days as it's really designed to fit in there. It works well as a terminal, however it's not really intended to work outside of GNOME so the visuals are broken. For a long time it's had a back background when it should be transparent, and recently it's decided to be blue. I'd love to use ghosttys quick terminal which is the same concept, but they require the global shortcuts portal which doesn't work on Niri. It's a source of constant frustration and one of these days I'll get around to patch ghostty to allow me to toggle it with a command, which will make it easy to call a keyboard shortcut.

```kdl
window-rule {
    match app-id="Guake"
    open-floating true
    open-maximized false
    open-focused true
    default-floating-position x=0 y=0 relative-to="top"
}

binds {
	Alt+Return repeat=false hotkey-overlay-title="Toggle guake" { spawn "guake-toggle"; }
}
```

### Wallpaper

For this I use [`swaybg`](https://github.com/swaywm/swaybg) as it's the most minial option I found, I didn't want anything like changing backgrounds manually/automatically.

```kdl
// Spawn the background image at startup
spawn-sh-at-startup "swaybg --image ~/Pictures/wallpaper.png"
```

### Greeter

todo

### Lock Screen

I use a combo of [`swayidle`](https://github.com/swaywm/swayidle) and [`hyprlock`](https://github.com/hyprwm/hyprlock/). Hyprland does have their own idle program, I think I just used swayidle as I already had it installed before trying hyprlock. The general idea is that hyprlock can be invoked with both a keyboard shortcut, as well as automatically when I'm not using the device (idle). Both of these can be configured in your niri config

> [!NOTE]
> There's weirdness with double locking as well as sometime it just not working, but 9/10 times it works fine.

```kdl
// Spawn idle handler
spawn-at-startup "swayidle" "-w" "timeout" "601" "pidof hyprlock || hyprlock" "timeout" "600" "niri msg action power-off-monitors" "resume" "niri msg action power-on-monitors" "before-sleep" "hyprlock"

binds {
	Mod+Escape hotkey-overlay-title="Lock" { spawn "hyprlock"; }
}
```

### Notifications

The notification daemon listens for notifications that sent by apps or tools like `notify-send` and then displays them to you. I use [`mako`](https://github.com/emersion/mako) which is also a really simple program that doesn't do any of the advanced features of notifications like images or actions.

```kdl
spawn-at-startup "mako"
```

### Clipboard Manager

I don't use ulauncher for this as it's too limiting, and a lot of the other options I found at the time were too complex for me or required weird GUIs. I use Clipse which listens in the background by starting it at startup

```kdl
spawn-sh-at-startup "clipse -listen"
```

I also have a keybind and window rule that spawns my terminal ghostty floating in the middle of the screen to act as my keyboard gui.

```kdl
window-rule {
    match app-id="com.mitchellh.ghostty" title="clipse-popup"

    open-floating true
    baba-is-float true

    open-fullscreen false
    open-focused true

    block-out-from "screencast"

    shadow {
        on
    }
}

binds {
	Mod+V repeat=false hotkey-overlay-title="Open clipse" { spawn "ghostty" "--title=clipse-popup" "--background-opacity=0.85" "--window-width=12" "-e" "clipse"; }
}
```

### On Screen Display

This is for popups like changing your volume, etc. I use [`swayosd`](https://github.com/ErikReider/SwayOSD) as it's simple and uses gtk styles which fits in with most of the apps I use.

```kdl
spawn-at-startup "swayosd-server"

binds {
	// Volume Controls
	XF86AudioRaiseVolume allow-when-locked=true { spawn "swayosd-client" "--output-volume=raise"; }
	XF86AudioLowerVolume allow-when-locked=true { spawn "swayosd-client" "--output-volume=lower"; }
	XF86AudioMute allow-when-locked=true { spawn "swayosd-client" "--output-volume=mute-toggle"; }
	XF86AudioMicMute allow-when-locked=true { spawn "swayosd-client" "--input-volume=mute-toggle"; }

	// Media ControlsXF86Tools
	XF86AudioPlay allow-when-locked=true { spawn "swayosd-client" "--playerctl=play-pause"; }
	XF86AudioNext allow-when-locked=true { spawn "swayosd-client" "--playerctl=next"; }
	XF86AudioPrev allow-when-locked=true { spawn "swayosd-client" "--playerctl=previous"; }

	// Brightness Controls
	XF86MonBrightnessUp allow-when-locked=true { spawn "swayosd-client" "--brightness=+5"; }
	XF86MonBrightnessDown allow-when-locked=true { spawn "swayosd-client" "--brightness=-5"; }
}
```

### Polkit Agent

Polkit allows for a more specific privilage escalation for processes than something like sudo. You've likely seen a polkit agent when there's a popup asking you to put your password in and approve access because a process needs to do something privillaged.

I picked the simplest one I found at the time that also was more visually consistent, and that was [the one from Elementary OS](https://github.com/elementary/pantheon-agent-polkit). The styling has since broken for me but I don't feel like fixing it, and it's still functional.

```kdl
// Polkit agent
spawn-sh-at-startup "GTK_THEME=io.elementary.stylesheet.blueberry:dark /usr/lib/policykit-1-pantheon/io.elementary.desktop.agent-polkit"
```

### Quick Notes

I've recently been using a program called [Whisp](https://flathub.org/en/apps/io.github.tanaybhomia.Whisp) to get a quick notes window which has been handy, and I configured it to float how I want in niri like so:

```kdl
// Whisp (notes window)
window-rule {
    match app-id="io.github.tanaybhomia.Whisp"
    open-floating true
    default-window-height { fixed 400; }
    default-column-width { fixed 400; }
}

binds {
	Mod+N repeat=false hotkey-overlay-title="Open Whisp" { spawn "gtk-launch" "io.github.tanaybhomia.Whisp"; }
}
```

### Cursor

To minimise cursor weirdness between apps, which can happen when apps aren't wayland native or sometimes differently between gtk and qt (don't quote me on that), I have the following settings:

```kdl
// qt/kde apps settings
spawn-sh-at-startup "systemctl --user set-environment QT_QPA_PLATFORM=\"wayland;xcb\" QT_QPA_PLATFORMTHEME=\"qt6ct\""

spawn-sh-at-startup "xrdb -merge ~/.Xresources"

cursor {
    xcursor-theme "Breeze_Light"
}
```

I created the `~/.XResources` file which has:

```ini
Xcursor.theme: Breeze_Light
```
