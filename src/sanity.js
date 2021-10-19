import client from '@sanity/client';
import groq from 'groq';

export const sanity = client({
    projectId: 'x362b5r1',
    dataset: import.meta.env.MODE,
    apiVersion: '2021-03-25',
});

export const getPosts = () =>
    sanity.fetch(groq`
        *[_type == 'post'][0...15]{
            title,

            "slug": slug.current,

            "image": image.asset -> url,

            "tag": *[_type == 'tag' && _id == ^.tag._ref][0]{
                "name": upper(name),
                "rgb": colour.rgb { r, g, b}
            }
        }
    `);
