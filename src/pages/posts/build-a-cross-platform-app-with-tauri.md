---
layout: $layouts/Post.astro

tag: blog
title: Build a cross platform app with Tauri
excerpt: 
image: placeholder.png
timestamp: 
---

[Tauri](https://tauri.studio/) proves that building fast, lightweight, and portable desktop applications doesn't have to come at a cost. Developers traditionally reach for tools like [Electron](https://www.electronjs.org/), which powers some of the most popular desktop apps around such as VSCode, Spotify, and Discord. However, newer tools such as [Tauri](https://tauri.studio/) are changing how we think about bringing the Web to our desktops. Tauri is powered by Rust which is a big reason why it's so fast and lightweight. 

In this post, we will be creating a simple file reading app with Svelte and Tauri. I chose Svelte for the frontend here as it's my favourite framework, however you can use whatever web stack you like!

! MAYBE INSERT GIF OF APP HERE

# Prerequisites

If you want to follow along with this post in your IDE you might need to install some tools. It won't take long and you can find [Tauri's official guide](https://tauri.app/v1/guides/getting-started/prerequisites) on their website.

For those of you who haven't written any Rust before, don't be scared. Rust is one of the best programming languages ever made. If you aren't convinced then five minutes of watching [No Boilerplate on YouTube](https://www.youtube.com/c/NoBoilerplate) will make you fall in love. For those yet to learn rust, there are so many [free YouTube tutorials](https://www.youtube.com/results?search_query=learn+rust+). If you want to purchase a course then I recommend the amazing [Rust for JavaScript developers](https://rustforjs.dev/).

# Create our project

Fortunately we don't need to do any work here as `create-tauri-app` will do all the heavy lifting. Open your terminal and run:

```bash
npm create tauri-app
```

Once we have answered a couple questions, open your code editor and run `npm run tauri dev`. The first time this runs Rust will need to compile some dependancies, but don't worry they are cached on subsequent runs.

# Project Structure

Every project will have this core structure, it doesn't include any framework specific files:

```
package.json
src/                    # The frontend app code
src-tauri/              # The backend app code
    tauri.conf.json     # Tauri configuration
    src/                # Our tauri/custom rust code
```

# Tauri Commands/API

Tauri has a system called [commands](https://tauri.app/v1/guides/features/command/) which allow you to call Rust code from the frontend. You can write as many commands as you like and are a superpower when writing any Tauri app. There are also [built in commands](https://tauri.app/v1/api/js/modules/app) for common tasks, these are what we will be using today.

For those of you curious about the shape of a Tauri command lets write an example command that takes in a `name` parameter and returns `Hello <name>!`.

```rs
#[tauri::command] // This macro marks this as a command
fn greet(name: &str) -> String {
    return format!("Hello, {}!", name) // Return a string 
}
```

We can then call this from the frontend:

```ts
import { invoke } from '@tauri-apps/api/tauri';

async function run() {
    const result = await invoke('greet', {
        // Because of how powerful Rust's macros are Tauri can workout that the parameter the greet function has is called name
        name: 'Willow'
    });

    console.log(result); // Hello Willow!
}

run()
```
