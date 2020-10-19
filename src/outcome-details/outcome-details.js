import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-icons/d2l-icon';
import 'd2l-icons/tier1-icons';
import 'd2l-button/d2l-button-icon';
import 'd2l-colors/d2l-colors.js';
import 'd2l-outcomes-overall-achievement/src/primary-panel/primary-panel';
import '../localize-behavior';

export class OutcomeProgressDetails extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior,
		D2L.PolymerBehaviors.Siren.EntityBehavior,
	],
	PolymerElement
) {
	static get is() {
		return 'd2l-outcome-progress-details';
	}

	static get template() {
		const template = html`
			<style include="d2l-typography">
				.card {
					padding: 30px;
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					box-shadow: 0 4px 8px 0 rgba(0,0,0,0.03);
				}
				
				.close-button {
					display: block;
					flex-grow: 0;
				}
			</style>
			<div class="card">
				<d2l-coa-primary-panel
					href="[[href]]"
					token="[[token]]"
					instructor="[[instructor]]"
					outcome-term="[[outcomeTerm]]"
					show-close="true"
				></d2l-coa-primary-panel>
			</div>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			instructor: {
				type: Boolean,
				value: false
			},
			outcomeTerm: String
		};
	}
}

customElements.define(OutcomeProgressDetails.is, OutcomeProgressDetails);
