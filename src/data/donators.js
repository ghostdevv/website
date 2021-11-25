/**
 * @typedef Person
 * @prop {string} name
 * @prop {string} imagePath
 */

/**
 * @typedef SupporterType
 * @prop {string=} cheese
 *
 * @typedef { Person & SupporterType } Supporter
 */

/**
 * @type {{ current: Supporter[], previous: Supporter[] }}
 */
export const supporters = {
    current: [
        {
            name: 'Scott Spence',
            imagePath: '/donators/scott-spence.png',
        },
    ],

    previous: [
        {
            name: 'Alfie',
            imagePath: '/donators/alfie.png',
        },
        {
            name: 'Cain',
            imagePath: '/donators/cain.png',
        },
    ],
};

/** @type {Person[]} */
export const donators = [];
