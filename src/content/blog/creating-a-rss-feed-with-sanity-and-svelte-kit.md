---
tag: blog
title: Creating a RSS feed with Sanity and Svelte Kit
excerpt: Read this post to learn how to leverage Svelte Kit endpoints, along with a CMS such as sanity to create a RSS feed for your blog.
image: $assets/posts/rss-sanity-sveltekit.webp
timestamp: 1643897820000
---

> This post has been updated for SvelteKit 1.0 and Sanity js 6

The other day [I decided that I wanted to start using an rss reader](https://twitter.com/onlyspaceghost/status/1487032568100839428). Since RSS is awesome I thought it only makes sense that I add it to my site. This post will go over how I did this, so you can add it to your blog! I will be using Sanity as my CMS but you can use any data source that you like.

# Dependencies

The first step is to install the `rss` package to your Svelte Kit project. If you are not using Sanity don't install `groq` or `@sanity/client`

```bash
npm i @types/rss rss @sanity/client groq -D
```

# Creating your endpoint

We need a rss.xml endpoint that users can add to their RSS readers. In your routes folder create a file called `rss.xml/+server.js`.

Next we need to structure our endpoint, lets start by importing our dependencies and creating our GET function.

```js
// Only import these two if you are using Sanity
import { createClient } from '@sanity/client';
import groq from 'groq';

import RSS from 'rss';

export async function GET() {}
```

# Creating your feed

Now we have our endpoint file, we need to create our feed, there are many options you can add to your feed to customise it. In this example I will only show the required ones, [checkout the other options here](https://www.npmjs.com/package/rss#feedoptions).

```js
const feed = new RSS({
	title: 'GHOSTDev blog', // The title of our rss feed
	site_url: 'https://ghostdev.xyz', // Our base site url
	feed_url: 'https://ghostdev.xyz/rss.xml', // This links to our endpoint
});
```

# Adding your content

Now we have our feed we need to fetch our data, this is where Sanity comes in. I will assume that your post data has a `title`, `excerpt` (description), `timestamp`, and `slug` field.

```js
const sanity = createClient({
	projectId: '', // Sanity Project ID
	dataset: '', // Sanity DataSet
	useCdn: true,
});

const query = groq`
    *[_type == 'post']{
        title,
        excerpt,
        timestamp,
        
        "slug": slug.current,
        "image": image.asset -> url,
    } | order(timestamp desc)
`;

const posts = await sanity.fetch(query);
```

Once we have our data we can add it to our feed. You can view all possible fields you can have [here](https://www.npmjs.com/package/rss#itemoptions)

```js
for (const post of posts)
	feed.item({
		title: post.title,
		description: post.excerpt,
		date: post.timestamp,
		url: `https://ghostdev.xyz/posts/${post.slug}`,
	});
```

# Finishing up

We are just about done! The last step is returning the rss data from your endpoint. We will indent it to make it readable

```js
return {
	body: feed.xml({ indent: true }),
};
```

# End Result

Thank you for reading this post! Below is the end result of what we created incase you want to copy and paste it. Don't forget to add links to your RSS endpoint on your site, and if this post helped you share it on twitter

```js
// Only import these two if you are using Sanity
import { createClient } from '@sanity/client';
import groq from 'groq';

import RSS from 'rss';

const sanity = createClient({
	projectId: '', // Sanity Project ID
	dataset: '', // Sanity DataSet
	useCdn: true,
});

export async function GET() {
	const feed = new RSS({
		title: 'GHOSTDev blog', // The title of our rss feed
		site_url: 'https://ghostdev.xyz', // Our base site url
		feed_url: 'https://ghostdev.xyz/rss.xml', // This links to our endpoint
	});

	const query = groq`
        *[_type == 'post']{
            title,
            excerpt,
            timestamp,
            
            "slug": slug.current,
            "image": image.asset -> url,
        } | order(timestamp desc)
    `;

	const posts = await sanity.fetch(query);

	for (const post of posts)
		feed.item({
			title: post.title,
			description: post.excerpt,
			date: post.timestamp,
			url: `https://ghostdev.xyz/posts/${post.slug}`,
		});

	return new Response(feed.xml({ indent: true }), {
		status: 200,
		headers: {
			'Content-Type': 'application/xml',
		},
	});
}
```
