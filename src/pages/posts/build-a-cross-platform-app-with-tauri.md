---
layout: $layouts/Post.astro

tag: blog
title: Build a cross platform app with Tauri
excerpt: 
image: placeholder.png
timestamp: 
---

[Tauri](https://tauri.studio/) proves that building fast, lightweight, and portable desktop applications doesn't have to come at a cost. Developers traditionally reach for tools like [Electron](https://www.electronjs.org/), which powers some of the most popular desktop apps around such as VSCode, Spotify, and Discord. However, newer tools such as [Tauri](https://tauri.studio/) are changing how we think about bringing the Web to our desktops. Tauri is powered by Rust which is a big reason why it's so fast and lightweight. 

In this post I will create a simple file reading app with Svelte and Tauri, and explain how Tauri works along the way. I chose Svelte for the frontend here as it's my favourite framework, however you can use whatever web stack you like!

! MAYBE INSERT GIF OF APP HERE

# Prerequisites

If you want to follow along with this post in your IDE you might need to install some tools. It won't take long and you can find [Tauri's official guide](https://tauri.app/v1/guides/getting-started/prerequisites) on their website.

For those of you who haven't written any Rust before, don't be scared. Rust is one of the best programming languages ever made. If you aren't convinced then five minutes of watching [No Boilerplate on YouTube](https://www.youtube.com/c/NoBoilerplate) will make you fall in love. For those yet to learn rust, there are so many [free YouTube tutorials](https://www.youtube.com/results?search_query=learn+rust+). There is also an amazing paid course called [Rust for JavaScript developers](https://rustforjs.dev/).

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
        // Because of how powerful Rust's macros are, Tauri can workout that the parameter our greet command takes is called "name"
        name: 'Willow'
    });

    console.log(result); // Hello Willow!
}

run()
```

# File Reading app

As promised we can now cover our file reading app. Using what we have learned about Tauri we can hit the ground running.

We are going to use the `dialog` and `fs` built-in APIs. The `dialog` api's `open` function is used to prompt the user to select a path, there is a lot of options you can use here to control what the user can select. The `fs` library provides a few options for reading files but we are going to use the `readTextFile` api.

```svelte
<script>
    import { readTextFile } from '@tauri-apps/api/fs';
    import { open } from '@tauri-apps/api/dialog';

    let contents;

    async function openFile() {
        const file = await open({
            multiple: false,
            directory: false,
        });

        contents = await readTextFile(file);
    }
</script>

<button on:click={openFile}> Open File </button>

{#if contents}
    <pre>{contents}</pre>
{/if}
```

The code for this app is [available on GitHub](https://github.com/ghostdevv/tauri-file-reader) if you want to check that out.

# Building

You can build your app as a [Windows Installer](https://tauri.app/v1/guides/building/windows), [MacOS Bundle](https://tauri.app/v1/guides/building/macos), [Debian Package](https://tauri.app/v1/guides/building/debian), or an [App Image](https://tauri.app/v1/guides/distribution/linux#appimage). All the build decisions are managed through your `tauri.conf.json` so you don't have to use an external tool or mess around with cli flags.

Tauri doesn't fully support [cross-platform compliation](https://tauri.app/v1/guides/building/cross-platform) (for example if I were on Linux I could build for windows). The recommended workflow is to use [CI/CD such as GitHub actions](https://tauri.app/v1/guides/building/cross-platform#tauri-github-action).

Building your Tauri app is as simple as `npm run tauri build`!

# Conclusion

Tauri is great for building cross platform applications. It's light weight and comes with all kinds of APIs and features for powering your app, plus it supports using web technology which makes it super easy to use. If you want to get started checkout [the official guides](https://tauri.app/v1/guides/), and for support you can [join the Tauri Discord](https://discord.com/invite/tauri), or [my Discord The Dev Lounge](https://discord.gg/2Vd4wAjJnm).
