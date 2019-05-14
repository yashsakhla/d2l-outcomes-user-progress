import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-icons/d2l-icon';
import 'd2l-icons/tier1-icons';
import 'd2l-tooltip/d2l-tooltip';
import '../localize-behavior';

import { getLevelData, getTrendData } from '../../data/fake-trend-data';

const COMPONENT_HEIGHT = 120;       // Also defined in CSS
const FOOTER_HEIGHT = 22;           // Also defined in CSS
const GRID_THICKNESS = 1;           // Also defined in CSS
const NOT_ASSESSED_HEIGHT = 4;      // Also defined in CSS
const TOOLTIP_GAP = 8;
const TOOLTIP_POINTER_SIZE = 8;
const SCROLL_VIEWPORT_FRACTION = 0.5;

export class BigTrend extends mixinBehaviors(
    [ D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior ],
    PolymerElement
) {
    static get is() { return 'big-trend' };

    static get template() {
        const template = html`
            <style>
                :host {
                    --block-focus-height-increase: 4px;
                    --block-focus-width-increase: 110%;
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
                    --max-tooltip-width: 210px;
                    --not-assessed-color: #d3d9e3;
                    --not-assessed-height: 4px;
                    --scroll-button-width: 50px;
                }

                #container {
                    position: relative;
                }
    
                #grid {
                    float: left;
                    padding-top: var(--block-focus-height-increase);
                    position: relative;
                    width: 100%;
                }
    
                .h-line {
                    background-color: var(--grid-color);
                    height: var(--grid-thickness);
                }

                #scroll-container {
                    height: calc(var(--container-height) + var(--block-focus-height-increase) + var(--footer-height));
                    left: 0px;
                    overflow-y: hidden;
                    position: absolute;
                    top: 0px;
                    width: 100%;
                }

                #scroll {
                    height: calc(var(--container-height) + var(--block-focus-height-increase) + var(--footer-height));
                    overflow-x: scroll;
                    overflow-y: hidden;
                    padding: 0px var(--block-spacing);
                    padding-bottom: 20px;
                    scroll-behavior: smooth;
                    width: calc(100% - 2 * var(--block-spacing));
                }

                .scroll-button {
                    align-items: center;
                    background: rgba(255, 255, 255, 0.5);
                    display: flex;
                    height: calc(var(--container-height) + var(--grid-thickness) + var(--footer-height));
                    position: absolute;
                    top: var(--block-focus-height-increase);
                    vertical-align: middle;
                    width: var(--scroll-button-width);
                }

                .scroll-button:hover {
                    cursor: pointer;
                    filter: brightness(120%);
                }

                #scroll-button-left {
                    background: linear-gradient(90deg, white, transparent);
                    justify-content: flex-start;
                    left: 0px;
                }

                #scroll-button-right {
                    background: linear-gradient(-90deg, white, transparent);
                    justify-content: flex-end;
                    right: 0px;
                }
    
                #data {
                    align-items: flex-end;
                    display: flex;
                    flex-direction: row;
                    height: calc(var(--container-height) + var(--block-focus-height-increase));
                }

                .grid-column {
                    display: flex;
                    flex-direction: column;
                    height: var(--container-height);
                    justify-content: flex-end;
                    max-width: var(--block-max-width);
                    min-width: var(--block-min-width);
                    padding: 0px var(--block-spacing);
                    position: relative;
                    width: 100%;
                }

                .grid-column.section:not(:first-of-type) {
                    border-left: var(--grid-thickness) solid var(--grid-color);
                }
    
                .trend-group {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    overflow: visible;
                }

                .grid-label { /* Must be different element type than .trend-block because of last-of-type selector */
                    border-left: var(--grid-thickness) solid var(--grid-color);
                    color: var(--grid-label-color);
                    font-size: var(--label-font-size);
                    left: calc(var(--grid-thickness) * -1);
                    padding-left: var(--block-spacing);
                    padding-top: var(--label-margin-top);
                    position: absolute;
                    top: calc(var(--container-height) + 1px);
                }

                .grid-column:first-of-type .grid-label {
                    border-left: 0px;
                }
    
                .trend-block {
                    flex-shrink: 0;
                    margin-bottom: var(--grid-thickness);
                    transition: all 0.3s ease-out;
                    width: 100%;
                }

                .not-assessed .trend-block {
                    background-color: var(--not-assessed-color);
                    height: var(--not-assessed-height);
                }
    
                .trend-group .trend-block:first-of-type {
                    border-top-left-radius: var(--border-radius);
                    border-top-right-radius: var(--border-radius);
                }
    
                .trend-group .trend-block:last-of-type {
                    margin-bottom: 0px;
                }

                .trend-group:hover,
                .trend-group:focus {
                    cursor: pointer;
                    outline: none;
                }
                
                .trend-group:not(.not-assessed):hover .trend-block,
                .trend-group:not(.not-assessed):focus .trend-block {
                    filter: brightness(120%);
                    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
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

                .clear {
                    clear: both;
                }

                .hidden {
                    display: none !important;
                }

                table {
                    border-collapse: collapse;
                    border: 1px solid black;
                }

                table td,
                table th {
                    border: 1px solid black;
                }
            </style>
            <div id="container" aria-hidden="true">
                <div id="grid">
                    <template is="dom-repeat" items="[[_getGridHorizontal(_levels)]]">
                        <div class="h-line" style$="margin-bottom: [[item.size]]px;"></div>
                    </template>
                </div>
                <div id="scroll-container">
                    <div id="scroll">
                        <div id="data">
                            <template is="dom-repeat" items="[[_getTrendItems(_levels,_trendGroups)]]" index-as="groupIndex">
                                <div class$="[[_getColumnClasses(item)]]">
                                    <div id$="[[_getUniqueGroupId(groupIndex)]]" class$="[[_getGroupClasses(item)]]" tabindex="0">
                                        <template is="dom-if" if="[[!_groupHasBlocks(item)]]">
                                            <div class="trend-block" style$="margin-top: calc([[item.gridHeight]]px - var(--not-assessed-height));"></div>
                                        </template>
                                        <template is="dom-repeat" items="[[item.blocks]]" as="trendBlock">
                                            <div class="trend-block" style$="height: [[trendBlock.height]]px; background-color: [[trendBlock.color]];"></div>
                                        </template>
                                    </div>
                                    <template is="dom-if" if="[[item.label]]">
                                        <span class="grid-label">[[item.label]]</span>
                                    </template>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div id="scroll-button-left" class="scroll-button hidden">
                    <d2l-icon icon="d2l-tier1:chevron-left"></d2l-icon>
                </div>
                <div id="scroll-button-right" class="scroll-button hidden">
                    <d2l-icon icon="d2l-tier1:chevron-right"></d2l-icon>
                </div>
                <div class="clear"></div>
                <template is="dom-repeat" items="[[_getTrendItems(_levels,_trendGroups)]]" index-as="groupIndex">
                    <d2l-tooltip for$="[[_getUniqueGroupId(groupIndex)]]" position="top" offset$="[[_getTooltipOffset(item)]]">
                        <div><b>[[item.name]]</b></div>
                        <template is="dom-repeat" items="[[item.attempts]]" as="attemptGroup">
                            <div>
                                <template is="dom-if" if="[[_hasMultipleAttempts(item)]]">
                                    <b>[[_getAttemptGroupLabel(attemptGroup.attempts)]]</b>:
                                </template>
                                [[attemptGroup.name]]
                            </div>
                        </template>
                        <template is="dom-if" if="[[!_groupHasBlocks(item)]]">
                            <div>[[_getNotAssessedText()]]</div>
                        </template>
                    </d2l-tooltip>
                </template>
            </div>
            <div class="screen-reader">
                <template is="dom-if" if="[[!_hasTrendData(_trendGroups)]]">
                    [[_getNotAssessedText()]]
                </template>
                <template is="dom-if" if="[[_hasTrendData(_trendGroups)]]">
                    <table>
                        <thead>
                            <tr>
                                <template is="dom-repeat" items="[[_getScreenReaderTableHeadings()]]">
                                    <th>[[item]]</th>
                                </template>
                            </tr>
                        </thead>
                        <tbody>
                            <template is="dom-repeat" items="[[_getTrendItems(_levels,_trendGroups)]]">
                                <tr>
                                    <td>[[item.date]]</td>
                                    <td>[[item.name]]</td>
                                    <td>
                                        <template is="dom-repeat" items="[[item.attempts]]" as="attemptGroup">
                                            <div>
                                                <template is="dom-if" if="[[_hasMultipleAttempts(item)]]">
                                                    [[_getAttemptGroupScreenReaderText(attemptGroup.attempts)]]:
                                                </template>
                                                [[attemptGroup.name]]
                                            </div>
                                        </template>
                                        <template is="dom-if" if="[[!_groupHasBlocks(item)]]">
                                            <div>[[_getNotAssessedText()]]</div>
                                        </template>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </template>
            </div>
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
            _levels: {
                type: Object,
                computed: '_getLevelsData(dataSet)'
            },
            _rowHeight: {
                type: Number,
                computed: '_getRowHeight(_levels)'
            },
            _trendGroups: {
                type: Array,
                computed: '_getTrendData(dataSet)'
            }
        };
    }

    ready() {
        super.ready();
        
        afterNextRender(this, function() {
            this.scrollContainer = this.root.getElementById('scroll');
            this.scrollButtonLeft = this.root.getElementById('scroll-button-left');
            this.scrollButtonRight = this.root.getElementById('scroll-button-right');

            window.addEventListener('resize', this._onDataScrolled.bind(this));
            this.scrollContainer.addEventListener('scroll', this._onDataScrolled.bind(this));
            this.scrollButtonLeft.addEventListener('click', this._onScrollButtonClicked.bind(this));
            this.scrollButtonRight.addEventListener('click', this._onScrollButtonClicked.bind(this));

            this._onDataScrolled();
            this._scrollToEnd();
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener('resize', this._onDataScrolled);
    }

    _getAttemptGroupLabel(attempts) {
        return this.localize(
            'bigTrendAttemptsTooltipString', 
            'numAttempts', attempts.length, 
            'attemptNames', attempts.join(', ')
        );
    }

    _getAttemptGroupScreenReaderText(attempts) {
        const attemptNames = attempts.length > 1 ? attempts.slice(0, -1).join(', ') : attempts[0];
        const lastAttemptName = attempts.slice(-1);
        return this.localize(
            'bigTrendAttemptsScreenReaderString', 
            'numAttempts', attempts.length, 
            'attemptNames', attemptNames, 
            'lastAttemptName', lastAttemptName
        );
    }

    _getColumnClasses(group) {
        const classes = [
            'grid-column'
        ];
        
        if (group.label) {
            classes.push('section');
        }

        return classes.join(' ');
    }

    _getGridHorizontal(levels) {
        const maxLevel = this._getMaxLevelScore(levels);
        const gridHeight = this._rowHeight - GRID_THICKNESS;

        const gridData = Array.apply(null, { length: maxLevel + 1 }).map((v, i) => {
            return {
                size: (i === maxLevel 
                    ? FOOTER_HEIGHT 
                    : gridHeight
                )
            };
        });
        return gridData;
    }

    _getGroupClasses(group) {
        const classes = [
            'trend-group'
        ];
        
        if (!this._groupHasBlocks(group)) {
            classes.push('not-assessed');
        }

        return classes.join(' ');
    }

    _getGroupLabel(group) {
        return this.formatDate(
            new Date(group.date * 1000), {
                format: 'MMM'
            });
    }
    
    _getLevelsData(setNumber) {
        return getLevelData(setNumber);
    }

    _getMaxLevelScore(levels) {
        return Math.max.apply(null, Object.keys(levels).map(levelId => levels[levelId].score));
    }

    _getNotAssessedText() {
        return this.localize('notAssessed');
    }

    _getRowHeight(levels) {
        const maxLevel = this._getMaxLevelScore(levels);
        return COMPONENT_HEIGHT / maxLevel;
    }

    _getScreenReaderTableHeadings() {
        return [
            this.localize('headingDate'),
            this.localize('headingEvidence'),
            this.localize('headingLoa')
        ];
    }

    _getTooltipOffset(group) {
        let offset = TOOLTIP_POINTER_SIZE + TOOLTIP_GAP;

        if (!this._groupHasBlocks(group)) {
            offset -= this._rowHeight - GRID_THICKNESS - NOT_ASSESSED_HEIGHT;
        }

        return offset;
    }

    _getTrendData(setNumber) {
        return getTrendData(setNumber);
    }

    _getTrendItems(levels, trendGroups) {
        const trendItems = [];
        const maxLevel = this._getMaxLevelScore(levels);
        const gridHeight = this._rowHeight - GRID_THICKNESS;
        let lastGroupLabel = null;
        
        trendGroups.forEach(group => {
            const blocks = [];

            const groupAttempts = group.attempts;
            const groupDate = this.formatDate(new Date(group.date * 1000), { format: 'MMMM d, yyyy' });
            const groupLabel = this._getGroupLabel(group);
            const groupName = (!group.name || group.name.trim() === '') ? this.localize('untitled') : group.name;

            const groupItem = {
                date: groupDate,
                gridHeight: gridHeight,
                name: groupName,
                type: 'block'
            };

            // Create vertical grid lines
            if (groupLabel !== lastGroupLabel) {
                groupItem.label = groupLabel;
            }

            lastGroupLabel = groupLabel;

            // Compute levels achieved
            const groupLevels = groupAttempts
                .filter((val, index, self) => self.indexOf(val) === index)
                .sort((left, right) => levels[left].score - levels[right].score);

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

            // Group attempt labels
            let attemptCounter = 1,
                attemptLabels = [];
            groupAttempts.forEach(attempt => {
                let label = {
                    id: attempt,
                    name: levels[attempt].name,
                    attempts: [ attemptCounter ]
                };
                const prevAttempt = attemptLabels.pop();

                if (prevAttempt && prevAttempt.id === attempt) {
                    label = prevAttempt;
                    label.attempts.push(attemptCounter);
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

    _hasTrendData(trendGroups) {
        return trendGroups.length > 0 && trendGroups[0].attempts.length > 0;
    }

    _hasMultipleAttempts(group) {
        return group.attempts.length > 0 && (group.attempts.length > 1 || group.attempts[0].attempts.length > 1); 
    }

    _onDataScrolled() {
        const scrollMax = this.scrollContainer.scrollLeftMax 
            || (this.scrollContainer.scrollWidth - this.scrollContainer.offsetWidth);

        if (this.scrollContainer.scrollLeft === 0) {
            this.scrollButtonLeft.classList.add('hidden');
        } else {
            this.scrollButtonLeft.classList.remove('hidden');
        }

        if (this.scrollContainer.scrollLeft === scrollMax) {
            this.scrollButtonRight.classList.add('hidden');
        } else {
            this.scrollButtonRight.classList.remove('hidden');
        }
    }

    _onScrollButtonClicked(e) {
        const scrollButton = e.currentTarget;
        let scrollAmount = SCROLL_VIEWPORT_FRACTION * this.scrollContainer.offsetWidth;

        if (scrollButton === this.scrollButtonLeft) {
            scrollAmount *= -1;
        }

        this.scrollContainer.scrollLeft += scrollAmount;
    }

    _scrollToEnd() {
        const scrollMax = this.scrollContainer.scrollLeftMax 
            || (this.scrollContainer.scrollWidth - this.scrollContainer.offsetWidth);

        this.scrollContainer.scrollLeft = scrollMax;
    }
}

customElements.define(BigTrend.is, BigTrend);
