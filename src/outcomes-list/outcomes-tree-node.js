import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-outcomes-overall-achievement/src/trend/mini-trend';
import '@polymer/iron-collapse/iron-collapse.js';
import './partial-bold';
import { bodySmallStyles, bodyStandardStyles, heading2Styles, heading3Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ifDefined } from 'lit-html/directives/if-defined';
import { LocalizeMixin } from '../LocalizeMixin';
import { oupConsts } from '../consts';
import { UserProgressOutcomeTreeNodeEntity } from '../entities/UserProgressOutcomeTreeNodeEntity';

function escapeRegex(unsafeText) {
	return unsafeText.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function getBoldRegex(searchTerm) {
	const terms = searchTerm.trim().split(' ').map(escapeRegex);

	if (!terms || !terms.length) {
		return '';
	}

	return `(${terms.join('|')})`;
}

export class OutcomesTreeNode extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			ariaLevel: { attribute: 'aria-level', type: Number },
			ariaPosinset: { attribute: 'aria-posinset', type: Number },
			ariaSetsize: { attribute: 'aria-setsize', type: Number },
			hasParent: { attribute: 'has-parent', type: Boolean },
			searchTerm: { attribute: 'search-term', type: String },
			_a11yHasFocus: { attribute: false },
			_activitiesHref: { attribute: false },
			_boldRegex: { attribute: false },
			_children: { attribute: false },
			_childFilterMap: { attribute: false },
			_collapsed: { attribute: false },
			_isLeafNode: { attribute: false },
			_loadedChildren: { attribute: false },
			_outcomeEntity: { attribute: false },
			_outcomeEntityLoaded: { attribute: false },
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			bodyStandardStyles,
			heading2Styles,
			heading3Styles,
			css`
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
					background-color: var(--d2l-color-celestine-plus-2);
					border-color: var(--d2l-color-celestine);
					box-shadow: inset 0 0 0 2px white;
				}

				#content {
					align-items: center;
					border-bottom: 1px solid var(--d2l-color-mica);
					display: flex;
					flex-grow: 1;
					padding: 18px 0;
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
					align-items: center;
					display: flex;
					padding-top: 18px;
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

				#primary .main-text h2,
				#primary .main-text h3 {
					margin: 0;
				}

				#primary .sub-text {
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
			`
		];
	}

	constructor() {
		super();

		this._setEntityType(UserProgressOutcomeTreeNodeEntity);
		this.hasParent = false;
		this.searchTerm = '';
		this._activitiesHref = '';
		this._a11yHasFocus = false;
		this._childFilterMap = {};
		this._children = [];
		this._collapsed = false;
		this._loadedChildren = 0;
		this._outcomeEntity = null;
		this._outcomeEntityLoaded = false;

		// Hacky way to prevent focusing from click events (click triggered after focus)
		this._programmaticFocus = false;

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
		this.addEventListener('blur', () => this._nodeDataElement.blur());
	}

	static get is() { return 'd2l-outcomes-tree-node'; }

	render() {
		const boldRegex = getBoldRegex(this.searchTerm);

		const nodeClasses = [];
		if (this._isLeafNode) {
			nodeClasses.push('leaf-node');
		}

		const isFiltered = this._filterNode();
		const collapsed = this._collapsed && !isFiltered;

		this._reportFilterStatus(isFiltered);

		return html`
			<div
				id="container"
				?hidden=${isFiltered}
				role="treeitem"
				aria-busy=${!this._outcomeEntity}
				aria-expanded=${!collapsed}
				aria-selected=${this._a11yHasFocus}
			>
				<div
					id="node-data"
					class=${nodeClasses.join(' ')}
					tabindex="-1"
					aria-labelledby="content"
					@focus=${this._onFocus}
					@blur=${this._onBlur}
				>
					${!this._isLeafNode ? html`
						<div id="button-icon" class=${!this.hasParent ? 'button-icon-h2' : 'button-icon-h3'}>
							<d2l-button-icon
								class="button-toggle-collapse"
								icon="d2l-tier1:arrow-${collapsed ? 'expand' : 'collapse'}"
								@mousedown=${this._onButtonMousedown}
								@click=${this._onItemClicked}
								tabindex="-1"
							></d2l-button-icon>
						</div>
					` : null}
					<div id="content" @click=${this._onItemClicked}>
						<div id="aria-content-prefix" class="screen-reader">
							${this._getNodeAriaTextPrefix(this.ariaLevel, this._outcomeEntity, collapsed, this._isLeafNode)}
						</div>
						<div id="primary">
							${this._outcomeEntity ? html`
								<div class="main-text d2l-body-standard">
									${this._isLeafNode ? html`
										<partial-bold content=${this._outcomeEntity.getDescription()} bold-regex=${boldRegex}></partial-bold>
									` : html`
										${this.hasParent ? html`
											<h3 class="d2l-heading-3">${this._outcomeEntity.getDescription()}</h3>
										` : html`
											<h2 class="d2l-heading-2">${this._outcomeEntity.getDescription()}</h2>
										`}
									`}
								</div>
								<div class="sub-text d2l-body-small">
									${this._isLeafNode ? html`
										<partial-bold content=${this._outcomeEntity.getIdentifier()} bold-regex=${boldRegex}></partial-bold>
									` : html`
										${this._outcomeEntity.getIdentifier()}
									`}
								</div>
							` : html`
								<div class="main-text">
									<div class="skeleton"></div>
									<div class="skeleton"></div>
								</div>
								<div class="sub-text">
									<div class="skeleton"></div>
								</div>
							`}
						</div>
						<div id="secondary" ?hidden=${!this._activitiesHref}>
							<d2l-coa-mini-trend
								href=${this._activitiesHref}
								token=${this.token}
								hide-unpublished-coa
							></d2l-coa-mini-trend>
						</div>
						<div id="aria-content-suffix" class="screen-reader">
							${this._getNodeAriaTextSuffix(this.ariaPosinset, this.ariaSetsize)}
						</div>
					</div>
				</div>
				${!this._isLeafNode ? html`
					<div id="children" role="group">
						<iron-collapse ?opened=${!collapsed} id="children-collapse">
							${this._children.map((child, index) => html`
								<d2l-outcomes-tree-node
									href=${child.self()}
									token=${this.token}
									has-parent
									role="treeitem"
									tabindex="-1"
									@load=${this._onChildLoaded}
									aria-level=${this.ariaLevel + 1}
									aria-posinset=${index + 1}
									aria-setsize=${ifDefined(this._children.length || undefined)}
									search-term=${this.searchTerm}
									@update-filter-status=${this._onChildFilterStatusChanged}
								></d2l-outcomes-tree-node>
							`)}
						</iron-collapse>
					</div>
				` : null}
			</div>
		`;
	}

	focusLastVisible() {
		if (this._collapsed || this._isLeafNode) {
			this.focusSelf();
		} else {
			const node = this._getLastChildNode();
			node.focusLastVisible();
		}
	}

	focusSelf() {
		if (this._nodeDataElement) {
			this._programmaticFocus = true;
			this._nodeDataElement.focus();
		}
	}

	get _nodeDataElement() {
		return this.renderRoot.querySelector('#node-data');
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onEntityChanged(entity);
			super._entity = entity;
		}
	}

	_consumeEvent(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	_filterNode() {
		if (this.searchTerm !== this._prevSearchTerm) {
			this._childFilterMap = {};
		}
		this._prevSearchTerm = this.searchTerm;

		if (!this._outcomeEntity) {
			// Not finished loading, don't filter
			return false;
		}

		if (this.searchTerm && this.searchTerm !== '') {
			if (this._isLeafNode) {
				// Search outcome content if leaf node
				const searchFound = this._matchesSearch(this._outcomeEntity, this.searchTerm);
				this._reportSearchStatus(true, searchFound);
				return !searchFound;
			} else {
				// Array of statuses reported by children
				const childrenStatus = this._childFilterMap ? Object.values(this._childFilterMap) : [];

				if (childrenStatus.length !== this._children.length) {
					// Not all children have reported filter status yet
					this._reportSearchStatus(false);
					return false;
				}

				const childIsVisible = childrenStatus.some(x => !x);

				// Show if at least one child is visible
				this._reportSearchStatus(true, childIsVisible);
				return !childIsVisible;
			}
		} else {
			this._reportSearchStatus(true, true);
		}

		return false;
	}

	_fireOutcomeActionEvent(href) {
		this.dispatchEvent(new CustomEvent(oupConsts.events.outcomeListItemClicked, { composed: true, bubbles: true, detail: { href: href } }));
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
			outcomeId: this.href
		};

		this.dispatchEvent(new CustomEvent('focus-next-child', { bubbles: true, composed: true, detail: eventData }));
	}

	_focusNextChild(currentOutcome) {
		if (!this._isLeafNode) {
			const index = this._getOutcomeIndex(currentOutcome, this._children);
			let nextHref = null;

			for (let i = index + 1; i < this._children.length; i++) {
				const href = this._children[i].self();
				if (this._childFilterMap[href] === false) {
					nextHref = href;
					break;
				}
			}

			if (nextHref !== null) {
				const node = this.renderRoot.querySelector(`d2l-outcomes-tree-node[href="${nextHref}"]`);
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
			outcomeId: this.href
		};

		this.dispatchEvent(new CustomEvent('focus-prev-child', { bubbles: true, composed: true, detail: eventData }));
	}

	_focusPrevChild(currentOutcome) {
		if (!this._isLeafNode) {
			const index = this._getOutcomeIndex(currentOutcome, this._children);
			let prevHref = null;

			for (let i = index - 1; i >= 0; i--) {
				const href = this._children[i].self();
				if (this._childFilterMap[href] === false) {
					prevHref = href;
					break;
				}
			}

			if (prevHref !== null) {
				const node = this.renderRoot.querySelector(`d2l-outcomes-tree-node[href="${prevHref}"]`);
				if (node) {
					node.focusLastVisible();
				}
			} else {
				this.focusSelf();
			}
		}
	}

	_getFirstChildNode() {
		let firstHref = null;

		for (let i = 0; i < this._children.length; i++) {
			const href = this._children[i].self();
			if (this._childFilterMap[href] === false) {
				firstHref = href;
				break;
			}
		}

		if (firstHref === null) {
			return null;
		}

		const child = this.renderRoot.querySelector(`d2l-outcomes-tree-node[href="${firstHref}"]`);
		if (child) {
			return child;
		}
	}

	_getLastChildNode() {
		let lastHref = null;

		for (let i = this._children.length - 1; i >= 0; i--) {
			const href = this._children[i].self();
			if (this._childFilterMap[href] === false) {
				lastHref = href;
				break;
			}
		}

		if (lastHref === null) {
			return null;
		}

		const child = this.renderRoot.querySelector(`d2l-outcomes-tree-node[href="${lastHref}"]`);
		if (child) {
			return child;
		}
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

	_getOutcomeAriaText(outcome) {
		return `${this.getOutcomeDescriptionPlainText(outcome)} ${this.getOutcomeIdentifier(outcome)}`;
	}

	_getOutcomeIndex(outcomeHref, children) {
		for (let i = 0; i < children.length; i++) {
			if (children[i].self() === outcomeHref) {
				return i;
			}
		}

		return -1;
	}

	_matchesSearch(outcomeEntity, searchTerm) {
		// Array of unique search words
		const searchTerms = [...new Set([...searchTerm.toLowerCase().split(' ')])];

		// Array of unique outcome words
		const searchableTerms = [
			...new Set([
				...outcomeEntity.getDescription().toLowerCase().split(' '),
				...outcomeEntity.getIdentifier().toLowerCase().split(' ')
			])
		];

		const termFound = searchTerms.every(searchTerm => {
			return searchableTerms.some(outcomeTerm => outcomeTerm.indexOf(searchTerm) >= 0);
		});
		return termFound;
	}

	_onBlur(e) {
		this._a11yHasFocus = false;
		this._consumeEvent(e);
		this.removeEventListener('keydown', this._onKeyPress.bind(this));
	}

	_onButtonMousedown(e) {
		this._consumeEvent(e);
		this._programmaticFocus = false;
		this._nodeDataElement.focus();
	}

	_onChildFilterStatusChanged(e) {
		this._consumeEvent(e);
		if (e.detail && e.detail.href) {
			const newMap = Object.assign({}, this._childFilterMap);
			newMap[e.detail.href] = e.detail.isFiltered;
			this._childFilterMap = newMap;
		}
	}

	_onChildLoaded() {
		this._loadedChildren++;
		if (this._loadedChildren === this._children.length && this._outcomeEntityLoaded) {
			this.dispatchEvent(new CustomEvent('load'));
		}
	}

	_onEntityChanged(entity) {
		if (entity) {
			this._outcomeEntityLoaded = false;

			const activitiesHref = entity.getOutcomeActivitiesHref();

			const children = [];
			entity.onChildNodeChanged(children.push.bind(children));

			let outcomeEntity = null;
			entity.onOutcomeChanged(outcome => outcomeEntity = outcome);

			entity.subEntitiesLoaded().then(() => {
				this._activitiesHref = activitiesHref;
				this._children = children.sort((l, r) => l.index - r.index);
				this._isLeafNode = !this._children.length;
				this._outcomeEntity = outcomeEntity;

				this._outcomeEntityLoaded = true;
				if (this._isLeafNode || this._loadedChildren === this._children.length) {
					this.dispatchEvent(new CustomEvent('load'));
				}
			});
		}
	}

	_onFocus(e) {
		this._consumeEvent(e);
		if (this._programmaticFocus) {
			this._a11yHasFocus = true;
			this.addEventListener('keydown', this._onKeyPress.bind(this));
			this.dispatchEvent(new CustomEvent('node-focused', { bubbles: true, composed: true, detail: { node: this } }));
		} else {
			this._nodeDataElement.blur();
		}

		this._programmaticFocus = false;
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

	_reportFilterStatus(isFiltered) {
		if (!this._outcomeEntity) {
			// Not finished loading, filter status and href can't be known
			return;
		}

		this.dispatchEvent(new CustomEvent('update-filter-status', {
			bubbles: true,
			composed: true,
			detail: {
				href: this.href,
				isFiltered
			}
		}));
	}

	_reportSearchStatus(complete, isVisible) {
		this.dispatchEvent(new CustomEvent('search-status-updated', {
			bubbles: true,
			composed: true,
			detail: {
				complete,
				href: this.href,
				isLeaf: this._isLeafNode,
				visible: isVisible
			}
		}));
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
				this._fireOutcomeActionEvent(this.href);
			} else {
				this._toggleCollapse();
			}
		}
	}

}

customElements.define(OutcomesTreeNode.is, OutcomesTreeNode);
