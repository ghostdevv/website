export const tweetLink = (body: string) => {
	return `https://x.com/intent/tweet?text=${encodeURIComponent(body)}`;
};
