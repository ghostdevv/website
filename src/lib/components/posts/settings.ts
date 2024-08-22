import { persisted } from 'svelte-local-storage-store';

export const fontSize = setting('post-font-size', 19);
export const lineHeight = setting('post-line-height', 1.8);

function setting<T>(key: string, initialValue: T) {
	const internal = persisted(key, initialValue);

	return {
		...internal,
		reset() {
			internal.set(initialValue);
		},
	};
}
