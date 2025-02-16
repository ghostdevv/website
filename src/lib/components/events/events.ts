import { getCollection, type CollectionEntry } from 'astro:content';

type RawEvent = CollectionEntry<'events'>['data'];

export type Event = RawEvent & {
	status: EventStatus;
};

type EventStatus = 'upcoming' | 'past' | 'now';

export function getEventStatus(event: RawEvent): EventStatus {
	const now = new Date();
	if (now < event.start) return 'upcoming';
	if (now > event.end) return 'past';
	return 'now';
}

export async function getEvents() {
	const allEvents = await getCollection('events').then((events) =>
		events
			.map<Event>((event) => ({
				...event.data,
				status: getEventStatus(event.data),
			}))
			.sort((a, b) => b.start.getTime() - a.start.getTime()),
	);

	return {
		upcoming: allEvents.filter((event) => event.status === 'upcoming'),
		past: allEvents.filter((event) => event.status === 'past'),
		now: allEvents.filter((event) => event.status === 'now'),
	};
}

export const placeTagColours: Record<Event['place'], string> = {
	'in-person': 'var(--primary-rgb)',
	online: 'var(--secondary-rgb)',
	hybrid: '201, 86, 247',
};

export const typeTagColours: Record<Event['type'], string> = {
	conference: 'var(--orange-rgb)',
	meetup: 'var(--green-rgb)',
	stream: 'var(--red-rgb)',
};
