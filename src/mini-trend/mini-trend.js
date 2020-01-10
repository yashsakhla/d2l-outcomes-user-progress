import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-tooltip/d2l-tooltip';
import 'd2l-typography/d2l-typography.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import '../localize-behavior';
import '../trend-behavior';
import '../demonstration-activity-loader.js';
import '../entity-loader.js';


const BLOCK_SPACING = 2;        // Also defined in CSS
const COMPONENT_HEIGHT = 36;    // Also defined in CSS
const MAX_TREND_ITEMS = 6;
const TOOLTIP_GAP = 8;
const TOOLTIP_POINTER_SIZE = 8;

export class MiniTrend extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior,
		D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehavior,
		D2L.PolymerBehaviors.OutcomesUserProgress.DemonstrationActivityLoaderBehavior
	],
	PolymerElement
) {
	static get is() { return 'd2l-mini-trend'; }

	static get template() {
		const template = html`
			<style include="d2l-typography">
				:host {
					--block-spacing: 2px;
					--border-radius: 2px;
					--container-height: 36px;
					--max-tooltip-width: 210px;
					--trend-group-width: 12px;

					align-items: center;
					display: inline-flex;
					flex-direction: row;
					height: var(--container-height);
				}

				.trend-group {
					display: flex;
					flex-direction: column;
					height: var(--container-height);
					justify-content: flex-end;
					padding-right: var(--block-spacing);
					width: var(--trend-group-width);
				}

				.trend-group:last-of-type {
					padding-right: 0px;
				}

				.trend-block {
					margin-top: var(--block-spacing);
				}

				.trend-group .trend-block:first-of-type {
					border-top-left-radius: var(--border-radius);
					border-top-right-radius: var(--border-radius);
					margin-top: 0px;
				}

				.trend-group .trend-block:last-of-type {
					border-bottom-left-radius: var(--border-radius);
					border-bottom-right-radius: var(--border-radius);
				}

				.empty-text {
					@apply --d2l-body-small-text;
				}

				.screen-reader {
					height: 1px;
					left: -99999px;
					overflow: hidden;
					position: absolute;
					width: 1px;
				}
				
				d2l-tooltip {
					max-width: var(--max-tooltip-width);
					text-align: center;
				}
			</style>
			<template is="dom-if" if="[[entity]]">
				<template is="dom-repeat" items="[[getDemonstrationActivitiesHrefs(entity)]]" as="activityHref">
					<entity-loader
						href="[[activityHref]]"
						token="[[token]]"
						activity-map="{{demonstrationLoaderActivities}}"
					></entity-loader>
				</template>
			</template>
			<template is="dom-if" if="[[_isNotAssessed(trendDataTruncated)]]">
				<div class="empty-text">[[_getNotAssessedText()]]</div>
			</template>
			<template is="dom-if" if="[[_hasTrendData(trendDataTruncated)]]">
				<template is="dom-repeat" items="[[_getTrendItems(trendDataTruncated)]]" as="trendGroup" index-as="groupIndex">
					<div class="trend-group" id$="[[_getUniqueGroupId(groupIndex)]]">
						<template is="dom-repeat" items="[[trendGroup.blocks]]" as="trendBlock">
							<div class="trend-block" style$="height: [[trendBlock.height]]px; background-color: [[trendBlock.color]];"></div>
						</template>
					</div>
				</template>
				<p class="screen-reader">[[_getScreenReaderText(trendDataTruncated)]]</p>
				<template is="dom-repeat" items="[[_getTrendItems(trendDataTruncated)]]" as="trendGroup" index-as="groupIndex">
					<d2l-tooltip for$="[[_getUniqueGroupId(groupIndex)]]" position="top" offset$="[[_getTooltipOffset()]]">
						<div><b>[[trendGroup.name]]</b></div>
						<template is="dom-repeat" items="[[trendGroup.attempts]]" as="attemptGroup">
							<div>
								<template is="dom-if" if="[[_hasMultipleAttempts(trendGroup)]]">
									<b>[[_getAttemptGroupLabel(attemptGroup.attempts)]]</b>:
								</template>
								[[attemptGroup.name]]
							</div>
						</template>
						<template is="dom-if" if="[[!_groupHasBlocks(trendGroup)]]">
							<div>[[_getNotAssessedText()]]</div>
						</template>
					</d2l-tooltip>
				</template>
			</template>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			trendDataTruncated: {
				type: Object,
				computed: '_truncTrendData(trendData, demonstrationLoaderActivities)'
			},
			_demonstrationLoaderActivities: Object
		};
	}

	_getAttemptGroupLabel(attempts) {
		const activityNames = [];
		
		attempts.forEach( attempt => {
			const activity = this._demonstrationLoaderActivities[ attempt.demonstrationActivityHref ];
			if( activity ) {
				const nameEntity = activity.getSubEntityByClasses( ['user-activity-name'] );
				if( nameEntity ) {
					activityNames.push( nameEntity.properties.shortText );
				} else {
					activityNames.push( '' );
				}
			}
		} );
		
		return activityNames.join(', ');
	}

	_getMaxLevelScore(levels) {
		return Math.max.apply(null, Object.keys(levels).map(levelId => levels[levelId].score));
	}

	_getNotAssessedText() {
		return this.localize('notAssessed');
	}

	_getScreenReaderText(trendData) {
		if (!trendData || !trendData.levels || !trendData.groups) {
			return null;
		}

		const levels = trendData.levels;
		const trendGroups = trendData.groups;

		const numAssessed = trendGroups.reduce((acc, group) => acc + group.attempts.length, 0);
		const levelNames = trendGroups.reduce((acc, group) => acc.concat(group.attempts.map(attempt => levels[attempt.levelId].name)), []).join(', ');
		
		return this.localize('miniTrendScreenReaderText', 'numAssessed', numAssessed, 'levelNames', levelNames);
	}

	_getTooltipOffset() {
		const offset = TOOLTIP_POINTER_SIZE + TOOLTIP_GAP;
		return offset;
	}

	_getTrendItems(trendData) {
		if (!this._hasData(trendData)) {
			return [];
		}

		const levels = trendData.levels;
		const trendGroups = trendData.groups;
		const trendItems = [];
		const maxLevel = this._getMaxLevelScore(levels);

		trendGroups.forEach(group => {
			const blocks = [];
			const groupAttempts = group.attempts;
			const groupItem = {};

			// Compute levels achieved
			const groupLevels = groupAttempts
				.filter((val, index, self) => self.indexOf(val) === index)
				.sort((left, right) => levels[left.levelId].score - levels[right.levelId].score);
			const groupSize = groupLevels.length;

			// Add trend blocks to group
			let prevScore = 0;

			groupLevels.forEach( attempt => {
				const levelId = attempt.levelId;
				const color = levels[levelId].color;
				const height = COMPONENT_HEIGHT / maxLevel * (levels[levelId].score - prevScore) - BLOCK_SPACING * (groupSize - 1) / groupSize;
				prevScore = levels[levelId].score;

				blocks.push({
					color,
					height
				});
			}, this);

			groupItem.blocks = blocks.reverse();

			// Group attempt labels
			const attemptLabels = [];
			let attemptCounter = 1;
			groupAttempts.forEach(attempt => {
				const levelId = attempt.levelId;
				let label = {
					id: levelId,
					name: levels[levelId].name,
					attempts: [ { 
						attemptIndex: attemptCounter, 
						demonstrationActivityHref: attempt.demonstrationActivityHref 
					} ]
				};
				const prevAttempt = attemptLabels.pop();

				if (prevAttempt && prevAttempt.id === levelId) {
					label = prevAttempt;
					label.attempts.push({ 
						attemptIndex: attemptCounter, 
						demonstrationActivityHref: attempt.demonstrationActivityHref
					});
				} else if (prevAttempt) {
					attemptLabels.push(prevAttempt);
				}

				attemptLabels.push(label);
				attemptCounter++;
			});

			groupItem.attempts = attemptLabels;

			trendItems.push(groupItem);
		}, this);

		return trendItems;
	}

	_getUniqueGroupId(groupIndex) {
		return `group${groupIndex}`;
	}

	_groupHasBlocks(group) {
		return group.blocks.length > 0;
	}

	_hasData(trendData) {
		return trendData !== null;
	}

	_hasMultipleAttempts(group) {
		return group.attempts.length > 0 && (group.attempts.length > 1 || group.attempts[0].attempts.length > 1);
	}

	_hasTrendData(trendData) {
		const blockGroups = this._getTrendItems(trendData);
		const numBlocks = blockGroups.reduce((acc, group) => acc + group.blocks.length, 0);
		return numBlocks > 0;
	}

	_isNotAssessed(trendData) {
		return this._hasData(trendData) && !this._hasTrendData(trendData);
	}

	_truncTrendData(trendData, demonstrationLoaderActivities) {
		this._demonstrationLoaderActivities = demonstrationLoaderActivities;
		
		if (!this._hasData(trendData)) {
			return null;
		}

		const truncGroups = [];
		const trendGroups = trendData.groups;
		for (let i = trendGroups.length - 1; i >= 0; i--) {
			if (truncGroups.length === MAX_TREND_ITEMS) {
				break;
			}

			if (truncGroups.length === 0 && trendGroups[i].attempts.length === 0) {
				continue;
			}

			truncGroups.push(trendGroups[i]);
		}

		return {
			levels: trendData.levels,
			groups: truncGroups.reverse()
		};
	}
}

customElements.define(MiniTrend.is, MiniTrend);
