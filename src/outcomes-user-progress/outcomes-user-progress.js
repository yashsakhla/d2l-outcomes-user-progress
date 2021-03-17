import { LitElement, html } from 'lit-element';
import { oupConsts } from '../consts';
import { Consts as CoaConsts } from 'd2l-outcomes-overall-achievement/src/consts';
import '../outcomes-list/outcomes-list';
import '../outcome-details/outcome-details';

export class OutcomesUserProgress extends LitElement {
	static get is() { return 'd2l-outcomes-user-progress'; }

	static get properties() {
		return {
			href: { type: String },
			instructor: { type: Boolean },
			outcomeTerm: { attribute: 'outcome-term', type: String },
			token: { type: String },
			_detailsHref: { attribute: false },
			_showDetails: { attribute: false }
		};
	}

	constructor() {
		super();

		this.instructor = false;
		this._detailsHref = null;
		this._showDetails = false;

		this.addEventListener(oupConsts.events.outcomeListItemClicked, this._onOutcomeClick.bind(this));
		this.addEventListener(CoaConsts.events.primaryPanelCloseClicked, this._onDetailsClosed.bind(this));
	}

	render() {
		return html`
			<d2l-outcomes-list
				href=${this.href}
				token=${this.token}
				?hidden=${this._showDetails}
				?instructor=${this.instructor}
				outcome-term=${this.outcomeTerm}
			></d2l-outcomes-list>
			<d2l-outcome-progress-details
				href=${this._detailsHref}
				token=${this.token}
				?hidden=${!this._showDetails}
				?instructor=${this.instructor}
				outcome-term=${this.outcomeTerm}
			></d2l-outcome-progress-details>
		`;
	}

	_onOutcomeClick(e) {
		this._detailsHref = e.detail.href;
		this._showDetails = true;
	}

	_onDetailsClosed() {
		this._detailsHref = '';
		this._showDetails = false;
	}
}

customElements.define(OutcomesUserProgress.is, OutcomesUserProgress);
