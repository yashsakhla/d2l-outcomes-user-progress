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
					margin-top: 8px;
					flex-grow: 0;
					flex-shrink: 0;
				}
				
				.card {
					display: flex;
					flex-grow: 1;
					flex-shrink: 1;
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 4px;
					padding: 24px 18px;
					margin-bottom: 17px;
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
				}
				
				.line {
					width: 1px;
					margin-top: 11px;
					background-color: var(--d2l-color-gypsum);
				}
				
				:host([last]) .line {
					visibility: hidden;
				}
				
				.fit {
					flex-grow: 0;
					flex-shrink: 0;
				}
				
				.grow {
					flex-grow: 1;
					flex-shrink: 1;
				}
			</style>
			<siren-entity href="[[levelHref]]" token="[[token]]" entity="{{_levelEntity}}"></siren-entity>
			<div class="evidence">
				<div class="timeline">
					<d2l-icon class="fit" icon="[[_getActivityIcon(type)]]"></d2l-icon>
					<span class="fit date">[[_formatDate(date)]]</span>
					<div class="grow line"></div>
				</div>
				<div class="card">
					<b class="fit">[[name]]</b>
					<div class="grow"></div>
					<span class="fit">[[_getLevelName(_levelEntity)]]</span>
					<div class="fit circle" style="[[_getLevelColourStyle(_levelEntity)]]"></div>
				</div>
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
			token: String,
			last: {
				type: Boolean,
				reflectToAttribute: true,
				value: false
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
