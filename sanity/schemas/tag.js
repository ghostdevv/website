export default {
    name: 'tag',
    title: 'Tag',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.uppercase(),
        },
        {
            name: 'colour',
            title: 'Colour',
            type: 'color',
            options: {
                disableAlpha: true,
            },
        },
    ],
};
