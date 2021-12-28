import sanity from '$sanity';
import groq from 'groq';

export const get = async () => {
    const query = groq`*[_type == 'tag']{ "id": _id, name }`;
    const tags = await sanity.fetch(query);

    return {
        body: tags,
    };
};
