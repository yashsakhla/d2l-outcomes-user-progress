import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior';
import 'siren-entity/siren-entity.js';
import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-typography/d2l-typography.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import OutcomeParserBehaviour from 'd2l-activity-alignments/d2l-outcome-parser-behavior.js';
import * as hmConsts from 'd2l-hypermedia-constants';
import { oupConsts } from '../consts';
import '../mini-trend/mini-trend';

export class OutcomesTreeNode extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		OutcomeParserBehaviour
	],
	PolymerElement
) {
	static get is() { return 'd2l-outcomes-tree-node'; }

	static get template() {
		const template = html`
			<style include="d2l-typography">
				:host {
					outline: none;
				}

				#container {
					align-items: center;
					border: 2px solid transparent;
					border-radius: 8px;
					display: flex;
					outline: none;
					padding: 0 4px;
				}

				#container:focus {
					border-color: var(--d2l-color-celestine);
					background-color: var(--d2l-color-celestine-plus-2);
					box-shadow: inset 0 0 0 2px white;
				}

				#content {
					align-items: center;
					border-bottom: 1px solid var(--d2l-color-mica);
					display: flex;
					flex-grow: 1;
					padding: 18px 0px;
				}

				#container.leaf-node #content {
					margin-left: 48px;
				}

				#container:not(.leaf-node) .sub-text,
				.sub-text:empty {
					display: none;
				}

				:not([aria-busy]) #content:hover {
					cursor: pointer;
				}

				#container.leaf-node:not([aria-busy]) #content:hover .main-text {
					color: blue;
					color: var(--d2l-color-celestine-minus-1);
					text-decoration: underline;
				}

				.button-toggle-collapse {
					margin-right: 6px;
				}

				#primary {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					justify-content: center;
				}

				#primary .main-text {
					@apply --d2l-body-text;
				}

				#primary .main-text h2,
				#primary .main-text h3 {
					margin: 0px;
				}

				#primary .sub-text {
					@apply --d2l-body-small-text;
					margin-top: 6px;
					width: 100%;
				}

				#secondary {
					display: flex;
					flex-shrink: 0;
					justify-content: flex-end;
					margin-left: 24px;
					min-width: 84px;
				}

				#children {
					margin-left: 36px;
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
			<div id="container" class$="[[_getContainerClass(_children)]]" tabindex="-1" on-click="[[_consumeEvent]]" role="listitem" aria-busy$="[[!_outcomeEntity]]">
				<template is="dom-if" if="[[!_isEmpty(_children)]]">
					<d2l-button-icon
						class="button-toggle-collapse"
						icon="[[_getCollapseIcon(_collapsed)]]"
						on-click="_onItemClicked"
						tabindex="-1"
					></d2l-button-icon>
				</template>
				<div id="content" on-click="_onItemClicked">
					<div id="primary">
						<template is="dom-if" if="[[_outcomeEntity]]">
							<div class="main-text">
								<template is="dom-if" if="[[!_isEmpty(_children)]]">
									<template is="dom-if" if="[[!hasParent]]">
										<h2>[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</h2>
									</template>
									<template is="dom-if" if="[[hasParent]]">
										<h3>[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</h3>
									</template>
								</template>
								<template is="dom-if" if="[[_isEmpty(_children)]]">
									[[getOutcomeDescriptionPlainText(_outcomeEntity)]]
								</template>
							</div>
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
					<div id="secondary" hidden$="[[!_activitiesHref]]">
						<d2l-mini-trend
							hidden$="[[!_outcomeEntity]]"
							href="[[_activitiesHref]]"
							token="[[token]]"
						></d2l-mini-trend>
					</div>
				</div>
			</div>
			<template is="dom-if" if="[[!_isEmpty(_children)]]">
				<div id="children" hidden$="[[_collapsed]]">
					<template is="dom-repeat" items="[[_children]]">
						<d2l-outcomes-tree-node
							href="[[_getSelfHref(item)]]"
							token="[[token]]"
							parent="[[_self]]"
							tabindex="-1"
						></d2l-outcomes-tree-node>
					</template>
				</div>
			</template>
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
			_children: {
				type: Array,
				computed: '_getChildren(entity)'
			},
			_collapsed: {
				type: Boolean,
				value: false
			},
			hasParent: {
				computed: '_getHasParent(parent)'
			},
			_outcomeEntity: {
				type: Object,
				value: null
			},
			_outcomeHref: {
				type: String,
				computed: '_getOutcomeHref(entity)'
			},
			parent: {
				type: Object,
				value: null
			},
			_self: {
				computed: '_getSelf()'
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

	ready() {
		super.ready();

		// Prepare function ref so it can be bound/unbound
		this._onKeyPress = this._onKeyPress.bind(this);

		const container = this.$$('#container');
		container.addEventListener('focus', this._onFocus.bind(this));
		container.addEventListener('blur', this._onBlur.bind(this));

		this.addEventListener('focus-parent', (e) => {
			// Ignore element's own events
			if (e.detail.origin !== this) {
				this._consumeEvent(e);
				container.focus();
			}
		});

		this.addEventListener('focus-next-child', (e) => {
			// Ignore element's own events
			if (e.detail.origin !== this) {
				this._consumeEvent(e);
				this._focusNextChild(e.detail.outcomeId);
			}
		});

		this.addEventListener('focus-prev-child', (e) => {
			// Ignore element's own events
			if (e.detail.origin !== this) {
				this._consumeEvent(e);
				this._focusPrevChild(e.detail.outcomeId);
			}
		});

		this.addEventListener('focus', () => {
			container.focus();
		});
		this.addEventListener('blur', () => container.blur());
	}

	_consumeEvent(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	_fireOutcomeActionEvent(href) {
		this.dispatchEvent(new CustomEvent(oupConsts.events.outcomeListItemClicked, { composed: true, bubbles: true, detail: { href: href } }));
	}

	focusLastVisible() {
		if (this._collapsed || this._isEmpty(this._children)) {
			this.focusSelf();
		} else {
			const node = this._getLastChildNode();
			node.focusLastVisible();
		}
	}

	_focusIn() {
		if (!this._isEmpty(this._children)) {
			if (this._collapsed) {
				this._toggleCollapse();
			} else {
				const firstChild = this._getFirstChildNode();
				firstChild.focusSelf();
			}
		}
	}

	_focusNext() {
		const eventData = {
			origin: this,
			outcomeId: this._selfHref
		};

		this.dispatchEvent(new CustomEvent('focus-next-child', { bubbles: true, composed: true, detail: eventData }));
	}

	_focusNextChild(currentOutcome) {
		if (!this._isEmpty(this._children)) {
			const index = this._getOutcomeIndex(currentOutcome, this._children);

			if (index >= 0 && index < this._children.length - 1) {
				const href = this._getSelfHref(this._children[index + 1]);
				const node = this.root.querySelector(`d2l-outcomes-tree-node[href="${href}"]`);
				if (node) {
					node.focusSelf();
				}
			} else {
				this._focusNext();
			}
		}
	}

	_focusOut() {
		if (!this._isEmpty(this._children) && !this._collapsed) {
			this._toggleCollapse();
		} else if (this.hasParent) {
			this._focusParent();
		}
	}

	_focusParent() {
		if (this.hasParent) {
			const eventData = {
				origin: this
			};

			this.dispatchEvent(new CustomEvent('focus-parent', { bubbles: true, composed: true, detail: eventData }));
		}
	}

	_focusPrev() {
		const eventData = {
			origin: this,
			outcomeId: this._selfHref
		};

		this.dispatchEvent(new CustomEvent('focus-prev-child', { bubbles: true, composed: true, detail: eventData }));
	}

	_focusPrevChild(currentOutcome) {
		if (!this._isEmpty(this._children)) {
			const index = this._getOutcomeIndex(currentOutcome, this._children);

			if (index > 0) {
				const href = this._getSelfHref(this._children[index - 1]);
				const node = this.root.querySelector(`d2l-outcomes-tree-node[href="${href}"]`);
				if (node) {
					node.focusLastVisible();
				}
			} else {
				this.focusSelf();
			}
		}
	}

	focusSelf() {
		const container = this.$$('#container');
		if (container) {
			container.focus();
		}
	}

	_getActivitiesHref(entity) {
		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomeTreeNode)) {
			const activitiesLink = entity.getLinkByRel(hmConsts.Rels.UserProgress.outcomeActivities);
			if (activitiesLink) {
				return activitiesLink.href;
			}
		}
		return null;
	}

	_getChildren(entity) {
		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomeTreeNode)) {
			const subEntities = entity.getSubEntitiesByClass(hmConsts.Classes.userProgress.outcomes.outcomeTreeNode);
			if (subEntities && subEntities.length) {
				return subEntities;
			}
		}

		return [];
	}

	_getCollapseIcon(collapsed) {
		return `d2l-tier1:arrow-${collapsed ? 'expand' : 'collapse'}`;
	}

	_getContainerClass(children) {
		const classes = [];

		if (children && this._isEmpty(children)) {
			classes.push('leaf-node');
		}

		return classes.join(';');
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

	_getHasParent(parent) {
		return parent !== null;
	}

	_getOutcomeHref(entity) {
		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomeTreeNode)) {
			return entity.getLinkByRel(hmConsts.Rels.Outcomes.outcome).href;
		}
		return null;
	}

	_getOutcomeIndex(outcomeHref, children) {
		for (let i = 0; i < children.length; i++) {
			if (this._getSelfHref(children[i]) === outcomeHref) {
				return i;
			}
		}

		return -1;
	}

	_getSelf() {
		return this;
	}

	_getSelfHref(entity) {
		if (entity) {
			return entity.getLinkByRel('self').href;
		}
		return null;
	}

	_isEmpty(children) {
		return !children || children.length === 0;
	}

	_onItemClicked(e) {
		this._consumeEvent(e);
		this._triggerNodeAction();
	}

	_onKeyPress(e) {
		let trapped = true;

		if (e.key === 'ArrowUp') {
			this._focusPrev();
		} else if (e.key === 'ArrowRight') {
			this._focusIn();
		} else if (e.key === 'ArrowDown') {
			if (!this._isEmpty(this._children) && !this._collapsed) {
				this._focusIn();
			} else {
				this._focusNext();
			}
		} else if (e.key === 'ArrowLeft') {
			this._focusOut();
		} else if (e.key === 'Enter') {
			this._triggerNodeAction();
		} else {
			trapped = false;
		}

		if (trapped) {
			this._consumeEvent(e);
		}
	}

	_onFocus(e) {
		this._consumeEvent(e);
		this.addEventListener('keydown', this._onKeyPress);

		this.dispatchEvent(new CustomEvent('node-focused', { bubbles: true, composed: true, detail: { node: this }}));
	}

	_onBlur(e) {
		this._consumeEvent(e);
		this.removeEventListener('keydown', this._onKeyPress);
	}

	_toggleCollapse() {
		this._collapsed = !this._collapsed;
	}

	_triggerNodeAction() {
		if (this._outcomeEntity) {
			if (this._isEmpty(this._children)) {
				this._fireOutcomeActionEvent(this._selfHref);
			} else {
				this._toggleCollapse();
			}
		}
	}
}

customElements.define(OutcomesTreeNode.is, OutcomesTreeNode);
