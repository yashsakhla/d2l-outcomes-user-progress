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
				#container {
					border-top: 1px solid var(--d2l-color-mica);
				}

				#content {
					display: flex;
					padding: 18px 0px;
				}

				#content:not(.leaf-node) .main-text {
					font-weight: bold;
				}

				#content:not(.leaf-node) .sub-text {
					display: none;
				}

				:not([aria-busy]) #content:hover {
					cursor: pointer;
				}

				:not([aria-busy]) #content.leaf-node:hover .main-text {
					color: blue;
					color: var(--d2l-color-celestine-minus-1);
					text-decoration: underline;
				}

				.button-toggle-collapse {
					margin-right: 8px;
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
					margin-left: 18px;
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
			<div id="container" role="listitem" aria-busy$="[[!_outcomeEntity]]">
				<div id="content" on-click="_onItemClicked" class$="[[_getContentClass(_children)]]">
					<template is="dom-if" if="[[!_isEmpty(_children)]]">
						<d2l-button-icon
							class="button-toggle-collapse"
							icon="[[_getCollapseIcon(_collapsed)]]"
							on-click="_onItemClicked"
						></d2l-button-icon>
					</template>
					<div id="primary">
						<template is="dom-if" if="[[_outcomeEntity]]">
							<div class="main-text">[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</div>
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
				<template is="dom-if" if="[[!_isEmpty(_children)]]">
					<div id="children" hidden$="[[_collapsed]]">
						<template is="dom-repeat" items="[[_children]]">
							<d2l-outcomes-tree-node href="[[_getSelfHref(item)]]" token="[[token]]"></d2l-outcomes-tree-node>
						</template>
					</div>
				</template>
			</div>
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
			}
		};
	}

	static get observers() {
		return [
			'_onEntityChanged(entity)'
		];
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

	_getContentClass(children) {
		const classes = [];

		if (children && this._isEmpty(children)) {
			classes.push('leaf-node');
		}

		return classes.join(';');
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

	_isEmpty(children) {
		return !children || children.length === 0;
	}

	_onItemClicked(e) {
		if (this._outcomeEntity) {
			e.stopPropagation();
			e.preventDefault();

			if (this._isEmpty(this._children)) {
				this.dispatchEvent(new CustomEvent(oupConsts.events.outcomeListItemClicked, { composed: true, bubbles: true, detail: { href: this._selfHref } }));
			} else {
				this._toggleCollapse();
			}
		}
	}

	_toggleCollapse() {
		this._collapsed = !this._collapsed;
	}
}

customElements.define(OutcomesTreeNode.is, OutcomesTreeNode);
