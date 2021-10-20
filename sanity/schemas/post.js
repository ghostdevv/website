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
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 2,
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
            name: 'tag',
            title: 'Tag',
            type: 'reference',
            to: { type: 'tag' },
        },
        {
            name: 'timestamp',
            title: 'Published Timestamp',
            type: 'datetime',
        },
        {
            name: 'postType',
            title: 'Post Type',
            type: 'string',
            options: {
                list: ['link', 'text'],
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'link',
            title: 'Link',
            type: 'url',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            hidden: ({ document }) => document.postType != 'text',
        },
        {
            name: 'body',
            title: 'Post Body',
            type: 'markdown',
            hidden: ({ document }) => document.postType != 'text',
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
