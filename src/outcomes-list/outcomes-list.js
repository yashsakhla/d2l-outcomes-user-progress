import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior';
import 'd2l-typography/d2l-typography.js';
import * as hmConsts from 'd2l-hypermedia-constants';
import './outcomes-tree-node';
import './outcomes-list-item';
import '../localize-behavior';

const DEFAULT_SKELETON_COUNT = 10;

export class OutcomesList extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior
	],
	PolymerElement
) {
	static get is() { return 'd2l-outcomes-list'; }

	static get template() {
		const template = html`
			<style include="d2l-typography">
				.no-items {
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 8px;
					background-color: var(--d2l-color-regolith);
					color: var(--d2l-color-ferrite);
					padding: 15px;
					box-sizing: border-box;
					width: 100%;
				}
			</style>
			<div id="container" role="list">
				<template is="dom-if" if="[[!entity]]">
					<template is="dom-repeat" items="[[_numSkeletons]]">
						<d2l-outcomes-list-item></d2l-outcomes-list-item>
					</template>
				</template>
				<template is="dom-if" if="[[entity]]">
					<div class="no-items" hidden="[[!_isEmpty(_outcomes)]]">
						[[_getEmptyMessage(instructor, outcomeTerm)]]
					</div>
					<template is="dom-repeat" items="[[_outcomes]]">
						<template is="dom-if" if="[[_isHierarchy]]">
							<d2l-outcomes-tree-node href="[[_getOutcomeHref(item)]]" token="[[token]]"></d2l-outcomes-tree-node>
						</template>
						<template is="dom-if" if="[[_isList]]">
							<d2l-outcomes-list-item href="[[_getOutcomeHref(item)]]" token="[[token]]"></d2l-outcomes-list-item>
						</template>
					</template>
				</template>
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
			_isHierarchy: {
				computed: '_getIsHierarchy(entity)'
			},
			_isList: {
				computed: '_getIsList(entity)'
			},
			outcomeTerm: String,
			_outcomes: {
				type: Array,
				value: []
			},
			_numSkeletons: {
				type: Array,
				value: Array.apply(null, { length: DEFAULT_SKELETON_COUNT }).map((v, i) => i)
			}
		};
	}

	_getEmptyMessage(instructor, outcomeTerm) {
		const langTerm = instructor ? 'noOutcomesInstructor' : 'noOutcomesStudent';
		return this.localize(langTerm, 'outcome', outcomeTerm);
	}

	_getIsHierarchy(entity) {
		return entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomeTree);
	}

	_getIsList(entity) {
		return entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomes);
	}

	_getOutcomeHref(outcomeEntity) {
		return outcomeEntity.getLinkByRel('self').href;
	}

	_isEmpty(array) {
		return !array || !array.length;
	}

	_onEntityChanged(entity) {
		let outcomes = [];

		if (this._isHierarchy) {
			outcomes = entity.getSubEntitiesByClass(hmConsts.Classes.userProgress.outcomes.outcomeTreeNode);
		} else if (this._isList) {
			outcomes = entity.getSubEntitiesByClass(hmConsts.Classes.userProgress.outcomes.outcome);
		}

		this._outcomes = outcomes;
	}
}

customElements.define(OutcomesList.is, OutcomesList);
