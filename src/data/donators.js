/**
 * @typedef Person
 * @prop {string} name
 * @prop {string} image
 */

/**
 * @typedef SupporterType
 * @prop {string=} cheese
 *
 * @typedef { Person & SupporterType } Supporter
 */

/**
 * @type {{ current: Supporter[], past: Supporter[] }}
 */
export const supporters = {
    current: [
        {
            name: 'Scott Spence',
            image: '/donators/scott-spence.png',
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
export const donators = [];
