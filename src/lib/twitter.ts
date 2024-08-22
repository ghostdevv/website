export const tweetLink = (body: string) => {
	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(body)}`;
};
