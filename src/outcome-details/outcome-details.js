import { LitElement, html, css } from 'lit-element';
import 'd2l-outcomes-overall-achievement/src/primary-panel/primary-panel';

export class OutcomeProgressDetails extends LitElement {
	static get is() { return 'd2l-outcome-progress-details'; }

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
				padding: 30px;
				border: 1px solid var(--d2l-color-gypsum);
				border-radius: 6px;
				box-shadow: 0 4px 8px 0 rgba(0,0,0,0.03);
			}
		`;
	}

	constructor() {
		super();
		this.instructor = true;
	}

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
