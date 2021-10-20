export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'tag',
            title: 'Tag',
            type: 'reference',
            to: { type: 'tag' },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'timestamp',
            title: 'Published Timestamp',
            type: 'datetime',
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 2,
        },
        {
            name: 'body',
            title: 'Post Body',
            type: 'markdown',
        },
    ],

    orderings: [
        {
            title: 'Timestamp',
            name: 'timestamp',
            by: [{ field: 'timestamp', direction: 'desc' }],
        },
    ],
};
