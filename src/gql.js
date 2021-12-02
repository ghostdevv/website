import { gql, GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(
    'https://api-eu-central-1.graphcms.com/v2/ckwnzzd8q08bn01xr63su4mhy/master',
);

export const getPosts = (limit = 15, filter = null) => {
    const filters = [
        'orderBy: timestamp_DESC',
        limit && `first: ${limit}`,
        filter && `where: { tag: { id: "${filter}" } }`,
    ];

    const filterStr = filters.filter(Boolean).join(', ');

    return client.request(gql`
        {
            posts(${filterStr}) {
                title
                excerpt
                postType
                link
                timestamp
                slug

                image {
                    url: url(
                        transformation: {
                            image: { resize: { width: 500, fit: clip } }
                        }
                    )
                }

                tag {
                    id
                    name
                    colour {
                        rgba {
                            r
                            g
                            b
                        }
                    }
                }
            }
        }
    `);
};

export const getTextPost = (slug) =>
    client.request(
        gql`
            query ($slug: String) {
                post(where: { slug: $slug }) {
                    title
                    timestamp
                    body
                    postType
                    link

                    image {
                        url: url(
                            transformation: {
                                image: { resize: { width: 800, fit: clip } }
                            }
                        )
                    }

                    tag {
                        name
                        colour {
                            rgba {
                                r
                                g
                                b
                            }
                        }
                    }
                }
            }
        `,
        { slug },
    );

export const getTags = () =>
    client.request(gql`
        query {
            tags {
                id
                name
            }
        }
    `);
