import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { oupConsts } from '../consts';
import '../outcomes-list/outcomes-list';
import '../outcome-details/outcome-details';

export class OutcomesUserProgress extends mixinBehaviors(
	[ ],
	PolymerElement
) {
	static get is() { return 'd2l-outcomes-user-progress'; }

	static get template() {
		const template = html`
            <style>
                .hidden {
                    display: none !important;
                }
            </style>
            <d2l-outcomes-list
                id="list"
                class$="[[_getListClasses(_showDetails)]]"
                href="[[href]]"
                token="[[token]]"
            ></d2l-outcomes-list>
            <d2l-outcome-progress-details
                id="details"
                class$="[[_getDetailsClasses(_showDetails)]]"
                href="[[_detailsHref]]"
                token="[[token]]"
            ></d2l-outcome-progress-details>
        `;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			href: {
				type: String
			},
			token: {
				type: String
			},
			_detailsHref: {
				type: String,
				value: null
			},
			_showDetails: {
				type: Boolean,
				value: false
			}
		};
	}

	ready() {
		super.ready();

		this.list = this.root.getElementById('list');
		this.details = this.root.getElementById('details');

		this.addEventListener(oupConsts.events.outcomeListItemClicked, this._onOutcomeClick.bind(this));
		this.addEventListener(oupConsts.events.detailsCloseClicked, this._onDetailsClosed.bind(this));
	}

	_getDetailsClasses(showDetails) {
		if (!showDetails) {
			return 'hidden';
		}
		return null;
	}

	_getListClasses(showDetails) {
		if (showDetails) {
			return 'hidden';
		}
		return null;
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
