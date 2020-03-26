import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '@brightspace-ui/core/components/offscreen/offscreen.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-typography/d2l-typography-shared-styles.js';

export class PartialBold extends mixinBehaviors(
	[],
	PolymerElement
) {
	static get is() { return 'partial-bold'; }

	static get template() {
		const template = html`
			<style include="d2l-typography">
				:host {
					display: inline;
				}
			</style>
			<d2l-offscreen id="screen-reader">[[_getScreenReaderText(_parsedContent)]] </d2l-offscreen>
			<div aria-labelledby="screen-reader" aria-hidden="true">
				<template is="dom-repeat" items="[[_parsedContent]]"
					><template is="dom-if" if="[[!item.bold]]"
						>[[item.data]]</template
					><template is="dom-if" if="[[item.bold]]"
						><b>[[item.data]]</b
					></template
				></template>
			</div>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			boldRegex: {
				type: String
			},
			content: {
				type: String
			},
			_parsedContent: {
				computed: '_parseContent(content, boldRegex)'
			}
		};
	}

	_parseContent(content, boldRegex) {
		if (!content) {
			return [];
		}

		if (!boldRegex) {
			return [ { data: content, bold: false } ];
		}

		// Splitting on regex will include the regex matches in the result. Regex matches
		// are guaranteed to be in odd positions.
		return content.split(new RegExp(boldRegex, 'ig')).reduce((acc, cur, i) => {
			if (cur) {
				acc.push({
					data: cur,
					bold: i % 2 !== 0
				});
			}

			return acc;
		}, []);
	}

	_getScreenReaderText(parsedContent) {
		const data = parsedContent.map((item) => item.data);
		return data.join('');
	}
}

customElements.define(PartialBold.is, PartialBold);
