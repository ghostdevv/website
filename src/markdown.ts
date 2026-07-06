import { defineHastPlugin, defineMdastPlugin } from 'satteri';
import { icons } from '@iconify-json/lucide';

const ALERTS = {
	note: `<svg viewBox="0 0 24 24" style="width: 18px; height: 18px; vertical-align: center;"><${icons.icons['info']?.body}></svg>`,
} as const;

type Alert = keyof typeof ALERTS;

function isAlert(name: string): name is Alert {
	return name in ALERTS;
}

export const alerts = defineMdastPlugin({
	name: 'alerts',
	containerDirective(node, ctx) {
		if (!isAlert(node.name)) return;

		ctx.setProperty(node, 'data', {
			hName: 'div',
			hProperties: { class: 'markdown-alert markdown-alert-note' },
		});

		const name = node.name.charAt(0).toUpperCase() + node.name.slice(1);
		const svg = ALERTS[node.name];

		ctx.prependChild(node, {
			type: 'paragraph',
			data: {
				hProperties: { class: 'markdown-alert-title' },
			},
			children: [
				{ type: 'html', value: svg },
				{ type: 'text', value: name },
			],
		});
	},
});

export const tableWrapper = defineHastPlugin({
	name: 'table-wrapper',
	element: {
		filter: ['table'],
		visit(node, ctx) {
			ctx.wrapNode(node, {
				type: 'element',
				tagName: 'div',
				properties: {
					class: 'table-wrapper',
				},
				children: [],
			});

			return node;
		},
	},
});
