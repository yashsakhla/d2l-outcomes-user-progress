import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/inputs/input-search';
import '@brightspace-ui/core/components/offscreen/offscreen.js';
import './outcomes-tree-node';
import './outcomes-list-item';
import './partial-bold';
import { css, html, LitElement } from 'lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { IronA11yAnnouncer } from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import { LocalizeMixin } from '../LocalizeMixin';
import { UserProgressOutcomeCollectionEntity } from '../entities/UserProgressOutcomeCollectionEntity';

const DEFAULT_SKELETON_COUNT = 10;

function escapeRegex(unsafeText) {
	return unsafeText.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

export class OutcomesList extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			instructor: { type: Boolean },
			outcomeTerm: { attribute: 'outcome-term', type: String },
			tabIndex: { attribute: 'tab-index', type: Number },
			_focusedNode: { attribute: false },
			_isHierarchy: { attribute: false },
			_isList: { attribute: false },
			_isLoaded: { attribute: false },
			_loadedChildren: { attribute: false },
			_outcomes: { attribute: false },
			_searchMatches: { attribute: false },
			_searchPerformed: { attribute: false },
			_searchTerm: { attribute: false }
		};
	}

	static get styles() {
		return [
			css`
				#container {
					outline: none;
				}

				.no-items {
					background-color: var(--d2l-color-regolith);
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 8px;
					box-sizing: border-box;
					color: var(--d2l-color-ferrite);
					padding: 15px;
					width: 100%;
				}

				#search-container {
					align-items: flex-start;
					display: flex;
					flex-direction: column;
					margin-bottom: 20px;
				}

				#hierarchy-search {
					width: 300px;
				}

				#search-results {
					margin-top: 16px;
				}
			`
		];
	}

	constructor() {
		super();

		this._setEntityType(UserProgressOutcomeCollectionEntity);
		this.instructor = false;
		this.tabIndex = 0;
		this._focusedNode = null;
		this._isLoaded = false;
		this._loadedChildren = 0;
		this._outcomes = [];
		this._searchMatches = 0;
		this._searchPerformed = false;
		this._searchTerm = '';

		this._childFilterMap = {};
		this._childrenSearchStatus = {};
		this._searchComplete = true;

		this.addEventListener('search-status-updated', this._onSearchStatusUpdated.bind(this));

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

	static get is() { return 'd2l-outcomes-list'; }

	connectedCallback() {
		super.connectedCallback();

		IronA11yAnnouncer.requestAvailability();
		IronA11yAnnouncer.mode = 'assertive';
	}

	render() {
		const shouldShowSearch = this._isHierarchy;

		return html`
			${shouldShowSearch ? this._renderSearch() : null}
			<d2l-offscreen id="screen-reader-description">${this._getAriaDescription(this.outcomeTerm, this._isLoaded, this._isHierarchy)}</d2l-offscreen>
			<div aria-describedby="screen-reader-description" role="application">
				<div
					id="container"
					role=${this._isHierarchy ? 'tree' : 'list'}
					tabindex=${this.tabIndex}
					aria-live="off"
					@focus=${this._onFocus}
					@keydown=${this._onKeyPress}
				>
					${super._entity ? this._renderOutcomes() : this._renderSkeleton()}
				</div>
            </div>
        `;
	}

	shouldUpdate(changedProps) {
		// The parent function needs to be called even when its result won't be used
		// to ensure that entity gets fetched on initial set of href/token
		const parentOpinion = super.shouldUpdate(changedProps);

		if (!this.rendered) {
			// Force at least 1 render even with no href/token to load skeleton
			this.rendered = true;
			return true;
		}
		return parentOpinion;
	}

	get _hasChildren() {
		return !!(this._outcomes && this._outcomes.length);
	}

	get _isSearching() {
		return this._searchTerm !== '';
	}

	get _searchResultsFound() {
		return this._searchMatches > 0;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onEntityChanged(entity);
			super._entity = entity;
		}
	}

	_announceSearchResults() {
		const message = this._getSearchResultMessage();
		if (message) {
			const event = new CustomEvent('iron-announce', {
				bubbles: true,
				composed: true,
				detail: { text: message }
			});
			this.dispatchEvent(event);
		}
	}

	_consumeEvent(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	_focusNextChild(currentOutcome) {
		if (this._hasChildren) {
			const index = this._getOutcomeIndex(currentOutcome, this._outcomes);

			if (index >= 0 && index < this._outcomes.length - 1) {
				const href = this._outcomes[index + 1].self();
				const node = this.renderRoot.querySelector(`d2l-outcomes-tree-node[href="${href}"]`);
				if (node) {
					node.focusSelf();
				}
			}
		}
	}

	_focusPrevChild(currentOutcome) {
		if (this._hasChildren) {
			const index = this._getOutcomeIndex(currentOutcome, this._outcomes);

			if (index > 0) {
				const href = this._outcomes[index - 1].self();
				const node = this.renderRoot.querySelector(`d2l-outcomes-tree-node[href="${href}"]`);
				if (node) {
					node.focusLastVisible();
				}
			}
		}
	}

	_getAriaDescription(outcomeTerm, isLoaded, isHierarchy) {
		const textArray = [];
		textArray.push(this.localize('outcomesListDescription', 'outcome', outcomeTerm));
		if (!isLoaded && isHierarchy) textArray.push(this.localize('outcomesListLoading'));
		return textArray.join(', ');
	}

	_getFirstChildNode() {
		let firstHref = null;

		for (let i = 0; i < this._outcomes.length; i++) {
			const href = this._outcomes[i].self();
			if (!this._childFilterMap[href]) {
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

		for (let i = this._outcomes.length - 1; i >= 0; i--) {
			const href = this._outcomes[i].self();
			if (!this._childFilterMap[href]) {
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

	_getOutcomeIndex(outcomeHref, outcomes) {
		for (let i = 0; i < outcomes.length; i++) {
			if (outcomes[i].self() === outcomeHref) {
				return i;
			}
		}

		return -1;
	}

	_getSearchResultMessage() {
		if (!this._isSearching) {
			if (this._searchPerformed) {
				// Only say cleared if searched before
				return this.localize('searchCleared');
			}

			return;
		}

		if (this._searchResultsFound) {
			return this.localize('numSearchResults', 'numResults', this._searchMatches, 'searchTerm', this._searchTerm);
		}

		return this.localize('noSearchResults', 'searchTerm', this._searchTerm);
	}

	_onChildLoaded() {
		this._loadedChildren++;
		if (this._loadedChildren === this._outcomes.length) {
			this.updateComplete.then(() => {
				const event = new CustomEvent('iron-announce', {
					bubbles: true,
					composed: true,
					detail: { text: this.localize('outcomesListLoadingComplete') }
				});
				this.dispatchEvent(event);
				this._isLoaded = true;
			});
		}
	}

	_onEntityChanged(entity) {
		if (entity) {
			const outcomes = [];
			entity.onUserProgressOutcomeChanged(outcomes.push.bind(outcomes));

			entity.subEntitiesLoaded().then(() => {
				this._isHierarchy = entity.isHierarchy();
				this._outcomes = outcomes.sort((l, r) => l.index - r.index);
			});
		}
	}

	_onFocus(e) {
		if (this._isHierarchy && this._hasChildren) {
			this._consumeEvent(e);

			if (this._focusedNode) {
				this._focusedNode.focusSelf();
			} else {
				const firstChild = this._getFirstChildNode();
				if (firstChild) {
					firstChild.focusSelf();
				}
			}
		}
	}

	_onInputSearched(e) {
		const searchTerm = e.detail.value;
		if (searchTerm !== '') {
			this._searchPerformed = true;
		}

		this._onSearchStart();
		this._searchTerm = searchTerm.trim();
	}

	_onKeyPress(e) {
		if (this._isHierarchy && this._hasChildren) {
			let trapped = true;

			if (e.key === 'Home') {
				this._getFirstChildNode().focusSelf();
			} else if (e.key === 'End') {
				this._getLastChildNode().focusLastVisible();
			} else {
				trapped = false;
			}

			if (trapped) {
				this._consumeEvent(e);
			}
		}
	}

	_onSearchStart() {
		const rootElements = {};
		this._outcomes.forEach(outcome => rootElements[outcome.self()] = { complete: false });
		this._childrenSearchStatus = rootElements;
		this._childFilterMap = {};
		this._searchComplete = false;
	}

	_onSearchStatusUpdated(e) {
		e && this._consumeEvent(e);

		if (!e || !e.detail || !e.detail.href || this._searchComplete) {
			return;
		}

		const href = e.detail.href;
		this._childrenSearchStatus[href] = e.detail;

		const statuses = Object.values(this._childrenSearchStatus);
		if (statuses.every(st => st.complete)) {
			this._childFilterMap = statuses.reduce((acc, cur) => {
				acc[cur.href] = !cur.visible;
				return acc;
			}, {});
			this._searchMatches = statuses.filter(st => st.isLeaf && st.visible).length;
			this._searchComplete = true;
			this._announceSearchResults();
		}
	}

	_renderOutcomes() {
		const treeNode = (outcome, index) => html`
			<d2l-outcomes-tree-node
				href=${outcome.self()}
				token=${this.token}
				tabindex="-1"
				@load=${this._onChildLoaded}
				aria-level="1"
				aria-posinset=${index + 1}
				aria-setsize=${this._outcomes.length}
				search-term=${this._searchTerm}
			></d2l-outcomes-tree-node>
		`;

		const listItem = (outcome) => html`
			<d2l-outcomes-list-item
				href=${outcome.self()}
				token=${this.token}
			></d2l-outcomes-list-item>
		`;

		return html`
			<div class="no-items" ?hidden=${this._outcomes.length !== 0}>
				${this.localize(this.instructor ? 'noOutcomesInstructor' : 'noOutcomesStudent', 'outcome', this.outcomeTerm)}
			</div>
			${this._outcomes.map((outcome, index) => (this._isHierarchy ? treeNode(outcome, index) : listItem(outcome)))}
		`;
	}

	_renderSearch() {
		const searchBoldRegex = `@(${escapeRegex(this._searchTerm)})@`;

		const searchResultsMsg = this._searchResultsFound
			? this.localize('numSearchResults', 'numResults', this._searchMatches, 'searchTerm', `@${this._searchTerm}@`)
			: this.localize('noSearchResults', 'searchTerm', `@${this._searchTerm}@`);

		return html`
			<div id="search-container" aria-live="off">
				<d2l-input-search
					id="hierarchy-search"
					label=${this.localize('searchLabel')}
					placeholder=${this.localize('searchHint')}
					@d2l-input-search-searched=${this._onInputSearched}
				></d2l-input-search>
				${this._isSearching ? html`
					<div id="search-results">
						<partial-bold
							bold-regex=${searchBoldRegex}
							content=${searchResultsMsg}
						></partial-bold>
					</div>
				` : null}
			</div>
		`;
	}

	_renderSkeleton() {
		return [...Array(DEFAULT_SKELETON_COUNT)]
			.map(() => html`<d2l-outcomes-list-item></d2l-outcomes-list-item>`);
	}

}

customElements.define(OutcomesList.is, OutcomesList);
