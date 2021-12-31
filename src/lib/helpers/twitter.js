export const createTweetLink = (body) => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(body)}`;
};
