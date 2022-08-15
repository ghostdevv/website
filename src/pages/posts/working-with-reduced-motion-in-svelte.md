---
layout: $layouts/Post.astro

tag: post
title: Working with reduced motion in Svelte
excerpt: Working with reduced motion and Svelte transitions can be easy. In this post I cover how we can adapt our website for those who prefer reduced motion, and how to use svelte-reduced-motion to make your transitions accessible.
image: reduced-motion.webp
timestamp: 1651016520000
---

Accessibility on the web is important. It's why frameworks like Svelte have accessibility warnings built in, and why it's a metric in tools such as lighthouse. You want the ability to control the look and feel of your website for those who use assistive technology, or just want a better experience on the web.

Animations in Svelte are powerful, but for those who prefer reduced motion, some aren't ideal. A solution to this problem isn't exactly new. [Geoff Rich published a blog post](https://geoffrich.net/posts/svelte-prefers-reduced-motion-store/) on it back in March 2021. However, I'm lazy and don't want to implement this on every project. This led me to make `svelte-reduced-motion`.

I recommend reading this awesome [CSS Tricks Article by Eric Bailey](https://css-tricks.com/introduction-reduced-motion-media-query). It goes in depth about the benefits people can get from sites that support reduced motion and the `prefers-reduced-motion` media query.

# Getting Started

As per usual, let's install the dependency.

```bash
npm install svelte-reduced-motion -D
```

# Transitions

To make it easy, we provide a way to use any of Svelte's built-in transitions out of the box. Later you will learn how you can create custom ones too! By default, all transitions will fall back to `fade` when reduced motion is requested.

```svelte
<script>
  import { fly } from 'svelte-reduced-motion/transition';
</script>

<div transition:fly={{ y: -20 }}>
  I will fly by default, and fade if the user requests reduced motion
</div>
```

All the transitions from [svelte/transition](https://svelte.dev/docs#run-time-svelte-transition) are supported with feature parity.

# Custom Transitions

With `svelte-reduced-motion`, it's easy to set a fallback transition for users who prefer reduced motion. The signature is simple. We can pass in the desired transition and a fallback. We also have a way of customising the options for each individually (the options we pass in the template are passed to both. In some cases, we might need to configure them individually)

- Simple Example

  ```svelte
  <script>
      import { createTransition } from 'svelte-reduced-motion';
      import { fly } from 'svelte/transition';

      const accessibleTransition = createTransition(fly);
  </script>

  <!-- You can even specify the options as usual-->
  <div transition:accessibleTransition={{ y: -20 }}>
      Hello world
  </div>
  ```

- Custom options for each transition

  ```js
  const accessibleTransition = createTransition(
      [fly, { duration: 1000 }], // default
      [fade, { duration: 200 }]  // reduced-motion fallback
  );

  const accessibleTransition = createTransition(
      [fly, { duration: 750, y: -20 }],
      fade
  );
  ```

# Reacting to reduced motion

The last thing we can do with `svelte-reduced-motion` is react to whether the user prefers reduced motion. For example, we export a `reducedMotion` store:

```html
<script>
    import { reducedMotion } from 'svelte-reduced-motion';
</script>

<p>
    Reduced Motion: {$reducedMotion ? 'enabled' : 'disabled'}
</p>
```

# Conclusion

Prefers reduced motion is another accessibility item we have to consider in Svelte. CSS provides us with all the tools, and combined with `svelte-reduced-motion`, we can easily add this consideration to our Svelte projects.