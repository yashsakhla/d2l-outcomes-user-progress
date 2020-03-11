import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronA11yAnnouncer } from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import '@brightspace-ui/core/components/inputs/input-search';
import 'd2l-colors/d2l-colors.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior';
import 'd2l-typography/d2l-typography.js';
import * as hmConsts from 'd2l-hypermedia-constants';
import './outcomes-tree-node';
import './outcomes-list-item';
import './partial-bold';
import '../localize-behavior';

const DEFAULT_SKELETON_COUNT = 10;

function escapeRegex(unsafeText) {
	return unsafeText.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

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
			</style>
			<template is="dom-if" if="[[_isHierarchy]]">
				<div id="search-container">
					<d2l-input-search
						id="hierarchy-search"
						label$="[[localize('searchLabel')]]"
						placeholder$="[[localize('searchHint')]]"
					></d2l-input-search>
					<template is="dom-if" if="[[_isSearching]]">
						<div id="search-results">
							<template is="dom-if" if="[[_searchResultsFound]]">
								<partial-bold
									bold-regex="[[_searchBoldRegex]]"
									content="[[localize('numSearchResults', 'numResults', _searchMatches, 'searchTerm', _surroundedSearchTerm)]]"
								></partial-bold>
							</template>
							<template is="dom-if" if="[[!_searchResultsFound]]">
								<partial-bold
									bold-regex="[[_searchBoldRegex]]"
									content="[[localize('noSearchResults', 'searchTerm', _surroundedSearchTerm)]]"
								></partial-bold>
							</template>
						</div>
					</template>
				</div>
			</template>
			<div role="application">
				<div id="container" role$="[[_getAriaRole(_isHierarchy)]]" tabindex$="[[tabIndex]]">
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
									parent-filter-map="{{_childFilterMap}}"
									search-term="[[_searchTerm]]"
									visibility-mapping="{{_hierarchyVisibilityMapping}}"
								></d2l-outcomes-tree-node>
							</template>
							<template is="dom-if" if="[[_isList]]">
								<d2l-outcomes-list-item href="[[_getOutcomeHref(item)]]" token="[[token]]"></d2l-outcomes-list-item>
							</template>
						</template>
					</template>
				</div>
            </div>
        `;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			_childFilterMap: {
				type: Object
			},
			_focusedNode: {
				type: Object,
				value: null
			},
			_hierarchyVisibilityMapping: {
				type: Object
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
			_isSearching: {
				computed: '_getIsSearching(_searchTerm)'
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
			},
			_searchBar: {
				type: Object
			},
			_searchBoldRegex: {
				computed: '_getSearchBoldRegex(_searchTerm)'
			},
			_searchMatches: {
				type: Number,
				value: 0
			},
			_searchResultsFound: {
				computed: '_isSearchResultsFound(_searchMatches)'
			},
			_searchResultMessage: {
				computed: '_getSearchResultMessage(_isSearching, _searchResultsFound, _searchMatches, _searchTerm)'
			},
			_searchTerm: {
				type: String,
				value: ''
			},
			_surroundedSearchTerm: {
				computed: '_surround(_searchTerm)'
			}
		};
	}

	static get observers() {
		return [
			'_onHierarchyStatusChanged(_isHierarchy)',
			'_onSearchResultsChanged(_searchResultMessage)'
		];
	}

	ready() {
		super.ready();

		this._childFilterMap = {};
		this._hierarchyVisibilityMapping = {};

		const container = this.root.querySelector('#container');
		container.addEventListener('focus', this._onFocus.bind(this));
		container.addEventListener('keydown', this._onKeyPress.bind(this));

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

		this.addEventListener('search-results-updated', () => {
			this._focusedNode = null;
			this.debounce('update-search-count', () => {
				this._searchMatches = this._countSearchMatches(this._hierarchyVisibilityMapping);
			}, 10);
		});
	}

	attached() {
		IronA11yAnnouncer.requestAvailability();
	}

	_consumeEvent(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	_countSearchMatches(hierarchyVisibilityMapping) {
		if (!hierarchyVisibilityMapping) {
			return 0;
		}

		const count = Object.values(hierarchyVisibilityMapping).reduce((acc, v) => acc + (v === true ? 1 : 0), 0);
		return count;
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

	_getAriaRole(isHierarchy) {
		return isHierarchy ? 'tree' : 'list';
	}

	_getEmptyMessage(instructor, outcomeTerm) {
		const langTerm = instructor ? 'noOutcomesInstructor' : 'noOutcomesStudent';
		return this.localize(langTerm, 'outcome', outcomeTerm);
	}

	_getFirstChildNode() {
		let firstHref = null;

		for (let i = 0; i < this._outcomes.length; i++) {
			const href = this._getSelfHref(this._outcomes[i]);
			if (this._childFilterMap === null || this._childFilterMap[href] === false) {
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

	_getLastChildNode() {
		let lastHref = null;

		for (let i = this._outcomes.length - 1; i >= 0; i--) {
			const href = this._getSelfHref(this._outcomes[i]);
			if (this._childFilterMap === null || this._childFilterMap[href] === false) {
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

	_getIsHierarchy(entity) {
		return entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomeTree);
	}

	_getIsList(entity) {
		return entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.outcomes);
	}

	_getIsSearching(searchTerm) {
		return searchTerm !== '';
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

	_getSearchBoldRegex(searchTerm) {
		return `@(${escapeRegex(searchTerm)})@`;
	}

	_getSearchResultMessage(isSearching, resultsFound, numMatches, searchTerm) {
		if (!isSearching) {
			return this.localize('searchCleared');
		}

		if (resultsFound) {
			return this.localize('numSearchResults', 'numResults', numMatches, 'searchTerm', searchTerm);
		}

		return this.localize('noSearchResults', 'searchTerm', searchTerm);
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

	_isSearchResultsFound(searchMatches) {
		return searchMatches > 0;
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

			if (this._focusedNode) {
				this._focusedNode.focusSelf();
			} else {
				const firstChild = this._getFirstChildNode();
				firstChild.focusSelf();
			}
		}
	}

	_onKeyPress(e) {
		if (this._isHierarchy && !this._isEmpty(this._outcomes)) {
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

	_onHierarchyStatusChanged(isHierarchy) {
		if (isHierarchy) {
			afterNextRender(this, () => {
				if (!this._searchBar) {
					const searchElement = this.root.querySelectorAll('#hierarchy-search')[0];
					searchElement.addEventListener('d2l-input-search-searched', (e => {
						const searchTerm = e.detail.value;
						this._searchTerm = searchTerm.trim();
					}).bind(this));
					this._searchBar = searchElement;
				}
			});
		}
	}

	_onSearchResultsChanged(searchResultMessage) {
		if (searchResultMessage) {
			this.debounce('announce-search-results', () => {
				const event = new CustomEvent('iron-announce', {
					bubbles: true,
					composed: true,
					detail: { text: searchResultMessage }
				});
				this.dispatchEvent(event);
			}, 100);
		}
	}

	_surround(str) {
		return `@${str}@`;
	}
}

customElements.define(OutcomesList.is, OutcomesList);
