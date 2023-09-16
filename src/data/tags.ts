export const tags = ['blog', 'youtube', 'stream'] as const;

export const tagColours: Record<Tag, string> = {
    blog: '61, 121, 252',
    youtube: '242, 101, 93',
    stream: '201, 86, 247',
};

export type Tag = (typeof tags)[number];
