import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior';
import * as hmConsts from 'd2l-hypermedia-constants';
import './outcomes-list-item';

const DEFAULT_SKELETON_COUNT = 10;

export class OutcomesList extends mixinBehaviors(
	[ D2L.PolymerBehaviors.Siren.EntityBehavior ],
	PolymerElement
) {
	static get is() { return 'd2l-outcomes-list'; }

	static get template() {
		const template = html`
			<div id="container" role="list">
				<template is="dom-if" if="[[!entity]]">
					<template is="dom-repeat" items="[[_numSkeletons]]">
						<d2l-outcomes-list-item></d2l-outcomes-list-item>
					</template>
				</template>
				<template is="dom-repeat" items="[[_outcomes]]">
					<d2l-outcomes-list-item href="[[_getOutcomeHref(item)]]" token="[[token]]"></d2l-outcomes-list-item>
				</template>
            </div>
        `;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			_outcomes: {
				type: Array,
				value: []
			},
			_numSkeletons: {
				type: Number,
				value: Array.apply(null, { length: DEFAULT_SKELETON_COUNT }).map((v, i) => i)
			}
		};
	}

	_onEntityChanged(entity) {
		let outcomes = [];

		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomes)) {
			outcomes = entity.getSubEntitiesByClass(hmConsts.Classes.userProgress.outcomes.outcome);
		}

		this._outcomes = outcomes;
	}

	_getOutcomeHref(outcomeEntity) {
		return outcomeEntity.getLinkByRel('self').href;
	}
}

customElements.define(OutcomesList.is, OutcomesList);
