---
tag: blog
title: Cloud Development Environments... but why?!
excerpt: What is a Cloud Development Environment (CDE) and why would I ever need one?
image: $assets/posts/cloud-development-environments-but-why.png
timestamp: 1696875978128
---

You might have come across a significant amount of news in recent years regarding Cloud Development Environments (CDE). Nevertheless, CDE's are still an under-utilised tool, with many misunderstanding or underestimating their value. Resisting change is part of human nature; it can be intimidating - and in our industry - often involves financial costs. Plus, if you already have a powerful computer, why would you ever need a CDE?

I've grown quite passionate about this topic since joining the [Gitpod Community](https://www.gitpod.io/community) Team. While I was a skeptic myself, the enthusiasts in the CDE communities have helped me learn to appreciate the incredible workflows made possible by these environments. In this post, I'll try to address common concerns, and explore a comprehensive list of CDEs that I believe are worth trying out yourself.

## What is a Cloud Development Environment?

A Cloud Development Environment (CDE) is a readily-available development environment that comes pre-configured with all the necessary tools, libraries, and dependencies required to write or review code. The ideal CDE is a reproducable environment, with direct access to the underlying machine, enabling you to use all the tools and software you love.

Most CDEs today will default to a fully-featured VSCode both in the browser, and natively on desktop. Some will even let you use other editors (like the IntelliJ suite), or a stand-alone [browser based terminal](https://www.gitpod.io/docs/references/ides-and-editors/browser-terminal). All of this backed by the flexibility, speed, and resilience of a private self-hosted or public cloud environment.

CDEs are growing in popularity as more companies realise their potential. Google even recently announced [IDX](https://idx.dev/), their take on the CDE which looks awesome (and hopefully doesn't end up in the [Google Graveyard](https://killedbygoogle.com/)).

## What am I missing out on?

### Code from anywhere

I probably sound like a broken record when I say that moving complex projects from device to device is a pain. If you're like me, with separate laptop and desktop workstations, then you may know how tedious it can become to keep things like environment variables, configurations, dependencies, and tooling in sync across various projects.

CDEs solve this problem by design. Their on-demand, ephemeral nature means that whenever you are ready to code, a fresh environment spins up. Your preconfigured environment variables, dependencies, and anything else you might need is ready to go. The strong git integrations allow you to jump straight in on any device, from any machine, at any time. Forget your laptop and need to borrow a friends? No problem.

### "Works on my machine"

We are all familiar with the phrase "works on my machine"; it's typically the last sentence we want to hear after enduring the pain of a wasted weekend. This is another problem easily solved by a CDE, everyone who works on your repository gets the same configuration, which means the same environment. An added benefit of this is that it dramatically speeds up on boarding times for new devs, as they don't need to worry about installing software. It's already there.

A good example of this is native development; setting up all the dependencies for running and building an android app can be a nightmare on new devices. Depending on the operating system, CPU architecture, and even Linux distribution, the requirements can vary radically. The process relys heavily on great docs, which - let's face it - are essentially non-existent among complex projects. Alas, the CDE saves the day again! You'll get the same environment as everyone else when you spin up your CDE at the click of a button - and it _just works™️_.

### Moving Quickly

I do a lot of work in open source, which means I do a _lot_ of code review. Being able to just press a button to open the pull request or issue reproduction in a CDE makes my life so much easier. I no longer have to switch branches or install some random repositories on my computer _(and remember to delete them)_. When I'm done reviewing the changes, I can just close the tab/window and forget about it.

Additionally, being able to spin up an empty environment to quickly test something out is amazing. I'm constantly hitting [gitpod.new](https://gitpod.new) whenever I need to write a script or test out the new JavaScript framework of the week. As soon as I'm done, I can close the tab and move on with my day, or push it to a new git repo if I want revisit it later.

### Security

Security is a interesting point when it comes to CDEs. Whilst it doesn't solve every problem, it can eliminate a few nasty ones. The most obvious advantage comes from the fact that none of the code in a CDE runs on your machine; all processes are contained within a sandboxed, ephemeral cloud environment. If a bad actor manages to excecute malicious code, they have access to significantly less data than they would if I had ran their sowftware locally.

Most companies that create a CDE will have a dedicated security team that not only provides trust, but manages the complex landscape of certifications and complience.

### Saving money

There are plenty of advantages I haven't mentioned yet - a big one being cost-savings for businesses. There are few things businesses love more than saving money. For most of the reasons outlined above, local development environments can waste a lot of time. That time translates to thousands of dollars in development time for a company, and lots of unnecessary stress for developers who often prefer to focus on the code rather than the environment. [A recent survey](https://www.linkedin.com/posts/johanneslandgraf_development-environments-are-broken-the-activity-7079816892957216769-bkyu/) from the CEO of Gitpod found that the average developer spends ~ 2.2 hours per week troubleshooting local development environments, which is a direct loss of developer time for a business.

## Ok, what are my options?

The list of companies making CDEs is still growing, making it increasingly difficult to chose the best one for your use-case. The main concern most people have with CDE's is the dreaded _vendor lock-in_. In this context, it usually boils down to feature parity and the setup of your environment. Most CDEs I have used utilise Docker or Nix under the hood, so if you have an understanding of these tools you should have no problem hacking around any limitations.

Here's a high-level overview of some CDE's I've tried, along with some of the more important features I look for when evaluating them:

| CDE                                                                         | IDEs                                                                                | Git Providers             | Open Source | Self Hostable | SaaS    |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------- | ----------- | ------------- | ------- |
| [Gitpod](https://www.gitpod.io/)                                            | VSCode, Jetbrains Suite, Terminal                                                   | GitHub, GitLab, BitBucket | ✅          | ❌ [^1]       | ✅      |
| [GitHub Codespaces](https://github.com/features/codespaces)                 | VSCode, Jetbrains Suite, JupyterLab                                                 | GitHub                    | ❌          | ❌            | ✅      |
| [Coder](https://coder.com/)                                                 | VSCode, Jetbrains Suite, Jupyter, [and more](https://coder.com/docs/v2/latest/ides) | Not tied to git           | ✅          | ✅            | ❌      |
| [Jetpack Devbox](https://www.jetpack.io/devbox)                             | VSCode                                                                              | GitHub                    | ✅          | ✅            | ❓ [^4] |
| [Replit](https://replit.com/)                                               | Custom in-browser or mobile app editor                                              | GitHub                    | ❌          | ❌            | ✅      |
| [IDX](https://idx.dev/)                                                     | VScode                                                                              | GitHub [^2]               | ❌          | ❌            | ❓ [^3] |
| [CodeSandbox](https://codesandbox.io/cloud-development-environments)        | Custom in-browser, VSCode                                                           | GitHub                    | ❌          | ❌            | ✅      |
| [Hocus](https://hocus.dev/)                                                 | VSCode                                                                              | GitHub, GitLab, BitBucket | ✅          | ✅            | ❌      |
| [Daytona](https://daytona.io/)                                              | VSCode, Jetbrains Suite, Terminal, Web IDE, VIM                                     | GitHub, GitLab, BitBucket | ❌          | ✅            | ❌      |
| [DevZero](https://devzero.io/)                                              | VSCode                                                                              | GitHub, GitLab, BitBucket | ❌          | ❌ [^5]       | ✅      |
| [Codeanywhere](https://codeanywhere.com/)                                   | Custom in browser editor                                                            | GitHub, GitLab, BitBucket | ❌          | ❌            | ✅      |
| [Cloudomation DevStack](https://cloudomation.com/en/cloudomation-devstack/) | VSCode, Jetbrains Suite, Eclipse, Web IDE                                           | Not tied to git           | ❌          | ✅ [^6]       | ✅      |

[^1]: Gitpod provides [no _official_ way to self host](https://www.gitpod.io/blog/introducing-gitpod-dedicated#ending-support-for-self-hosted-and-moving-our-source-code-to-the-open-source-agpl-licence), but it's still possible using some Community guides. Enterprise customers can run in their own cloud account with [Gitpod Dedicated](https://www.gitpod.io/dedicated).
[^2]: I could only find a mention of GitHub and I'm still on the waitlist.
[^3]: It's safe to assume it will be a SaaS but I couldn't find any pricing information.
[^4]: Cloud version is free whilst in beta.
[^5]: Enterprise customers can run in their own cloud account.
[^6]: Can be self-hosted but requires a [license purchase](https://cloudomation.com/en/cloudomation-devstack/devstack-pricing/)

This table is accurate as of October 2023, please [let me know](/contact) if there are mistakes or any CDEs missing.

### My picks

Unfortunately, not every CDE provider is suitable for every use case. Every developer's requirements are different, so I'll take a few of my favourite CDEs and explore their ideal use cases so that you can determine which might be best for you. No more excuses!

#### Gitpod & GitHub Codespaces

If you're looking for a CDE that's polished, easy to use, hosted, and popular you can't go wrong with [Gitpod](https://www.gitpod.io/) or [GitHub Codespaces](https://github.com/features/codespaces). It mostly comes down to personal opinion here, since both have the same core features that make CDEs excellent, alongside great documentation and many tutorials. They both have some great options when it comes to managing workspaces, configurations, personalisation, prebuilds, and more. While I did find that the Gitpod config [`.gitpod.yml`](https://www.gitpod.io/docs/references/gitpod-yml#gitpodyml) is more beginner friendly, the [`devcontainer.json`](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers#devcontainerjson) used by Codespaces is [more portable](https://containers.dev/) between CDEs. However for some, Gitpod is the obvious choice as it supports more git providers, has a growing [Discord Community](https://gitpod.io/chat), and is [Open Source](https://github.com/gitpod-io/gitpod). I would encourage you to take advantage of any discounts you can, like the [Gitpod Open Source program](https://www.gitpod.io/discover/opensource) or [GitHub Student Developer Pack](https://education.github.com/pack) depending on which CDE you go with.

#### Coder & Jetpack Devbox

If you're looking for an experience similar to Gitpod, but you need to self host, then give [Coder](https://coder.com/) a try. I successfully got Coder running with their local Docker platform in less than five minutes. Unfortunately, if you want to unlock the full power of Coder, you'll need to have some experience with installing/managing Kubernetes and writing Terraform. On the other hand, for those just using Coder for their own work, the Docker integration works just fine. Coder adpots less of the CDE lifecycle I talked about above in ["Moving Quickly"](#moving-quickly), with more of a focus on reusing existing workspaces. But just like Gitpod & GitHub Codespaces, Coder has a great list of features if you're willing to put in the work & maintenance costs of running it in house. They have a [Community Discord](https://coder.com/chat) server similar to Gitpod's that you can join to ask questions or get advice.

I'd also recommend checking out [Jetpack Devbox](https://www.jetpack.io/devbox). It's not technically a CDE if you're self hosting, since everything is running on your local machine, but it deserves a place in this list. With Devbox, you get an easy to use CLI that allows you to quickly spin up Nix based isolated dev environments. They use a custom [`devbox.json`](https://www.jetpack.io/devbox/docs/configuration/) configuration file which allows you to specify your toolchain without any Nix knowledge, lowering the barrier for entry. Jetpack is currently working on Devbox in the Cloud, which you can try out at [devbox.sh](https://devbox.sh). Devbox is an exciting option for those of us who have the hardware to power the CDE experience locally.

### Honorable Mentions

I wanna shout-out [Stackblitz](https://stackblitz.com/) here. They aren't a true Cloud Development Environment since everything is happening in your local browser tab. However, their [webcontainers](https://webcontainers.io/) technology allows you to run NodeJS and operating system commands entirely in your browser. This is a great option if you are a web developer with a NodeJS tool chain because you don't have to pay for the cloud costs. You can even build your own REPL/IDE online, an amazing example of this is [SvelteLab](https://www.sveltelab.dev/).
