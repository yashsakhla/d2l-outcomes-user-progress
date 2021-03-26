import '@brightspace-ui/core/components/offscreen/offscreen.js';
import { css, html, LitElement } from 'lit-element';

export class PartialBold extends LitElement {

	static get properties() {
		return {
			boldRegex: { attribute: 'bold-regex', type: String },
			content: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline;
			}
		`;
	}

	static get is() { return 'partial-bold'; }

	render() {
		if (!this.content) return;

		const parsedContent = this._parseContent(this.content, this.boldRegex);

		return html`
			<d2l-offscreen id="screen-reader">${this.content}</d2l-offscreen>
			<div aria-labelledby="screen-reader" aria-hidden="true">
				${parsedContent.map(piece => (piece.bold ? html`<b>${piece.data}</b>` : piece.data))}
			</div>
		`;
	}

	_parseContent(content, boldRegex) {
		if (!boldRegex) {
			return [{ data: content, bold: false }];
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

}

customElements.define(PartialBold.is, PartialBold);
