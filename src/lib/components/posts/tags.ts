export const tags = [
	'blog',
	'youtube',
	'stream',
	'podcast',
	'archived',
] as const;

export const tagColours: Record<Tag, string> = {
	blog: '61, 121, 252',
	youtube: '242, 101, 93',
	stream: '201, 86, 247',
	podcast: '9, 132, 124',
	archived: '150, 150, 151',
};

export type Tag = (typeof tags)[number];
