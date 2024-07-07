export interface Person {
    name: string;
    src: ImageMetadata;
}

async function img(name: string) {
    const mod = await import(`../assets/sponsors/${name}`);
    return mod.default as ImageMetadata;
}

export const supporters: { current: Person[]; past: Person[] } = {
    current: [
        {
            name: 'Braden Wiggins',
            src: await img('brady.webp'),
        },
    ],

    past: [
        {
            name: 'Dusan Malusev',
            src: await img('dusan.webp'),
        },
        {
            name: 'Stefan Bogdanović',
            src: await img('stefan.webp'),
        },
        {
            name: 'Scott Spence',
            src: await img('scott-spence.webp'),
        },
        {
            name: 'Alfie',
            src: await img('alfie.webp'),
        },
        {
            name: 'Cain',
            src: await img('cain.webp'),
        },
        {
            name: 'Gen Ashley',
            src: await img('gen-ashley.webp'),
        },
    ],
};

export const donators: Person[] = [
    {
        name: 'Kevin Åberg Kultalahti',
        src: await img('kevin.webp'),
    },
    {
        name: 'ChristopherMc',
        src: await img('christophermc.webp'),
    },
];
