export interface Person {
    name: string;
    image: string;
}

export const supporters: { current: Person[]; past: Person[] } = {
    current: [
        {
            name: 'Braden Wiggins',
            image: '/donators/bruhdy-fractal.webp',
        },
        {
            name: 'Dusan Malusev',
            image: '/donators/dusan.webp',
        },
    ],

    past: [
        {
            name: 'Stefan Bogdanović',
            image: '/donators/stefan.webp',
        },
        {
            name: 'Scott Spence',
            image: '/donators/scott-spence.webp',
        },
        {
            name: 'Alfie',
            image: '/donators/alfie.webp',
        },
        {
            name: 'Cain',
            image: '/donators/cain.webp',
        },
        {
            name: 'Gen Ashley',
            image: '/donators/gen-ashley.webp',
        },
    ],
};

export const donators: Person[] = [
    {
        name: 'Kevin Åberg Kultalahti',
        image: '/donators/kevin.webp',
    },
    {
        name: 'ChristopherMc',
        image: '/donators/christophermc.webp',
    },
];
