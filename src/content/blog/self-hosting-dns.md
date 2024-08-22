---
tag: blog
title: Self-hosting DNS
excerpt: My journey of DNS, including self-hosting with Pi-hole and AdGuard Home, using paid services like NextDNS and AdGuard DNS, and public privacy-respecting resolvers.
image: $assets/posts/self-hosting-dns/self-hosting-dns.png
timestamp: 1724295643540
---

I'm gonna cover my journey of self-hosting my own DNS resolver with [AdGuard Home](https://github.com/AdGuardTeam/AdGuardHome), but I think it makes sense to first start with my motivations. I've wanted to have my own customisable DNS resolver for a couple years now, so when I found out about [NextDNS](https://nextdns.io) I subscribed straight away. I was on their [paid plan](https://nextdns.io/pricing) for individuals and super happy. It comes in at only £1.79/m (~$2.25) for unlimited queries. They have a super nice UI with all the features I need, including an [integration with Tailscale](https://tailscale.com/kb/1218/nextdns). Alas, I am also a big fan of self-hosting — which NextDNS can't do.

## My Requirements

In my opinion the **bare minimum** a custom DNS resolver needs to do in order to make more sense than just sending requests to [1.1.1.1](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/), [quad9](https://www.quad9.net/service/service-addresses-and-features), or [Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls) directly is as follows:

-   Custom blocking lists for spammy/malicious/invasive domains (e.g. [oisd](https://oisd.nl/))
-   Recursively forward requests to your choice of DNS provider (e.g 1.1.1.1)
-   Allow custom dns rewrites (e.g. `example.local -> 10.0.0.0`)

It's a big bonus if they have:

-   Custom rules for different users
-   Analytics

I also require support for modern DNS protocols. The most common way a DNS request is done uses a plain, unencrypted request to port 53. It's super important to be able to use at least one of the main three encrypted methods: HTTPS (DoH), T LS (DoT), or QUIC (DoQ). I'll come back to these later.

I'm not going to completely self-host the DNS stack (just yet), so I'll still need a public DNS resolver to forward queries to. However, self-hosting everything still has its benefits. By using multiple different resolvers, operated by different companies, no single one gets the whole picture. Resolvers could also be raced to see which is able to return the query the fastest. Additionally, it only needs to be changed in one place if I stop using a resolver.

## Pi-hole

I think the first thing most people think of when you talk about running your own DNS resolver, you think of [Pi-hole](https://pi-hole.net/), so that's the first thing I tried. It was super easy to get running and [setup in Docker](https://github.com/pi-hole/docker-pi-hole). I was initially quite happy, but quickly realised I would have to look at other options because of my feature [requirements](#Requirements):

| Feature                                                                 | AdGuard&nbsp;Home | Pi-Hole                                                 |
| ----------------------------------------------------------------------- | ----------------- | ------------------------------------------------------- |
| Blocking ads and trackers                                               | ✅                | ✅                                                      |
| Customizing blocklists                                                  | ✅                | ✅                                                      |
| Built-in DHCP server                                                    | ✅                | ✅                                                      |
| HTTPS for the Admin interface                                           | ✅                | Kind of, but you'll need to manually configure lighttpd |
| Encrypted DNS upstream servers (DNS-over-HTTPS, DNS-over-TLS, DNSCrypt) | ✅                | ❌ (requires additional software)                       |
| Cross-platform                                                          | ✅                | ❌ (not natively, only via Docker)                      |
| Running as a DNS-over-HTTPS or DNS-over-TLS server                      | ✅                | ❌ (requires additional software)                       |
| Blocking phishing and malware domains                                   | ✅                | ❌ (requires non-default blocklists)                    |
| Parental control (blocking adult domains)                               | ✅                | ❌ (requires non-default blocklists)                    |
| Force Safe search on search engines                                     | ✅                | ❌                                                      |
| Per-client (device) configuration                                       | ✅                | ✅                                                      |
| Access settings (choose who can use AGH DNS)                            | ✅                | ❌                                                      |
| Running without root privileges                                         | ✅                | ❌                                                      |

Source: [AdGuardTeam/AdGuardHome#comparison-pi-hole](https://github.com/AdGuardTeam/AdGuardHome#comparison-pi-hole)

## AdGuard Home

Thankfully, the second most popular option, [AdGuard Home](https://github.com/AdGuardTeam/AdGuardHome), manages to meet all these requirements. It's written in Go with a React frontend, and is super fast on my small $5 VPS. While I could run it on my homelab setup, I wanted to be able to access it with a static IP, and I don't feel like calling my ISP to get one. The recommended setup for both AdGuard and Pi-hole is to be on your private home network, as it will be faster and protected from spam.

### Initial Setup

I started with the following Docker Compose file.

```yaml
version: '3'

services:
    adguard-home:
        restart: always
        image: adguard/adguardhome
        volumes:
            - ./workdir:/opt/adguardhome/work
            - ./conf:/opt/adguardhome/conf
            # Required if you want DoH/DoT/DoQ - see section of this post about SSL
            - ./certs/certificates:/certs
        ports:
            # Plain DNS
            - '53:53/tcp'
            - '53:53/udp'
            # DOT
            - '853:853/tcp'
            # DOQ
            - '853:853/udp'
            # Admin UI
            - '80:80'
            - '443:443'
            # Initial setup (can be removed after first install)
            - '127.0.0.1:3000:3000'
        networks:
            - adguard_net

networks:
    adguard_net:
        driver: bridge
        ipam:
            driver: default
            config:
                - subnet: 172.28.0.0/16
```

To run the AdGuard Setup wizard, you'll need to go to port `127.0.0.1:3000`. The port can be removed from the file afterwards, as it's only needed for the inital setup.

> [!NOTE]
> The custom network is needed in order for AdGuard Home to trust the docker proxy when you configure it later. If there is a better way to do this that isn't using host mode, [let me know](https://twitter.com/onlyspaceghost).

### Configuring

AdGuard Home will save its config to a file named `AdGuardHome.yaml` (which I've checked into git). I'll show you some key parts of this config file you'll need to change. Make sure AdGuard Home is _not_ running while you do this:

```yaml
dns:
    bind_hosts:
        - 0.0.0.0
    port: 53
    # The recursive DNS resolver you wish to use - I recommend using DoH/DoT/DoQ here
    upstream_dns:
        - https://1.1.1.1/dns-query
        - https://1.0.0.1/dns-query
        - https://dns.mullvad.net/dns-query
        - https://dns.quad9.net/dns-query
    # These must be plain and are used when first setting up an external DoH/DoT/DoQ resolver
    bootstrap_dns:
        - 1.1.1.1
        - 2606:4700:4700::1111
    trusted_proxies:
        # If you changed the docker network configuration you'll need to update this
        - 172.28.0.0/16
# See the below section of this post on SSL
tls:
    enabled: true
    server_name: dns.example.com
    force_https: false
    port_https: 443
    port_dns_over_tls: 853
    port_dns_over_quic: 853
    port_dnscrypt: 0
    certificate_path: /certs/dns.example.com.crt
    private_key_path: /certs/dns.example.com.pem
```

### Identifying Clients

In your DNS setup, you might want to give different people different settings, or have more information when looking through your request logs (which is where this "client" concept comes in). AdGuard Home allows you to identify clients by their IP, CIDR, MAC address, or their Client Id.

#### Client Id

When making a DoH/DoT/DoQ request, you have the luxury of being able to use a domain name rather than just an ip address. This allows you to provide the Client Id as a wildcard subdomain, for example: `tls://someclientname.dns.example.com` or `https://someclientname.dns.example.com/dns-query`. If you are planning on exclusively using DoH it would be easier to use the subpath feature to avoid making a wildcard cert e.g. `https://dns.example.com/dns-query/someclientname`.

### SSL

You'll need to setup a certificate for your domains. I'll assume you're going to use `*.dns.example.com` (wildcard optional see [Client Id](#client-id)) and `dns.example.com`. In my setup I've opted to use [lego](https://github.com/go-acme/lego) to provision these using an [ACME challenge](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge) and their Cloudflare DNS plugin. You'll need the following `docker-compose.yml`, `.env`, and `crt.sh` files. Once you edit the `--domains` flags in the compose file and the contents of the `.env`, you can run `chmod +x ./crt.sh && ./crt.sh` to generate the certificates.

> [!NOTE]
> If you're _not_ using a reverse proxy with SSL generation built-in, this certificate should also include the domain of the AdGuard Home panel.

```yaml
services:
    certs:
        image: goacme/lego
        env_file: .env
        command: --email="$CERT_EMAIL" --accept-tos --domains="dns.example.com" --domains="*.dns.example.com" --pem --dns cloudflare run
        volumes:
            - ./certs:/.lego
```

```bash
CF_DNS_API_TOKEN=""
CERT_EMAIL=""
```

```bash
docker compose -f docker-compose.certs.yml run --remove-orphans --rm certs
```

It's important you make sure your cert path is set correctly. Here is what needs to be changed in the `conf/AdGuardHome.yaml`:

```yaml
tls:
    enabled: true
    server_name: dns.example.com
    force_https: true
    port_https: 443
    port_dns_over_tls: 853
    port_dns_over_quic: 853
    port_dnscrypt: 0
    certificate_path: /certs/dns.example.com.crt
    private_key_path: /certs/dns.example.com.pem
```

### Reverse Proxy

If you want to use a reverse proxy for the DoH and AdGuard Home panel rather than exposing port 80 and 443 directly you can, I went with [Caddy](https://caddyserver.com/).

To start you'll want to edit your `docker-compose.yml` file to only expose port `80` but map it to another port like `6781` (I picked this randomly):

```yaml
services:
    adguard-home:
        # ...
        ports:
            # ...
            - '127.0.0.1:6781:80'
```

Next update your AdGuard Home config:

```yaml
tls:
    force_https: false
    port_https: 0
    allow_unencrypted_doh: true
```

Finally, you'll need to setup Caddy:

```Caddyfile
# AdGuard Home Panel
# Caddy will make this cert for us
manage.example.com {
    reverse_proxy 127.0.0.1:6781
}

*.dns.example.com,
dns.example.com {
    tls <cert_file> <key_file> # you can use these from the previous step

    handle /dns-query {
        reverse_proxy 127.0.0.1:6781
    }
}
```

## Using your new DNS resolver

### Routers

If your router supports setting a custom DNS resolver, this is a great way to have it across your whole home. There _are_ some drawbacks of course; it can be harder to have user-specific analytics, and non-technical members of your family might struggle with it. AdGuard Home can also [act as a DHCP server](https://github.com/AdGuardTeam/AdGuardHome/wiki/DHCP) which might work even better for you.

### Windows

For once, users of Windows **11** have it the easiest, with an [option in settings to configure DoH](https://pureinfotech.com/enable-dns-over-https-windows-11/). It's a shame that Windows 10 doesn't support this completely, but I don't want to take away from Microsoft's win here, even if no-one is using Windows 11 yet. There are a few guides that can be found for Windows 10 online, but they don't look as straight forward. Let me know how you get on, and I can update this post.

### MacOS & iOS

You can easily create your own profile for your DNS resolver. [paulmillr/encrypted-dns](https://github.com/paulmillr/encrypted-dns) has some great pre-made options, and a guide on how to create your own. From there, it's as simple as downloading and installing it to your device.

### Linux

As with everything GNU+Linux, it's a little more complicated (but not a blackbox of complete mystery and proprietary crap). There are so many ways to achieve this. There is a great [table on the options available](https://wiki.archlinux.org/title/Domain_name_resolution#DNS_servers) from the Arch Linux wiki, and dnsproxy ticks all the boxes. I tried a few, but eventually settled on using another project from AdGuard called [dnsproxy](https://github.com/AdGuardTeam/dnsproxy).

This guide assumes your networking setup respects [`/etc/resolv.conf`](https://man.archlinux.org/man/resolv.conf.5), or looks for a dns resolver running locally on port 53.

I first started by [installing dnsproxy](https://github.com/AdGuardTeam/dnsproxy#how-to-install). I'm running Arch Linux, so was able to use the the [dnsproxy](https://aur.archlinux.org/packages/dnsproxy) package from the aur. You'll need to have it running as a service, and for this I used systemd. Your service file should look something like this:

```ini
[Unit]
Description=Simple DNS proxy with DoH, DoT, and DNSCrypt support
Documentation=https://github.com/AdGuardTeam/dnsproxy#readme
After=network.target
Before=network-online.target

[Service]
Type=simple
DynamicUser=true
WorkingDirectory=/etc/dnsproxy
ProtectSystem=true
ProtectHome=true
PrivateTmp=true
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
ExecStart=/usr/bin/dnsproxy --config-path=/etc/dnsproxy/dnsproxy.yaml
Restart=on-failure
RestartSec=30
StartLimitBurst=10

[Install]
WantedBy=multi-user.target
```

This file was generated for me to `/usr/lib/systemd/system/dnsproxy.service`, and I simply ran the following to get it running:

```bash
sudo systemctl daemon-reload
sudo systemctl enable dnsproxy --now
```

Next up, you need to configure dnsproxy by editing the `/etc/dnsproxy/dnsproxy.yaml` file:

```yaml
---
bootstrap:
    - '1.1.1.1'
listen-addrs:
    - '0.0.0.0'
slisten-ports:
    - 53
max-go-routines: 0
ratelimit: 0
ratelimit-subnet-len-ipv4: 24
ratelimit-subnet-len-ipv6: 64
udp-buf-size: 0
upstream:
    - 'https://1.1.1.1/dns-query' # Replace me with your dns resolver address
timeout: '10s'
cache: true
```

Once you've edited your config file, you can run the following to restart dnsproxy:

```bash
sudo systemctl reload dnsproxy
```

The final step is to setup your `/etc/resolv.conf` to include your dnsproxy address, and a fallback dns resolver. You can have up to three nameservers in this file:

```
nameserver 127.0.0.1
nameserver 1.1.1.1
```

The change will take place immediately, if you have any issues with DNS you need only edit this file to be a public DNS resolver (e.g. 1.1.1.1) and hit save. However, it's inevitable that other programs will try to change this file. For me I constantly have Network Manager, Tailscale, and Mullvad fighting for DNS control. The easiest solution I've found is to make the file immutable, which you can do by using the `chattr` command:

```bash
sudo chattr +i /etc/resolv.conf # Use -i to make it mutable
```

### Android

On my Samsung phone, I was able to set a "Private DNS" option that allowed me to enter a DoH address. This will vary between device, and it's worth searching online for instructions for your current phone. If your Android skin doesn't support this, you might need to sideload an app for it to work, as — surprise surprise — [our Google overlords don't like adblockers](https://adguard.com/en/blog/adguard-google-play-removal.html).

## Creating a DoH API

I frequently use [dog](https://github.com/ogham/dog) to query dns servers while testing, but I also occasionally use [dns.google](https://dns.google/), which inspired me to create something similar (side projects side project 🤯). I wanted to use a JSON API like some [DoH providers support](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/#http-method) but unfortunately AdGuard Home doesn't have this built-in. Instead I opted to use [Deno](https://deno.land/) to construct the DNS packet, then send it to our DNS resolver over HTTPS:

```ts
// @deno-types="npm:@types/dns-packet"
import packet, { type RecordType } from 'npm:dns-packet';
// @deno-types="npm:@types/node"
import { Buffer } from 'node:buffer';

/**
 * Make a DoH Query
 * @param type the record type to use e.g. A
 * @param name the host to check e.g. google.com
 */
async function query(type: string, name: string) {
	// Try replacing this URL with your DoH endpoint
	const response = await fetch('https://1.1.1.1/dns-query', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/dns-message',
		},
		body: packet.encode({
			type: 'query',
			id: Math.floor(Math.random() * 65534) + 1,
			flags: packet.RECURSION_DESIRED,
			questions: [{ type: TYPE, name: NAME }],
		}),
	});

	const rawData = packet.decode(Buffer.from(await response.arrayBuffer()));

	return {
		status: 'rcode' in rawData ? rawData.rcode : null,
		flags: {
			tc: rawData.flag_tc,
			rd: rawData.flag_rd,
			ra: rawData.flag_ra,
			ad: rawData.flag_ad,
			cd: rawData.flag_cd,
		},
		questions: rawData.questions || null,
		answers: rawData.answers || null,
		authorities: rawData.authorities || null,
		additionals: rawData.additionals || null,
	};
}

// Success!
const result = await query('A', 'google.com');
```

You can then create a REST API with something like [Hono](https://hono.dev/):

```ts
import { HTTPException, Hono } from 'https://deno.land/x/hono@v4.2.9/mod.ts';
import { logger, cors } from 'https://deno.land/x/hono@v4.2.9/middleware.ts';

const server = new Hono();

server.use(logger());
server.use(cors({ origin: '*' }));

server.get('/query', async (c) => {
	const { name, type = 'A' } = c.req.query();

	if (!name?.trim().length) {
		throw new HTTPException(400, { message: 'invalid/missing name param' });
	}

	// Use your query() function from the last codeblock
	// don't forget to change the URL to your new DNS resolver!
	const result = await query(type, name);

	return c.json(result);
});

Deno.serve(server.fetch);
```

Try it out!

```bash
$ curl -s http://localhost:8000/query?name=google.com | jq

{
  "status": "NOERROR",
  "flags": {
    "tc": false,
    "rd": true,
    "ra": true,
    "ad": false,
    "cd": false
  },
  "questions": [
    {
      "name": "google.com",
      "type": "A",
      "class": "IN"
    }
  ],
  "answers": [
    {
      "name": "google.com",
      "type": "A",
      "ttl": 149,
      "class": "IN",
      "flush": false,
      "data": "142.251.36.46"
    }
  ],
  "authorities": [],
  "additionals": []
}
```

## Caveats

As you can imagine, there are massive caveats to self-hosting DNS. It's not an especially simple process, and can be quite tedious at times. This whole setup was the result of a few days of tinkering, which if I had the audacity to pay myself for, would've be decades of NextDNS at their current pricing.

I received an insane amount of spam, nearly 850,000 requests from 571,798 unique ip addresses in just a day. I ended up having to block port 53 which is not ideal for clients that can't use one of the newer secure protocols. Fortunately, I was able to migrate everything to DoH with some local proxying on some devices, but it means I won't be able to take full advantage of my DNS resolver.

An important note about reliability — if your DNS resolver goes down, you'll lose access to the _entire_ internet (nearly). Make sure you set a fallback to a public DNS resolver — and make sure your device supports this!

## Should you do this?

It depends! If you find this stuff interesting and want to learn more, it's 100% worth trying, even if you don't use it for very long. I have been running it for a couple of months now and am quite happy. I don't think it's for everyone, but I definitely think that more people interested in exploring this should be doing so locally in their homes, rather than on a public facing resolver.

It's been a super fun experiment, and if I have any major issues, I'll likely give the [AdGuard DNS Cloud](https://adguard-dns.io/en/license.html) offering a try (or switch back to NextDNS). The pricing between the two is basically the same!

If you're going to take anything from this article, please please please switch your default DNS resolvers to something more private than what your ISP provides. I'm partial to [Cloudflare (1.1.1.1)](https://one.one.one.one/), [quad9](https://www.quad9.net/service/service-addresses-and-features), and [Mullvad's](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls) resolvers but there is a [super complete list by AdGuard](https://adguard-dns.io/kb/general/dns-providers/). It's a big plus if you can use DoH.
