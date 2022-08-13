export interface Person {
    name: string;
    image: string;
}

export const supporters: { current: Person[]; past: Person[] } = {
    current: [
        {
            name: 'Fractal',
            image: '/donators/fractal.png',
        },
        {
            name: 'Stefan Bogdanović',
            image: '/donators/stefan.png',
        },
        {
            name: 'Dusan Malusev',
            image: '/donators/dusan.png',
        },
    ],

    past: [
        {
            name: 'Scott Spence',
            image: '/donators/scott-spence.png',
        },
        {
            name: 'Alfie',
            image: '/donators/alfie.png',
        },
        {
            name: 'Cain',
            image: '/donators/cain.png',
        },
        {
            name: 'Gen Ashley',
            image: '/donators/gen-ashley.jpeg',
        },
    ],
};

export const donators: Person[] = [
    {
        name: 'Kevin Åberg Kultalahti',
        image: '/donators/kevin.jpg',
    },
    {
        name: 'ChristopherMc',
        image: '/donators/christophermc.webp',
    },
];
