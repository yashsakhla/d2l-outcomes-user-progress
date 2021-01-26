import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-collapse/iron-collapse.js';
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
import 'd2l-outcomes-overall-achievement/src/trend/mini-trend';
import './partial-bold';
import '../localize-behavior';

function escapeRegex(unsafeText) {
	return unsafeText.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

export class OutcomesTreeNode extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior,
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

				.screen-reader {
                    height: 1px;
                    left: -99999px;
                    overflow: hidden;
                    position: absolute;
                    width: 1px;
                }
			</style>
			<siren-entity href="[[_outcomeHref]]" token="[[token]]" entity="{{_outcomeEntity}}"></siren-entity>
			<div 
				id="container"
				hidden$="[[_isFiltered]]"
				role="treeitem"
				aria-busy$="[[!_outcomeEntity]]"
				aria-expanded$="[[_getAriaExpanded(_collapsed)]]"
				aria-selected$="[[_a11yHasFocus]]"
			>
				<div id="node-data" class$="[[_getNodeClass(_isLeafNode)]]" tabindex="-1" aria-labelledby="content">
					<template is="dom-if" if="[[!_isLeafNode]]">
						<div id="button-icon" class$="[[_getButtonClass(hasParent)]]">
							<d2l-button-icon
								class="button-toggle-collapse"
								icon="[[_getCollapseIcon(_collapsed)]]"
								on-mousedown="_onButtonMousedown"
								on-click="_onItemClicked"
								tabindex="-1"
							></d2l-button-icon>
						</div>
					</template>
					<div id="content" on-click="_onItemClicked">
						<div id="aria-content-prefix" class="screen-reader">
							[[_getNodeAriaTextPrefix(ariaLevel, _outcomeEntity, _collapsed, _isLeafNode)]]
						</div>
						<div id="primary">
							<template is="dom-if" if="[[_outcomeEntity]]">
								<div class="main-text">
									<template is="dom-if" if="[[!_isLeafNode]]">
										<template is="dom-if" if="[[!hasParent]]">
											<h2 class="d2l-heading-2">[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</h2>
										</template>
										<template is="dom-if" if="[[hasParent]]">
											<h3 class="d2l-heading-3">[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</h3>
										</template>
									</template>
									<template is="dom-if" if="[[_isLeafNode]]">
										<partial-bold content="[[getOutcomeDescriptionPlainText(_outcomeEntity)]]" bold-regex="[[_boldRegex]]"></partial-bold>
									</template>
								</div>
								<div class="sub-text">
									<template is="dom-if" if="[[_isLeafNode]]">
										<partial-bold content="[[getOutcomeIdentifier(_outcomeEntity)]]" bold-regex="[[_boldRegex]]"></partial-bold>
									</template>
									<template is="dom-if" if="[[!_isLeafNode]]">
										[[getOutcomeIdentifier(_outcomeEntity)]]
									</template>
								</div>
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
							<d2l-coa-mini-trend
								href="[[_activitiesHref]]"
								token="[[token]]"
							></d2l-coa-mini-trend>
						</div>
						<div id="aria-content-suffix" class="screen-reader">
							[[_getNodeAriaTextSuffix(ariaPosinset, ariaSetsize)]]
						</div>
					</div>
				</div>
				<template is="dom-if" if="[[!_isLeafNode]]">
					<div id="children" role="group">
						<iron-collapse opened$=[[!_collapsed]] id="children-collapse">
							<template is="dom-repeat" items="[[_children]]">
								<d2l-outcomes-tree-node
									href="[[_getSelfHref(item)]]"
									token="[[token]]"
									has-parent=""
									role="treeitem"
									tabindex="-1"
									on-load="_onChildLoaded"
									aria-level$="[[_increment(ariaLevel)]]"
									aria-posinset$="[[_increment(index)]]"
									aria-setsize$="[[_getCount(_children)]]"
									search-term="[[searchTerm]]"
									parent-filter-map="{{_childFilterMap}}"
									visibility-mapping="{{visibilityMapping}}"
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
			ariaLevel: {
				type: Number
			},
			ariaPosinset: {
				type: Number
			},
			ariaSetsize: {
				type: Number
			},
			_boldRegex: {
				computed: '_getBoldRegex(searchTerm)'
			},
			_children: {
				type: Array,
				computed: '_getChildren(entity)'
			},
			_childFilterMap: {
				type: Object
			},
			_collapsed: {
				type: Boolean,
				value: false
			},
			_isFiltered: {
				computed: '_filterNode(_outcomeEntity, searchTerm, _children, _childFilterMap)'
			},
			_isLeafNode: {
				computed: '_getIsLeafNode(_children)'
			},
			hasParent: {
				type: Boolean,
				value: false
			},
			_loadedChildren: {
				type: Number,
				value: 0
			},
			_outcomeEntity: {
				type: Object,
				value: null
			},
			_outcomeEntityLoaded: {
				type: Object,
				value: false
			},
			_outcomeHref: {
				type: String,
				computed: '_getOutcomeHref(entity)'
			},
			parentFilterMap: {
				type: Object,
				notify: true
			},
			_programmaticFocus: {
				// Hacky way to prevent focusing from click events (click triggered after focus)
				type: Boolean,
				value: false
			},
			searchTerm: {
				type: String,
				value: ''
			},
			_selfHref: {
				type: String,
				computed: '_getSelfHref(entity)'
			},
			visibilityMapping: {
				type: Object,
				notify: true
			}
		};
	}

	static get observers() {
		return [
			'_onEntityChanged(entity)',
			'_reportFilterStatus(_outcomeEntity, _selfHref, _isFiltered, _isLeafNode, parentFilterMap, visibilityMapping)',
			'_onOutcomeEntityChanged(_outcomeEntity)'
		];
	}

	ready() {
		super.ready();

		this._childFilterMap = {};

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

	_onOutcomeEntityChanged(outcomeEntity) {
		if (outcomeEntity && !this._outcomeEntityLoaded) {
			this._outcomeEntityLoaded = true;
			if (this._isLeafNode || (!this._isLeafNode && this._loadedChildren === this._children.length)) {
				this.dispatchEvent(new CustomEvent('load'));
			}
		}
	}

	_consumeEvent(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	_filterNode(outcomeEntity, searchTerm, children, childFilterMap) {
		if (!outcomeEntity) {
			// Not finished loading, don't filter
			return false;
		}

		if (searchTerm && searchTerm !== '') {
			if (this._getIsLeafNode(children)) {
				// Search outcome content if leaf node
				const searchFound = this._matchesSearch(outcomeEntity, searchTerm);
				return !searchFound;
			} else {
				// Array of statuses reported by children
				const childrenStatus = childFilterMap ? Object.values(childFilterMap) : [];

				if (childrenStatus.length !== children.length) {
					// Not all children have reported filter status yet
					return false;
				}

				const childIsVisible = childrenStatus.some(x => !x);
				this.debounce(`${this.href}-search-collapse`, () => {
					if (!this._isFiltered) this._collapsed = false;
				}, 10);

				// Show if at least one child is visible
				return !childIsVisible;
			}
		}

		return false;
	}

	_fireOutcomeActionEvent(href) {
		this.dispatchEvent(new CustomEvent(oupConsts.events.outcomeListItemClicked, { composed: true, bubbles: true, detail: { href: href } }));
	}

	focusLastVisible() {
		if (this._collapsed || this._isLeafNode) {
			this.focusSelf();
		} else {
			const node = this._getLastChildNode();
			node.focusLastVisible();
		}
	}

	_focusIn() {
		if (!this._isLeafNode) {
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
		if (!this._isLeafNode) {
			const index = this._getOutcomeIndex(currentOutcome, this._children);
			let nextHref = null;

			for (let i = index + 1; i < this._children.length; i++) {
				const href = this._getSelfHref(this._children[i]);
				if (this._childFilterMap[href] === false) {
					nextHref = href;
					break;
				}
			}

			if (nextHref !== null) {
				const node = this.root.querySelector(`d2l-outcomes-tree-node[href="${nextHref}"]`);
				if (node) {
					node.focusSelf();
				}
			} else {
				this._focusNext();
			}
		}
	}

	_focusOut() {
		if (!this._isLeafNode && !this._collapsed) {
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
		if (!this._isLeafNode) {
			const index = this._getOutcomeIndex(currentOutcome, this._children);
			let prevHref = null;

			for (let i = index - 1; i >= 0; i--) {
				const href = this._getSelfHref(this._children[i]);
				if (this._childFilterMap[href] === false) {
					prevHref = href;
					break;
				}
			}

			if (prevHref !== null) {
				const node = this.root.querySelector(`d2l-outcomes-tree-node[href="${prevHref}"]`);
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

	_getAriaExpanded(collapsed) {
		return collapsed ? 'false' : 'true';
	}

	_getBoldRegex(searchTerm) {
		const terms = searchTerm.trim().split(' ').map(escapeRegex);

		if (!terms || !terms.length) {
			return '';
		}

		return `(${terms.join('|')})`;
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
			return [];
		}

		return null;
	}

	_getCollapseIcon(collapsed) {
		return `d2l-tier1:arrow-${collapsed ? 'expand' : 'collapse'}`;
	}

	_getCount(arr) {
		return arr.length;
	}

	_getNodeAriaTextPrefix(ariaLevel, outcome, collapsed, isLeafNode) {
		const textArray = [];

		textArray.push(this.localize('nodeAriaTextLevel', 'level', ariaLevel));

		if (!outcome) {
			textArray.push(this.localize('outcomesListLoading'));
		} else if (!isLeafNode) {
			textArray.push(this.localize('nodeAriaTextGroup',
				'state', this.localize(collapsed ? 'a11yCollapsed' : 'a11yExpanded')
			));
		}

		return `${textArray.join(', ')}.`;
	}

	_getNodeAriaTextSuffix(posinset, setsize) {
		return this.localize('nodeAriaTextPosition',
			'position', posinset,
			'count', setsize
		);
	}

	_getNodeClass(isLeafNode) {
		const classes = [];

		classes.push('d2l-typography');

		if (isLeafNode) {
			classes.push('leaf-node');
		}

		return classes.join(' ');
	}

	_getFirstChildNode() {
		let firstHref = null;

		for (let i = 0; i < this._children.length; i++) {
			const href = this._getSelfHref(this._children[i]);
			if (this._childFilterMap[href] === false) {
				firstHref = href;
				break;
			}
		}

		if (firstHref === null) {
			return null;
		}

		const child = this.root.querySelector(`d2l-outcomes-tree-node[href="${firstHref}"]`);
		if (child) {
			return child;
		}
	}

	_getIsLeafNode(children) {
		return !children || children.length === 0;
	}

	_getLastChildNode() {
		let lastHref = null;

		for (let i = this._children.length - 1; i >= 0; i--) {
			const href = this._getSelfHref(this._children[i]);
			if (this._childFilterMap[href] === false) {
				lastHref = href;
				break;
			}
		}

		if (lastHref === null) {
			return null;
		}

		const child = this.root.querySelector(`d2l-outcomes-tree-node[href="${lastHref}"]`);
		if (child) {
			return child;
		}
	}

	_getOutcomeAriaText(outcome) {
		return `${this.getOutcomeDescriptionPlainText(outcome)} ${this.getOutcomeIdentifier(outcome)}`;
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

	_increment(num) {
		return num + 1;
	}

	_matchesSearch(outcomeEntity, searchTerm) {
		// Array of unique search words
		const searchTerms = [...new Set([...searchTerm.toLowerCase().split(' ')])];

		// Array of unique outcome words
		const searchableTerms = [
			...new Set([
				...this.getOutcomeDescriptionPlainText(outcomeEntity).toLowerCase().split(' '),
				...this.getOutcomeIdentifier(outcomeEntity).toLowerCase().split(' ')
			])
		];

		const termFound = searchTerms.every(searchTerm => {
			return searchableTerms.some(outcomeTerm => outcomeTerm.indexOf(searchTerm) >= 0);
		});
		return termFound;
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
			if (!this._isLeafNode && !this._collapsed) {
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

	_onButtonMousedown(e) {
		this._consumeEvent(e);
		this._programmaticFocus = false;
		const nodeData = this.$$('#node-data');
		nodeData.focus();
	}

	_onFocus(e) {
		this._consumeEvent(e);
		if (this._programmaticFocus) {
			this._a11yHasFocus = true;
			this.addEventListener('keydown', this._onKeyPress);
			this.dispatchEvent(new CustomEvent('node-focused', { bubbles: true, composed: true, detail: { node: this } }));
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

	_reportFilterStatus(outcomeEntity, selfHref, isFiltered, isLeafNode, parentFilterMap, visibilityMapping) {
		if (!outcomeEntity) {
			// Not finished loading, filter status and href can't be known
			return;
		}

		// Update parent's mapping of { child-href: filter-status }
		const status = isFiltered;

		if (parentFilterMap && parentFilterMap[selfHref] !== status) {
			parentFilterMap[selfHref] = status;

			this.set('parentFilterMap', null);
			this.set('parentFilterMap', parentFilterMap);
		}

		if (
			visibilityMapping
			&& isLeafNode
			&& (visibilityMapping[selfHref] === undefined || visibilityMapping[selfHref] === status)
		) {
			visibilityMapping[selfHref] = !status;
			this.fire('search-results-updated');
		}
	}

	_toggleCollapse() {
		this._collapsed = !this._collapsed;

		const message = this.localize(this._collapsed ? 'a11yCollapsed' : 'a11yExpanded');

		this.dispatchEvent(new CustomEvent('iron-announce', {
			bubbles: true,
			composed: true,
			detail: { text: message }
		}));
	}

	_triggerNodeAction() {
		if (this._outcomeEntity) {
			if (this._isLeafNode) {
				this._fireOutcomeActionEvent(this._selfHref);
			} else {
				this._toggleCollapse();
			}
		}
	}

	_onChildLoaded() {
		this._loadedChildren++;
		if (this._loadedChildren === this._children.length && this._outcomeEntityLoaded) {
			this.dispatchEvent(new CustomEvent('load'));
		}
	}
}

customElements.define(OutcomesTreeNode.is, OutcomesTreeNode);
