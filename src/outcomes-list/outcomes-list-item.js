import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior';
import 'siren-entity/siren-entity.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import OutcomeParserBehaviour from 'd2l-activity-alignments/d2l-outcome-parser-behavior.js';
import * as hmConsts from 'd2l-hypermedia-constants';
import { oupConsts } from '../consts';
import '../mini-trend/mini-trend';

export class OutcomesListItem extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		OutcomeParserBehaviour
	],
	PolymerElement
) {
	static get is() { return 'd2l-outcomes-list-item'; }

	static get template() {
		const template = html`
			<style include="d2l-typography">
				#container {
					border-top: 1px solid var(--d2l-color-mica);
					display: flex;
					padding: 18px 0px;
				}

				#container:not([aria-busy]):hover {
					cursor: pointer;
				}

				#primary {
					flex-grow: 1;
				}

				#primary .main-text {
					@apply --d2l-body-text;
				}

				#primary .sub-text {
					@apply --d2l-body-small-text;
					margin-top: 6px;
				}

				#secondary {
					display: flex;
					flex-shrink: 0;
					justify-content: flex-end;
					margin-left: 24px;
					min-width: 84px;
				}

				@keyframes skeleton-pulse {
					from { background-color: var(--d2l-color-sylvite); }
					to { background-color: var(--d2l-color-regolith); }
				}

				.skeleton {
					animation-direction: alternate;
					animation-duration: 1.8s;
					animation-iteration-count: infinite;
					animation-name: skeleton-pulse;
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
					display: inline-block;
				}

				.main-text .skeleton {
					height: 19px;
					width: 100%;
				}

				.sub-text .skeleton {
					height: 14px;
					width: 20%;
				}

				[hidden] {
					display: none !important;
				}
			</style>
			<siren-entity href="[[_outcomeHref]]" token="[[token]]" entity="{{_outcomeEntity}}"></siren-entity>
			<div id="container" role="listitem" on-click="_onItemClicked" aria-busy$="[[!_outcomeEntity]]">
				<div id="primary">
					<template is="dom-if" if="[[_outcomeEntity]]">
						<div class="main-text">[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</div>
						<div class="sub-text">[[getOutcomeIdentifier(_outcomeEntity)]]</div>
					</template>
					<template is="dom-if" if="[[!_outcomeEntity]]">
						<div class="main-text">
							<div class="skeleton"></div>
							<div class="skeleton"></div>
						</div>
						<div class="sub-text">
							<div class="skeleton"></div>
						</div>
					</template>
				</div>
				<div id="secondary">
					<d2l-mini-trend
						hidden$="[[!_outcomeEntity]]"
						href="[[_activitiesHref]]"
						token="[[token]]"
					></d2l-mini-trend>
				</div>
			</div>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			_activitiesHref: {
				type: String,
				computed: '_getActivitiesHref(entity)'
			},
			_outcomeEntity: {
				type: Object,
				value: null
			},
			_outcomeHref: {
				type: String,
				computed: '_getOutcomeHref(entity)'
			},
			_selfHref: {
				type: String,
				computed: '_getSelfHref(entity)'
			}
		};
	}

	static get observers() {
		return [
			'_onEntityChanged(entity)'
		];
	}

	_getActivitiesHref(entity) {
		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcome)) {
			return entity.getLinkByRel(hmConsts.Rels.UserProgress.outcomeActivities).href;
		}
		return null;
	}

	_getOutcomeHref(entity) {
		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcome)) {
			return entity.getLinkByRel(hmConsts.Rels.Outcomes.outcome).href;
		}
		return null;
	}

	_getSelfHref(entity) {
		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcome)) {
			return entity.getLinkByRel('self').href;
		}
		return null;
	}

	_onItemClicked() {
		if (this._outcomeEntity) {
			this.dispatchEvent(new CustomEvent(oupConsts.events.outcomeListItemClicked, { composed: true, bubbles: true, detail: { href: this._selfHref } }));
		}
	}
}

customElements.define(OutcomesListItem.is, OutcomesListItem);
