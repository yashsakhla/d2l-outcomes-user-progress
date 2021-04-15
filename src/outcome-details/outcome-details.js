import 'd2l-outcomes-overall-achievement/src/primary-panel/primary-panel';
import { css, html, LitElement } from 'lit-element';

export class OutcomeProgressDetails extends LitElement {

	static get properties() {
		return {
			href: { type: String },
			instructor: { type: Boolean },
			outcomeTerm: { attribute: 'outcome-term', type: String },
			token: { type: String }
		};
	}

	static get styles() {
		return css`
			.card {
				border: 1px solid var(--d2l-color-gypsum);
				border-radius: 6px;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.03);
				padding: 30px;
			}
		`;
	}

	constructor() {
		super();
		this.instructor = true;
	}

	static get is() { return 'd2l-outcome-progress-details'; }

	render() {
		return html`
			<div class="card">
				<d2l-coa-primary-panel
					href=${this.href}
					token=${this.token}
					hide-unpublished-coa
					?instructor=${this.instructor}
					outcome-term=${this.outcomeTerm}
					show-close
				></d2l-coa-primary-panel>
			</div>
		`;
	}

}

customElements.define(OutcomeProgressDetails.is, OutcomeProgressDetails);
