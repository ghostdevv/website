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
            name: 'Scott Spence',
            image: '/donators/scott-spence.png',
            amount: 10,
        },
        {
            name: 'Fractal',
            image: '/donators/fractal.png',
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
