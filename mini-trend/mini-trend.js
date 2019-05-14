import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '../localize-behavior';

import { getLevelData, getTrendData } from '../fake-trend-data';

const BLOCK_SPACING = 2;        // Also defined in CSS
const COMPONENT_HEIGHT = 36;    // Also defined in CSS
const MAX_TREND_ITEMS = 6;

export class MiniTrend extends mixinBehaviors(
    [ D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior ],
    PolymerElement
) {
    static get is() { return 'mini-trend' };

    static get template() {
        const template = html`
            <style>
                :host {
                    --block-spacing: 2px;
                    --border-radius: 2px;
                    --container-height: 36px;

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
                    width: 12px;
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
                    color: #7C8695;
                    font-size: 14px;
                }

                .screen-reader {
                    height: 1px;
                    left: -99999px;
                    overflow: hidden;
                    position: absolute;
                    width: 1px;
                }
            </style>
            <template is="dom-if" if="[[!hasTrendData(levels,trendGroups)]]">
                <div class="empty-text">[[getNotAssessedText()]]</div>
            </template>
            <template is="dom-if" if="[[hasTrendData(levels,trendGroups)]]">
                <template is="dom-repeat" items="[[getTrendItems(levels,trendGroups)]]" as="trendGroup">
                    <div class="trend-group">
                        <template is="dom-repeat" items="[[trendGroup.blocks]]" as="trendBlock">
                            <div class="trend-block" style$="height: [[trendBlock.height]]px; background-color: [[trendBlock.color]];"></div>
                        </template>
                    </div>
                </template>
                <p class="screen-reader">[[getScreenReaderText(levels,trendGroups)]]</p>
            </template>
        `;
        template.setAttribute('strip-whitespace', true);
        return template;
    }

    static get properties() {
        return {
            dataSet: {
                type: Number,
                value: 0
            },
            levels: {
                type: Object,
                computed: 'getLevelsData(dataSet)'
            },
            trendGroups: {
                type: Array,
                computed: 'getTrendData(dataSet)'
            }
        };
    }

    getLevelsData(setNumber) {
        return getLevelData(setNumber);
    }

    getTrendData(setNumber) {
        return getTrendData(setNumber).slice(-MAX_TREND_ITEMS);
    }

    groupFilter(acc, group) {
        return acc + group.blocks.length;
    }

    hasTrendData(levels, trendGroups) {
        const blockGroups = this.getTrendItems(levels, trendGroups);
        const numBlocks = blockGroups.reduce(this.groupFilter.bind(this), 0);
        return numBlocks > 0;
    }

    getMaxLevelScore(levels) {
        return Math.max.apply(null, Object.keys(levels).map(levelId => levels[levelId].score));
    }

    getTrendItems(levels, trendGroups) {
        const trendItems = [];
        const maxLevel = this.getMaxLevelScore(levels);
        
        trendGroups.forEach(group => {
            const blocks = [];
            const groupAttempts = group.attempts;
            const groupItem = {};

            // Compute levels achieved
            const groupLevels = groupAttempts
                .filter((val, index, self) => self.indexOf(val) === index)
                .sort((left, right) => levels[left].score - levels[right].score);
            const groupSize = groupLevels.length;

            // Add trend blocks to group
            let prevScore = 0;

            groupLevels.forEach(levelId => {
                const color = levels[levelId].color;
                const height = COMPONENT_HEIGHT / maxLevel * (levels[levelId].score - prevScore) - BLOCK_SPACING * (groupSize - 1) / groupSize;
                prevScore = levels[levelId].score;

                blocks.push({
                    color,
                    height
                });
            }, this);

            groupItem.blocks = blocks.reverse();

            trendItems.push(groupItem);
        }, this);

        return trendItems;
    }

    getNotAssessedText() {
        return this.localize('notAssessed');
    }

    getScreenReaderText(levels, trendGroups) {
        const numAssessed = trendGroups.reduce((acc, group) => acc + group.attempts.length, 0);
        const levelNames = trendGroups.reduce((acc, group) => acc.concat(group.attempts.map(levelId => levels[levelId].name)), []).join(', ');

        return this.localize('miniTrendScreenReaderText', 'numAssessed', numAssessed, 'levelNames', levelNames);
    }
}

customElements.define(MiniTrend.is, MiniTrend);
