import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

import { strings } from './strings';

const BLOCK_SPACING = 2;        // Also defined in CSS
const COMPONENT_HEIGHT = 36;    // Also defined in CSS

export class MiniTrend extends mixinBehaviors(
    [],
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
            <template is="dom-if" if="[[!hasTrendData(trendGroups)]]">
                <div class="empty-text">[[getNotAssessedText()]]</div>
            </template>
            <template is="dom-if" if="[[hasTrendData(trendGroups)]]">
                <template is="dom-repeat" items="[[getTrendItems(levels,trendGroups)]]" as="trendGroup">
                    <div class="trend-group">
                        <template is="dom-repeat" items="[[trendGroup.blocks]]" as="trendBlock">
                            <div class="trend-block" style="height: [[trendBlock.height]]px; background-color: [[trendBlock.color]];"></div>
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
            levels: {
                type: Object,
                value: {
                    'abc111': {
                        score: 1,
                        color: '#ff4000',
                        name: 'Level 1'
                    },
                    'abc222': {
                        score: 3,
                        color: '#ffcc00',
                        name: 'Level 3'
                    },
                    'abc333': {
                        score: 4,
                        color: '#88CC55',
                        name: 'Level 4'
                    },
                    'abc444': {
                        score: 8,
                        color: '#88CC55',
                        name: 'Level 8'
                    },
                    'abc555': {
                        score: 10,
                        color: '#009933',
                        name: 'Level 10'
                    }
                }
            },
            trendGroups: {
                type: Array,
                value: [
                    [ 'abc111' ],
                    [ 'abc222' ],
                    [ ],
                    [ 'abc333' ],
                    [ 'abc222', 'abc444' ],
                    [ 'abc555' ]
                ]
            }
        };
    }

    hasTrendData(trendGroups) {
        const numAssessed = trendGroups.reduce((acc, group) => acc + group.length, 0);
        return numAssessed > 0;
    }

    getTrendItems(levels, trendGroups) {
        const trendItems = [];
        const maxLevel = Math.max.apply(null, Object.keys(levels).map(levelId => levels[levelId].score));
        
        trendGroups.forEach(group => {
            const blocks = [];
            const groupSize = group.length;
            let prevScore = 0;

            group.forEach(levelId => {
                const color = levels[levelId].color;
                const height = COMPONENT_HEIGHT / maxLevel * (levels[levelId].score - prevScore) - BLOCK_SPACING * (groupSize - 1) / groupSize;
                prevScore = levels[levelId].score;

                blocks.push({
                    color,
                    height
                });
            }, this);

            trendItems.push({
                blocks: blocks.reverse()
            });
        }, this);

        return trendItems;
    }

    getNotAssessedText() {
        return strings.notAssessed;
    }

    getScreenReaderText(levels, trendGroups) {
        const numAssessed = trendGroups.reduce((acc, group) => acc + group.length, 0);
        const levelNames = trendGroups.reduce((acc, group) => acc.concat(group.map(levelId => levels[levelId].name)), []);

        return strings.screenReaderText(numAssessed, levelNames);
    }
}

customElements.define(MiniTrend.is, MiniTrend);
