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
				#container {
					outline: none;
				}

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
			<div id="container" role="list" tabindex$="[[tabIndex]]">
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
							<d2l-outcomes-tree-node
								href="[[_getOutcomeHref(item)]]"
								token="[[token]]"
								tabindex="-1"
							></d2l-outcomes-tree-node>
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
			_focusedNode: {
				type: Object,
				value: null
			},
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
			_numSkeletons: {
				type: Array,
				value: Array.apply(null, { length: DEFAULT_SKELETON_COUNT }).map((v, i) => i)
			},
			outcomeTerm: String,
			_outcomes: {
				type: Array,
				value: []
			},
			tabIndex: {
				type: Number,
				value: 0
			}
		};
	}

	ready() {
		super.ready();

		// Prepare function ref so it can be bound/unbound
		this._onKeyPress = this._onKeyPress.bind(this);

		this.addEventListener('focus', this._onFocus.bind(this));
		this.addEventListener('blur', this._onBlur.bind(this));

		this.addEventListener('focus-next-child', (e) => {
			this._consumeEvent(e);
			this._focusNextChild(e.detail.outcomeId);
		});

		this.addEventListener('focus-prev-child', (e) => {
			this._consumeEvent(e);
			this._focusPrevChild(e.detail.outcomeId);
		});

		this.addEventListener('node-focused', (e) => {
			this._focusedNode = e.detail.node;
		});
	}

	_consumeEvent(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	_focusNextChild(currentOutcome) {
		if (!this._isEmpty(this._outcomes)) {
			const index = this._getOutcomeIndex(currentOutcome, this._outcomes);

			if (index >= 0 && index < this._outcomes.length - 1) {
				const href = this._getSelfHref(this._outcomes[index + 1]);
				const node = this.root.querySelector(`d2l-outcomes-tree-node[href="${href}"]`);
				if (node) {
					node.focusSelf();
				}
			}
		}
	}

	_focusPrevChild(currentOutcome) {
		if (!this._isEmpty(this._outcomes)) {
			const index = this._getOutcomeIndex(currentOutcome, this._outcomes);

			if (index > 0) {
				const href = this._getSelfHref(this._outcomes[index - 1]);
				const node = this.root.querySelector(`d2l-outcomes-tree-node[href="${href}"]`);
				if (node) {
					node.focusLastVisible();
				}
			}
		}
	}

	_getEmptyMessage(instructor, outcomeTerm) {
		const langTerm = instructor ? 'noOutcomesInstructor' : 'noOutcomesStudent';
		return this.localize(langTerm, 'outcome', outcomeTerm);
	}

	_getFirstChildNode() {
		const children = this.root.querySelectorAll('d2l-outcomes-tree-node');
		if (children && children.length) {
			return children[0];
		}
	}

	_getLastChildNode() {
		const children = this.root.querySelectorAll('d2l-outcomes-tree-node');
		if (children && children.length) {
			return children[children.length - 1];
		}
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

	_getOutcomeIndex(outcomeHref, outcomes) {
		for (let i = 0; i < outcomes.length; i++) {
			if (this._getSelfHref(outcomes[i]) === outcomeHref) {
				return i;
			}
		}

		return -1;
	}

	_getSelfHref(entity) {
		if (entity) {
			return entity.getLinkByRel('self').href;
		}
		return null;
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

	_onFocus(e) {
		if (this._isHierarchy && !this._isEmpty(this._outcomes)) {
			this._consumeEvent(e);
			this.addEventListener('keydown', this._onKeyPress);

			if (this._focusedNode) {
				this._focusedNode.focusSelf();
			} else {
				const firstChild = this._getFirstChildNode();
				firstChild.focusSelf();
			}
		}
	}

	_onBlur(e) {
		if (this._isHierarchy && !this._isEmpty(this._outcomes)) {
			this._consumeEvent(e);
			this.removeEventListener('keydown', this._onKeyPress);
		}
	}

	_onKeyPress(e) {
		let trapped = true;

		if (this._isHierarchy && !this._isEmpty(this._outcomes)) {
			if (e.key === 'Home') {
				this._getFirstChildNode().focusSelf();
			} else if (e.key === 'End') {
				this._getLastChildNode().focusLastVisible();
			} else {
				trapped = false;
			}
		}

		if (trapped) {
			this._consumeEvent(e);
		}
	}
}

customElements.define(OutcomesList.is, OutcomesList);
