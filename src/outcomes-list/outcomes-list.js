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
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';

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
				:host {
					outline: 0px solid transparent;
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
					<template is="dom-repeat" items="[[_outcomes]]" index-as="outcomesIndex">
						<template is="dom-if" if="[[_isHierarchy]]">
							<d2l-outcomes-tree-node 
								href="[[_getOutcomeHref(item)]]" 
								tabindex="-1" 
								token="[[token]]" 
								index="[[outcomesIndex]]"
								set-size="[[_outcomes.length]]"
								depth="1"
								on-focus-next="_onFocusNext"
								on-focus-previous="_onFocusPrevious" 
								is-last=[[_getOutcomeIsLast(outcomesIndex)]]
								on-focus-first="_onFocusFirst"
								on-focus-last="_onFocusLast">
							</d2l-outcomes-tree-node>
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
			},
			_focus: {
				type: Boolean,
				value: false
			},
			tabIndex: {
				type: Number,
				value: 0
			}
		};
	}

	ready() {
		super.ready();

		afterNextRender(this, function() {
			this.addEventListener('focus', this._onFocus.bind(this));
			this.addEventListener('blur', this._onBlur.bind(this));
		}.bind(this));
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

	_getOutcomeTabIndex(index) {
		return index === 0 ? '0' : '-1';
	}

	_getOutcomeIsLast(outcomeIndex) {
		return outcomeIndex === this._outcomes.length - 1;
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

	_getTreeNodeByIndex(index) {
		var href = this._outcomes[index].getLinkByRel('self');
		var elements = Array.from(this.root.querySelectorAll('d2l-outcomes-tree-node'));

		return elements.find((element) => {
			var link = element.entity.getLinkByRel('self');
			return link ? link === href : false;
		});
	}

	_onFocus() {
		if (this._isHierarchy) {
			var element = this._getTreeNodeByIndex(0);
			if (element) {
				element.focus();
			}
		}
	}

	_onBlur() {
		this._blurAll();
	}

	_blurAll() {
		var elements = Array.from(this.root.querySelectorAll('d2l-outcomes-tree-node'));
		elements.forEach(function(element) {
			element.blurAll();
		});
	}

	_onFocusNext(e) {
		if (e.index < this._outcomes.length - 1) {
			var element = this._getTreeNodeByIndex(e.index + 1);
			if (element) {
				element.focus();
			}
		}
	}

	_onFocusPrevious(e) {
		if (e.index > 0) {
			var element = this._getTreeNodeByIndex(e.index - 1);
			if (element) {
				element.focusLast();
			}
		}
	}

	_onFocusFirst() {
		var element = this._getTreeNodeByIndex(0);
		if (element) element.focus();
	}

	_onFocusLast() {
		var element = this._getTreeNodeByIndex(this._outcomes.length - 1);
		if (element) element.focusLast();
	}
}

customElements.define(OutcomesList.is, OutcomesList);
