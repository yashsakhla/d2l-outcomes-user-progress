import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'siren-entity/siren-entity.js';
import '../localize-behavior';
import 'd2l-typography/d2l-typography.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-icons/d2l-icon';
import 'd2l-icons/tier2-icons';
import 'd2l-colors/d2l-colors.js';
import 'd2l-more-less/d2l-more-less.js';
import 's-html/s-html.js';

export class EvidenceEntry extends mixinBehaviors(
	[D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior],
	PolymerElement
) {

	static get is() {
		return 'd2l-evidence-entry';
	}

	static get template() {
		const template = html`
			<style include="d2l-typography">
				.evidence {
					display: flex;
					align-items: stretch;
				}
				
				.timeline {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 60px;
					margin-top: 9px;
					margin-right: 12px;
					flex-grow: 0;
					flex-shrink: 0;
				}
				
				.card {
					position: relative;
					top: 0px;
					display: flex;
					flex-direction: column;
					align-items: stretch;
					width: 0;
					flex-grow: 1;
					flex-shrink: 1;
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 4px;
					padding: 18px 24px;
					margin-bottom: 17px;
					border-box: none;
					color: var(--d2l-color-ferrite);
					background-color: var(--d2l-color-white);
				}
				
				.card:not([disabled]):hover, .card:not([disabled]):focus {
					box-shadow: 0 4px 18px 2px rgba(0,0,0,0.06);
					top: -4px;
					transition: all 0.3s ease-out;
					transition-delay: 0.05s;
					cursor: pointer;
				}
				
				.card-header {
					display: flex;
				}
				
				.feedback {
					margin-top: 17px;
					display: flex;
					text-align: left;
					font-size: 16px;
				}
				
				.circle {
					display: inline-block;
					vertical-align: middle;
					width: 24px;
					height: 24px;
					border-radius: 50%;
					margin-left: 12px;
				}
				
				.date {
					@apply --d2l-body-small-text;
					margin-top: 6px;
				}
				
				.line {
					width: 1px;
					margin-top: 11px;
					background-color: var(--d2l-color-gypsum);
				}
				
				:host([last]) .line {
					visibility: hidden;
				}
				
				.quote {
					margin-right: 12px;
					margin-top: 7px;
				}
				
				.fit {
					flex-grow: 0;
					flex-shrink: 0;
				}
				
				.grow {
					flex-grow: 1;
					flex-shrink: 1;
				}
				
				button {
					font: inherit;
					-moz-appearance: none;
					-webkit-appearance: none;
					appearance: none;
				}
				
				h4 {
					@apply --d2l-heading-4;
					margin: 0;
				}
				
				.level-name {
					@apply --d2l-heading-4;
					margin: 0;
					font-weight: normal;
				}
				
				s-html {
					overflow-x: auto;
				}
			</style>
			<siren-entity href="[[levelHref]]" token="[[token]]" entity="{{_levelEntity}}"></siren-entity>
			<siren-entity href="[[feedbackHref]]" token="[[token]]" entity="{{_feedbackEntity}}"></siren-entity>
			<div class="evidence">
				<div class="timeline">
					<d2l-icon class="fit" icon="[[_getActivityIcon(type)]]"></d2l-icon>
					<span class="fit date">[[_formatDate(date)]]</span>
					<div class="grow line"></div>
				</div>
				<button class="card" disabled="[[!link]]" on-click="_onClick">
					<div class="card-header">
						<h4 class="fit">[[name]]</h4>
						<div class="grow"></div>
						<span class="fit level-name">[[_getLevelName(_levelEntity)]]</span>
						<div class="fit circle" style="[[_getLevelColourStyle(_levelEntity)]]"></div>
					</div>
					<d2l-more-less height="4rem">
						<template is="dom-repeat" items="[[_feedback]]" as="feedback">
							<div class="feedback">
								<img class="quote fit" src="[[_quoteImage]]" height="11" width="11"></img>
								<s-html class="grow" html="[[feedback]]"></s-html>
							</div>
						</template>
					</d2l-more-less>
				</button>
			</div>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			type: String,
			name: String,
			date: String,
			levelHref: String,
			feedbackHref: String,
			token: String,
			link: {
				type: String,
				value: null
			},
			last: {
				type: Boolean,
				reflectToAttribute: true,
				value: false
			},
			_feedback: {
				type: Array,
				computed: '_getFeedback(_feedbackEntity)'
			},
			_quoteImage: {
				type: String,
				value: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICA8ZGVmcz4NCiAgICA8cGF0aCBpZD0iYSIgZD0iTTAgMGgyNHYyNEgweiIvPg0KICA8L2RlZnM+DQogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0xKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+DQogICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhIi8+DQogICAgPC9tYXNrPg0KICAgIDxwYXRoIGQ9Ik02IDIyLjY2N0E0LjY2NyA0LjY2NyAwIDAgMCAxMC42NjcgMThjMC0xLjIyNy0uNTU5LTIuNS0xLjMzNC0zLjMzM0M4LjQ4MSAxMy43NSA3LjM1IDEzLjMzMyA2IDEzLjMzM2MtLjQxMSAwIDEuMzMzLTYuNjY2IDMtOSAxLjY2Ny0yLjMzMyAxLjMzMy0zIC4zMzMtM0M4IDEuMzMzIDUuMjUzIDQuNTg2IDQgNy4yNTUgMS43NzMgMTIgMS4zMzMgMTUuMzkyIDEuMzMzIDE4QTQuNjY3IDQuNjY3IDAgMCAwIDYgMjIuNjY3ek0xOCAyMi42NjdBNC42NjcgNC42NjcgMCAwIDAgMjIuNjY3IDE4YzAtMS4yMjctLjU1OS0yLjUtMS4zMzQtMy4zMzMtLjg1Mi0uOTE3LTEuOTgzLTEuMzM0LTMuMzMzLTEuMzM0LS40MTEgMCAxLjMzMy02LjY2NiAzLTkgMS42NjctMi4zMzMgMS4zMzMtMyAuMzMzLTMtMS4zMzMgMC00LjA4IDMuMjUzLTUuMzMzIDUuOTIyQzEzLjc3MyAxMiAxMy4zMzMgMTUuMzkyIDEzLjMzMyAxOEE0LjY2NyA0LjY2NyAwIDAgMCAxOCAyMi42Njd6IiBmaWxsPSIjRDNEOUUzIiBtYXNrPSJ1cmwoI2IpIi8+DQogIDwvZz4NCjwvc3ZnPg=='
			}
		};
	}

	_getLevelName(levelEntity) {
		return levelEntity ? levelEntity.properties.name : '';
	}

	_getLevelColourStyle(levelEntity) {
		return levelEntity ? `background-color: ${levelEntity.properties.color};` : '';
	}

	_formatDate(date) {
		return this.formatDate(
			new Date(date),
			{ format: 'MMM d' }
		);
	}

	_processFeedbackHtml(feedbackHtml) {
		const htmlRoot = document.createElement('div');
		htmlRoot.innerHTML = feedbackHtml;
		const firstElement = htmlRoot.firstChild;
		if (firstElement && firstElement.tagName === 'P') {
			firstElement.style.margin = '0';
		}
		return htmlRoot.innerHTML;
	}

	_getFeedback(feedbackEntity) {
		if (!feedbackEntity) {
			return [];
		}
		return feedbackEntity.getSubEntitiesByClass('feedback').map(
			feedback => this._processFeedbackHtml(feedback.properties.html)
		);
	}

	_onClick(event) {
		if (
			!this.link ||
			!event.composedPath() ||
			event.composedPath().some(element => {
				return (
					element instanceof HTMLElement &&
					element.tagName === 'D2L-BUTTON-SUBTLE' &&
					element.classList.contains('more-less-toggle')
				);
			})
		) {
			return;
		}
		window.location = this.link;
	}

	_getActivityIcon(toolName) {
		switch (toolName) {
			case 'Dropbox':
				return 'd2l-tier2:assignments';
			case 'Discussions':
				return 'd2l-tier2:discussions';
			case 'News':
				return 'd2l-tier2:news';
			case 'Locker':
				return 'd2l-tier2:locker';
			case 'Chat':
				return 'd2l-tier2:chat';
			case 'Links':
			case 'LTI':
				return 'd2l-tier2:link';
			case 'Surveys':
				return 'd2l-tier2:surveys';
			case 'Quizzing':
			case 'QuestionCollection':
				return 'd2l-tier2:quizzing';
			case 'Checklist':
				return 'd2l-tier2:checklist';
			case 'Grades':
				return 'd2l-tier2:grade';
			case 'SelfAssessments':
				return 'd2l-tier2:self-assessment';
			case 'Competencies':
				return 'd2l-tier2:user-competencies';
			case 'ePortfolio':
			case '703000': // Folio
				return 'd2l-tier2:eportfolio';
			default:
				return 'd2l-tier2:content';
		}
	}

}

customElements.define(EvidenceEntry.is, EvidenceEntry);
