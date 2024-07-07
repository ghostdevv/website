export interface Person {
    name: string;
    image: string;
}

export const supporters: { current: Person[]; past: Person[] } = {
    current: [
        {
            name: 'Braden Wiggins',
            image: 'bruhdy-fractal.webp',
        },
    ],

    past: [
        {
            name: 'Dusan Malusev',
            image: 'dusan.webp',
        },
        {
            name: 'Stefan Bogdanović',
            image: 'stefan.webp',
        },
        {
            name: 'Scott Spence',
            image: 'scott-spence.webp',
        },
        {
            name: 'Alfie',
            image: 'alfie.webp',
        },
        {
            name: 'Cain',
            image: 'cain.webp',
        },
        {
            name: 'Gen Ashley',
            image: 'gen-ashley.webp',
        },
    ],
};

export const donators: Person[] = [
    {
        name: 'Kevin Åberg Kultalahti',
        image: 'kevin.webp',
    },
    {
        name: 'ChristopherMc',
        image: 'christophermc.webp',
    },
];
