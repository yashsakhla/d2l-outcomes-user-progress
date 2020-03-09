import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-collapse/iron-collapse.js'
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

				#node-data {
					border: 2px solid transparent;
					border-radius: 8px;
					display: flex;
					outline: none;
					padding: 0 4px;
				}

				#node-data:focus:not(.leaf-node) {
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

				#node-data.leaf-node #content {
					margin-left: 48px;
				}

				#node-data:not(.leaf-node) .sub-text,
				.sub-text:empty {
					display: none;
				}

				:not([aria-busy]) #content:hover {
					cursor: pointer;
				}

				#node-data.leaf-node:focus:not([aria-busy]) .main-text,
				#node-data.leaf-node:not([aria-busy]) #content:hover .main-text {
					color: blue;
					color: var(--d2l-color-celestine-minus-1);
					text-decoration: underline;
				}

				#button-icon {
					display: flex;
					padding-top: 18px;
					align-items: center;
				}

				.button-icon-h2 {
					height: var(--d2l-heading-2_-_line-height);
				}

				.button-icon-h3 {
					height: var(--d2l-heading-3_-_line-height);
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

				#children-collapse {
					--iron-collapse-transition-duration: 200ms;
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
			<div 
				id="container"
				role="treeitem"
				aria-busy$="[[!_outcomeEntity]]"
				aria-expanded$="[[!_collapsed]]"
				aria-selected$="[[_a11yHasFocus]]"
			>
				<div id="node-data" class$="[[_getNodeClass(_children)]] d2l-typography" tabindex="-1" aria-labelledby="content">
					<template is="dom-if" if="[[!_isEmpty(_children)]]">
						<div id="button-icon" class$="[[_getButtonClass(hasParent)]]">
							<d2l-button-icon
								class="button-toggle-collapse"
								icon="[[_getCollapseIcon(_collapsed)]]"
								on-click="_onItemClicked"
								tabindex="-1"
							></d2l-button-icon>
						</div>
					</template>
					<div id="content" on-click="_onItemClicked">
						<div id="primary">
							<template is="dom-if" if="[[_outcomeEntity]]">
								<div class="main-text">
									<template is="dom-if" if="[[!_isEmpty(_children)]]">
										<template is="dom-if" if="[[!hasParent]]">
											<h2 class="d2l-heading-2">[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</h2>
										</template>
										<template is="dom-if" if="[[hasParent]]">
											<h3 class="d2l-heading-3">[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</h3>
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
					<div id="children" role="group">
						<iron-collapse opened$=[[!_collapsed]] id="children-collapse">
							<template is="dom-repeat" items="[[_children]]">
								<d2l-outcomes-tree-node
									href="[[_getSelfHref(item)]]"
									token="[[token]]"
									has-parent=""
									role="treeitem"
									tabindex="-1"
								></d2l-outcomes-tree-node>
							</template>
						</iron-collapse>
					</div>
				</template>
			</div>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			_a11yHasFocus: {
				type: Boolean,
				value: false
			},
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
				type: Boolean,
				value: false
			},
			_outcomeEntity: {
				type: Object,
				value: null
			},
			_outcomeHref: {
				type: String,
				computed: '_getOutcomeHref(entity)'
			},
			_programmaticFocus: {
				// Hacky way to prevent focusing from click events (click triggered after focus)
				type: Boolean,
				value: false
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

		const nodeData = this.$$('#node-data');
		nodeData.addEventListener('focus', this._onFocus.bind(this));
		nodeData.addEventListener('blur', this._onBlur.bind(this));

		this.addEventListener('focus-parent', (e) => {
			// Ignore element's own events
			if (e.detail.origin !== this) {
				this._consumeEvent(e);
				this.focusSelf();
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
			this.focusSelf();
		});
		this.addEventListener('blur', () => nodeData.blur());
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
		const nodeData = this.$$('#node-data');
		if (nodeData) {
			this._programmaticFocus = true;
			nodeData.focus();
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

	_getButtonClass(hasParent) {
		return !hasParent ? 'button-icon-h2' : 'button-icon-h3';
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

	_getNodeClass(children) {
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

		if (this._programmaticFocus) {
			this._a11yHasFocus = true;
			this.addEventListener('keydown', this._onKeyPress);
			this.dispatchEvent(new CustomEvent('node-focused', { bubbles: true, composed: true, detail: { node: this }}));
		} else {
			const nodeData = this.$$('#node-data');
			nodeData.blur();
		}

		this._programmaticFocus = false;
	}

	_onBlur(e) {
		this._a11yHasFocus = false;
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
