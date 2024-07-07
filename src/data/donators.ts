export interface Person {
    name: string;
    src: ImageMetadata;
}

async function img(name: string) {
    const mod = await import(`../assets/sponsors/${name}.webp`);
    return mod.default as ImageMetadata;
}

export const supporters: { current: Person[]; past: Person[] } = {
    current: [
        {
            name: 'Braden Wiggins',
            src: await img('brady'),
        },
    ],

    past: [
        {
            name: 'Dusan Malusev',
            src: await img('dusan'),
        },
        {
            name: 'Stefan Bogdanović',
            src: await img('stefan'),
        },
        {
            name: 'Scott Spence',
            src: await img('scott-spence'),
        },
        {
            name: 'Alfie',
            src: await img('alfie'),
        },
        {
            name: 'Cain',
            src: await img('cain'),
        },
        {
            name: 'Gen Ashley',
            src: await img('gen-ashley'),
        },
    ],
};

export const donators: Person[] = [
    {
        name: 'Kevin Åberg Kultalahti',
        src: await img('kevin'),
    },
    {
        name: 'ChristopherMc',
        src: await img('christophermc'),
    },
];
