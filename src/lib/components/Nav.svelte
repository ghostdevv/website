<script lang="ts">
	import { slide } from 'svelte-reduced-motion/transition';
	import { Hamburger } from 'svelte-hamburgers';
	import TRainbow from './TRainbow.svelte';
	import { mounted } from 'svelte-mount';
	import { HALLOWEEN } from '$lib/vars';

	export let url: URL;

	let width: number;
	let scrollY: number;

	let open = false;

	$: mobile = width < 750;
	$: scroll = scrollY > 0;
	$: if (!mobile) open = false;

	function branding() {
		window.location.href = '/branding';
	}

	const LINKS = [
		{ label: 'Posts', href: '/posts' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Sponsor', href: '/donate' },
		{ label: 'Contact', href: '/contact' },
	];
</script>

<svelte:window bind:innerWidth={width} bind:scrollY />

<div class="wrapper" class:active={scroll || open}>
	<nav class:scroll>
		<a
			class:scroll
			href="/"
			class="logo"
			aria-label="Home"
			on:contextmenu|preventDefault={branding}
		>
			{#if HALLOWEEN}
				<img
					style="width: 100%; height: 100%"
					src="/ghost-halloween.png"
					alt="GHOST's Halloween Theme Logo"
				/>
			{:else}
				<TRainbow />
			{/if}
		</a>

		<div class="hamburger">
			<Hamburger --color="var(--text)" type="squeeze" bind:open />
		</div>

		<div class="links desktop">
			<a href="/" class="link" class:active={url.pathname == '/'}>
				Home
			</a>

			{#each LINKS as link, i (i)}
				<a
					href={link.href}
					class="link"
					class:active={url.pathname.startsWith(`/${link}`)}
				>
					{link.label}
				</a>
			{/each}
		</div>

		{#if $mounted && mobile && open}
			<div class="links" transition:slide={{}}>
				<a href="/" class="link" class:active={url.pathname == '/'}>
					Home
				</a>

				{#each LINKS as link, i (i)}
					<a
						href={link.href}
						class="link"
						class:active={url.pathname.startsWith(`/${link}`)}
					>
						{link.label}
					</a>
				{/each}
			</div>
		{/if}
	</nav>
</div>

<style lang="scss">
	@import 'src/lib/media';

	$mobile: '<750px';
	$desktop: '>750px';

	.wrapper {
		position: fixed;
		z-index: 300;
		top: 0;
		left: 50%;
		transform: translateX(-50%);

		width: 100%;

		background-color: var(--background-primary);

		border: 0px;
		border-bottom: 2px solid transparent;

		transition:
			background-color 0.2s ease-in-out,
			border-color 0.2s ease-in-out;

		&.active {
			box-shadow:
				0 4px 10px -2px rgba(0, 0, 0, 0.1),
				0 4px 20px 0 rgba(0, 0, 0, 0.1);

			background-color: rgba(var(--background-primary-rgb), 0.8);
			backdrop-filter: blur(12px);
			border-color: var(--primary);
		}
	}

	nav {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;

		padding: 32px 24px;

		display: flex;
		align-items: center;
		gap: 22px;

		transition: padding 0.2s ease-in-out;

		@include media($mobile) {
			display: grid;
			grid-template-columns: 1fr max-content;
			grid-template-areas: max-content 1fr;
			grid-template-areas: 'logo hamburger' 'links links';
			gap: 0px;
		}

		&.scroll {
			padding: 20px 24px;

			@include media($mobile) {
				padding: 16px 24px;
			}
		}

		.hamburger {
			grid-area: hamburger;
			display: none;

			@include media($mobile) {
				display: block;
			}
		}

		.logo {
			grid-area: logo;
		}

		.links {
			grid-area: links;

			display: flex;
			align-items: center;
			gap: 12px;

			@include media($mobile) {
				flex-direction: column;

				&.desktop {
					display: none;
				}
			}
		}
	}

	.link {
		text-transform: capitalize;
		font-weight: 600;
		padding: 12px 16px;

		border-radius: 8px;
		border: 2px solid transparent;

		transition:
			border-color 0.2s ease-in-out,
			opacity 0.2s ease-in-out;

		color: var(--text);
		opacity: 0.6;

		text-decoration: none;

		&.active {
			opacity: 1;
		}

		&:hover,
		&:focus {
			opacity: 1;
			background-color: inherit;
			border-color: var(--primary);
		}
	}

	.logo {
		width: 60px;
		height: 60px;

		display: grid;
		place-items: center;

		transition:
			height 0.2s ease-in-out,
			width 0.2s ease-in-out;

		@include media($desktop) {
			&.scroll {
				width: 40px;
				height: 40px;
			}
		}

		@include media($mobile) {
			width: 50px;
			height: 50px;
		}
	}
</style>
