/**
 * @typedef Person
 * @prop {string} name
 * @prop {string} image
 * @prop {number=} amount
 */

/**
 * @type {{ current: Person[], past: Person[] }}
 */
export const supporters = {
    current: [
        {
            name: 'Gen Ashley',
            image: '/donators/gen-ashley.jpeg',
            amount: 15,
        },
        {
            name: 'Scott Spence',
            image: '/donators/scott-spence.png',
            amount: 10,
        },
        {
            name: 'Fractal',
            image: '/donators/fractal.png',
            amount: 5,
        },
        {
            name: 'Stefan Bogdanović',
            image: '/donators/stefan.png',
            amount: 5,
        },
        {
            name: 'Dusan Malusev',
            image: '/donators/dusan.png',
            amount: 5,
        },
    ],

    past: [
        {
            name: 'Alfie',
            image: '/donators/alfie.png',
        },
        {
            name: 'Cain',
            image: '/donators/cain.png',
        },
    ],
};

/** @type {Person[]} */
export const donators = [
    {
        name: 'Kevin Åberg Kultalahti',
        image: '/donators/kevin.jpg',
        amount: 11,
    },
];
