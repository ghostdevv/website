import rss from '@astrojs/rss';

export const get = () =>
    rss({
        title: 'GHOSTDev blog',
        description: 'Welcome to the blog of GHOST!',
        site: 'https://ghostdev.xyz',

        // TODO items
        items: [],
    });
