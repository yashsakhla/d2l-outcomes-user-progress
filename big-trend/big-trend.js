import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

const BLOCK_SPACING = 9;            // Also defined in CSS
const COMPONENT_HEIGHT = 120;       // Also defined in CSS
const GRID_THICKNESS = 1;           // Also defined in CSS
const FOOTER_HEIGHT = 22;           // Also defined in CSS

export class BigTrend extends mixinBehaviors(
    [],
    PolymerElement
) {
    static get is() { return 'big-trend' };

    static get template() {
        const template = html`
            <style>
                :host {
                    --block-max-width: 54px;
                    --block-min-width: 24px;
                    --block-spacing: 9px;
                    --border-radius: 6px;
                    --container-height: 120px;
                    --footer-height: 22px;
                    --grid-color: #d3d9e3;
                    --grid-label-color: #7C8695;
                    --grid-thickness: 1px;
                    --label-font-size: 14px;
                    --label-margin-top: 4px;
                }

                .container {
                    position: relative;
                }
    
                .grid {
                    float: left;
                    position: relative;
                    width: 100%;
                }
    
                .h-line {
                    background-color: var(--grid-color);
                    height: var(--grid-thickness);
                }

                .scroll-container {
                    height: calc(var(--container-height) + var(--footer-height));
                    left: 0px;
                    overflow-x: auto;
                    padding: 0px var(--block-spacing);
                    position: absolute;
                    top: 0px;
                    width: calc(100% - 2 * var(--block-spacing));
                }
    
                .data {
                    height: var(--container-height);
                }
    
                .trend-group {
                    display: table-cell;
                    height: var(--container-height);
                    max-width: var(--block-max-width);
                    min-width: var(--block-min-width);
                    padding: 0px var(--block-spacing);
                    position: relative;
                    vertical-align: bottom;
                    width: 100px;
                }

                .trend-group.section {
                    border-left: var(--grid-thickness) solid var(--grid-color);
                }

                .grid-label { /* Must be different element type than .trend-block */
                    border-left: var(--grid-thickness) solid var(--grid-color);
                    color: var(--grid-label-color);
                    display: table-cell;
                    font-size: var(--label-font-size);
                    left: calc(var(--grid-thickness) * -1);
                    padding-left: var(--block-spacing);
                    padding-top: var(--label-margin-top);
                    position: absolute;
                    top: calc(var(--container-height) + 1px);
                }
    
                .trend-block {
                    margin-bottom: var(--grid-thickness);
                }
    
                .trend-group .trend-block:first-of-type {
                    border-top-left-radius: var(--border-radius);
                    border-top-right-radius: var(--border-radius);
                }
    
                .trend-group .trend-block:last-of-type {
                    margin-bottom: 0px;
                }
    
                .screen-reader {
                    height: 1px;
                    left: -99999px;
                    overflow: hidden;
                    position: absolute;
                    width: 1px;
                }

                .clear {
                    clear: both;
                }
            </style>
            <div class="container">
                <div class="grid">
                    <template is="dom-repeat" items="[[getGridHorizontal(levels)]]">
                        <div class="h-line" style="margin-bottom: [[item.size]]px;"></div>
                    </template>
                </div>
                <div class="scroll-container">
                    <div class="data">
                        <template is="dom-repeat" items="[[getTrendItems(levels,trendGroups)]]">
                            <div class$="[[getGroupClasses(item)]]">
                                <template is="dom-repeat" items="[[item.blocks]]" as="trendBlock">
                                    <div class="trend-block" style="height: [[trendBlock.height]]px; background-color: [[trendBlock.color]];"></div>
                                </template>
                                <template is="dom-if" if="[[item.label]]">
                                    <span class="grid-label">[[item.label]]</span>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
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
                    {
                        activityId: '123',
                        date: '1546318800',
                        levels: [ 'abc111' ]
                    },
                    {
                        activityId: '124',
                        date: '1546318801',
                        levels: [ 'abc222' ]
                    },
                    {
                        activityId: '125',
                        date: '1548997200',
                        levels: [ ]
                    },
                    {
                        activityId: '126',
                        date: '1551416400',
                        levels: [ 'abc333' ]
                    },
                    {
                        activityId: '127',
                        date: '1551416401',
                        levels: [ 'abc222', 'abc444' ]
                    },
                    {
                        activityId: '128',
                        date: '1551416402',
                        levels: [ 'abc555' ]
                    }
                ]
            }
        };
    }

    hasTrendData(trendGroups) {
        const numAssessed = trendGroups.reduce((acc, group) => acc + group.length, 0);
        return numAssessed > 0;
    }

    getMaxLevelScore(levels) {
        return Math.max.apply(null, Object.keys(levels).map(levelId => levels[levelId].score));
    }

    getGridHorizontal(levels) {
        const maxLevel = this.getMaxLevelScore(levels);
        const gridData = Array.apply(null, { length: maxLevel + 1 }).map((v, i) => {
            return {
                size: (i === maxLevel 
                    ? FOOTER_HEIGHT 
                    : COMPONENT_HEIGHT / maxLevel - GRID_THICKNESS
                )
            };
        });
        return gridData;
    }

    getGroupLabel(group) {
        return new Date(group.date * 1000).getMonth();
    }

    getTrendItems(levels, trendGroups) {
        const trendItems = [];
        const maxLevel = this.getMaxLevelScore(levels);
        let lastGroupLabel = null;
        
        trendGroups.forEach(group => {
            const blocks = [];
            const groupLevels = group.levels;
            const groupLabel = this.getGroupLabel(group);
            const groupItem = {
                type: 'block'
            };

            // Create vertical grid lines
            if (trendItems.length > 0 && groupLabel !== lastGroupLabel) {
                groupItem.label = groupLabel;
            }

            lastGroupLabel = groupLabel;

            // Add trend blocks to group
            let prevScore = 0;

            groupLevels.forEach(levelId => {
                const color = levels[levelId].color;
                const height = COMPONENT_HEIGHT / maxLevel * (levels[levelId].score - prevScore) - GRID_THICKNESS;
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

    isItemOfType(item, type) {
        return item.type === type;
    }

    getGroupClasses(group) {
        console.log(group);
        const classes = [
            'trend-group'
        ];
        
        if (group.label) {
            classes.push('section');
        }

        return classes.join(' ');
    }

    getNotAssessedText() {
        return 'nothing...';
    }

    getScreenReaderText(levels, trendGroups) {
        return 'nothing...';
    }
}

customElements.define(BigTrend.is, BigTrend);