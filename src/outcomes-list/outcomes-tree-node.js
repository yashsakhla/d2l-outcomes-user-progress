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
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';

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
					outline: 0px solid transparent;
				}

				#container {
					align-items: center;
					display: flex;
					border: 2px solid transparent;
					border-radius: 8px;
					padding: 0 4px;
				}

				#container.focus:not(.leaf-node) {
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

				.leaf-node #content {
					margin-left: 48px;
				}

				:not(.leaf-node) #content .sub-text,
				#content .sub-text:empty {
					display: none;
				}

				:not([aria-busy]) #content:hover {
					cursor: pointer;
				}

				.leaf-node:not([aria-busy]) #content:hover .main-text,
				.leaf-node.focus:not([aria-busy]) #content .main-text {
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
			<div 
				id="container" 
				role="treeitem" 
				aria-busy$="[[!_outcomeEntity]]"
				aria-expanded$="[[!_collapsed]]"
				aria-setsize$="[[setSize]]"
				aria-posinset$="[[index]]"
				aria-level$="[[depth]]"
				class$="[[_getContainerClass(_children, _focus)]]"
			>
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
					<template is="dom-repeat" items="[[_children]]" index-as="outcomeIndex">
						<d2l-outcomes-tree-node 
							href="[[_getSelfHref(item)]]" 
							token="[[token]]" 
							tabindex="-1" 
							has-parent="" 
							index="[[outcomeIndex]]"
							set-size="[[_children.length]]"
							depth="[[_getChildDepth(depth)]]"
							on-focus-next="_focusNextSibling" 
							on-focus-previous="_focusPreviousSibling" 
							on-focus-parent="_focusSelf" 
							on-focus-child="_onFocusChild" 
							on-blur="_onBlurChild" 
							is-last=[[_getOutcomeIsLast(outcomeIndex)]]>
						</d2l-outcomes-tree-node>
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
			_selfHref: {
				type: String,
				computed: '_getSelfHref(entity)'
			},
			_focus: {
				type: Boolean,
				value: false
			},
			index: {
				type: Number,
				value: -1
			},
			isLast: {
				type: Number,
				value: false
			},
			setSize: {
				type: Number,
				value: 0
			},
			depth: {
				type: Number,
				value: 0
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

		afterNextRender(this, function() {
			this.addEventListener('focus', this.onFocus);
			this.addEventListener('blur', this.onBlur);
		}.bind(this));
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

	_getContainerClass(children, focus) {
		const classes = [];

		if (children && this._isEmpty(children)) {
			classes.push('leaf-node');
		}

		if (focus) {
			classes.push('focus');
		}

		return classes.join(' ');
	}

	_getOutcomeIsLast(outcomeIndex) {
		return this.isLast ? outcomeIndex === this._children.length - 1 : false;
	}

	_getOutcomeHref(entity) {
		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomeTreeNode)) {
			return entity.getLinkByRel(hmConsts.Rels.Outcomes.outcome).href;
		}
		return null;
	}

	_getSelfHref(entity) {
		if (entity) {
			return entity.getLinkByRel('self').href;
		}
		return null;
	}

	_getChildDepth(depth) {
		return depth + 1;
	}

	_isEmpty(children) {
		return !children || children.length === 0;
	}

	_selectHandler() {
		if (this._isEmpty(this._children)) {
			this.dispatchEvent(new CustomEvent(oupConsts.events.outcomeListItemClicked, { composed: true, bubbles: true, detail: { href: this._selfHref } }));
		} else {
			this._toggleCollapse();
		}
	}

	_onItemClicked(e) {
		if (this._outcomeEntity) {
			e.stopPropagation();
			e.preventDefault();
			this._selectHandler();
		}
	}

	_toggleCollapse() {
		this._collapsed = !this._collapsed;
	}

	_getTreeNodeByIndex(index) {
		const href = this._children[index].getLinkByRel('self');
		return this.root.querySelector(`d2l-outcomes-tree-node[href="${href.href}"]`);
	}

	_handleKeyDown(e) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			e.stopPropagation();
			this._focusNext();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			e.stopPropagation();
			this._focusPrevious();
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			e.stopPropagation();
			if (!this._isEmpty(this._children) && !this._collapsed) {
				this._toggleCollapse();
			} else {
				this._focusParent();
			}
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			e.stopPropagation();
			if (!this._isEmpty(this._children) && this._collapsed) {
				this._toggleCollapse();
			} else {
				this._focusChild();
			}
		} else if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			this._selectHandler();
		} else if (e.key === 'Home') {
			e.preventDefault();
			e.stopPropagation();
			this._focusFirst();
		} else if (e.key === 'End') {
			e.preventDefault();
			e.stopPropagation();
			this._focusLast();
		}
	}

	onFocus(e) {
		if (e) {
			e.stopPropagation();
			const event = new CustomEvent('focus-child');
			event.node = this;
			this.dispatchEvent(event);
		}
		this._focus = true;
		this.keydownEventListener = this._handleKeyDown.bind(this);
		window.addEventListener('keydown', this.keydownEventListener);
	}

	onBlur() {
		this._focus = false;
		window.removeEventListener('keydown', this.keydownEventListener);
	}

	_focusNext() {
		if (!this._isEmpty(this._children) && !this._collapsed) {
			this._focusChild();
		} else if (!this.isLast) {
			this.onBlur();
			const event = new CustomEvent('focus-next');
			event.index = this.index;
			this.dispatchEvent(event);
		}
	}

	_focusPrevious() {
		if (this.index > 0) {
			this.onBlur();
			const event = new CustomEvent('focus-previous');
			event.index = this.index;
			this.dispatchEvent(event);
		} else {
			this._focusParent();
		}
	}

	_focusChild() {
		if (!this._isEmpty(this._children) && !this._collapsed) {
			const elem = this.root.querySelector('d2l-outcomes-tree-node');
			if (elem) {
				elem.focus();
			}
		}
	}

	_focusParent() {
		if (!this.hasParent) return;
		this.onBlur();
		const event = new CustomEvent('focus-parent');
		this.dispatchEvent(event);
	}

	focusLast() {
		if (this._isEmpty(this._children) || this._collapsed) {
			this.focus();
		} else {
			const element = this._getTreeNodeByIndex(this._children.length - 1);
			if (element) {
				element.focusLast();
			}
		}
	}

	_focusFirst() {
		this.dispatchEvent(new CustomEvent('focus-first', {composed: true, bubbles: true}));
	}

	_focusLast() {
		this.dispatchEvent(new CustomEvent('focus-last', {composed: true, bubbles: true}));
	}

	_focusNextSibling(e) {
		if (e.index < this._children.length - 1) {
			const element = e.target.nextSibling;
			if (element) {
				element.focus();
			}
		} else {
			const event = new CustomEvent('focus-next');
			event.index = this.index;
			this.dispatchEvent(event);
		}
	}

	_focusPreviousSibling(e) {
		if (e.index > 0) {
			const element = e.target.previousSibling;
			if (element) {
				element.focusLast();
			}
		}
	}

	_focusSelf() {
		this.blur();
		this.focus();
	}

	// Called when child loses focus
	_onBlurChild() {
		this.onFocus();
	}

	// Called when child gains focus
	_onFocusChild(e) {
		this.onBlur();
		const event = new CustomEvent('focus-child');
		event.node = e.node;
		this.dispatchEvent(event);
	}
}

customElements.define(OutcomesTreeNode.is, OutcomesTreeNode);
