import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-icons/d2l-icon';
import 'd2l-icons/tier1-icons';
import 'd2l-button/d2l-button-icon';
import 'd2l-colors/d2l-colors.js';
import '../localize-behavior';
import 'siren-entity/siren-entity.js';
import OutcomeParserBehaviour from 'd2l-activity-alignments/d2l-outcome-parser-behavior.js';

export class OutcomeProgressDetails extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior,
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		OutcomeParserBehaviour
	],
	PolymerElement
) {
	static get is() {
		return 'd2l-outcome-progress-details';
	};

	static get template() {
		let template = html`
			<style include="d2l-typography">
				.card {
					padding: 30px;
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					box-shadow: 0 4px 8px 0 rgba(0,0,0,0.03);
				}

				.close-button {
					display: block;
					float: right;
					margin-top: -14px;
				}

				h2 {
					margin: 12px 0;
				}

				h3 {
					margin: 24px 0;
				}
				
				h3 + hr {
					display: none;
				}

				.notation {
					@apply --d2l-body-small-text;
					margin-bottom: 6px;
				}
				
				.assessment-date {
					@apply --d2l-body-compact-text;
				}

				d2l-big-trend {
					margin-bottom: 18px;
				}
			</style>
			<siren-entity href="[[outcomeHref]]" token="[[token]]" entity="{{_outcomeEntity}}"></siren-entity>
			<div class="card">
				<div style="height: 18px;">
					<d2l-button-icon
						class="close-button"
						icon="d2l-tier1:close-large-thick"
						text="[[localize('close')]]"
						on-click="_close"
					></d2l-button-icon>
				</div>
				<h2>[[getOutcomeDescriptionPlainText(_outcomeEntity)]]</h2>
				<div class="notation">[[getOutcomeIdentifier(_outcomeEntity)]]</div>
				<h3>[[localize('trend')]]</h3>
				<d2l-big-trend
					href="[[href]]"
					token="[[token]]"
				></d2l-big-trend>
				<h3>[[localize('evidence')]]</h3>
				<template is="dom-repeat" items="[[_activities]]" as="activity">
					<template is="dom-repeat" items="[[_getDemonstrations(activity)]]" as="demonstration" >
						<hr>
						<div class="assessment-date">[[_getDateAssessed(demonstration)]]</div>
						<strong>[[_getActivityName(activity)]]</strong>
						<d2l-outcomes-level-of-achievements
							href="[[_getHref(demonstration)]]"
							token="[[token]]"
							read-only
						></d2l-outcomes-level-of-achievements>
					</template>
				</template>
			</div>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			outcomeHref: {
				type: String,
				value: null
			},
			_activities: {
				type: Array,
				computed: '_getActivities(entity)'
			}
		};
	}

	_getActivities(entity) {
		if (!entity) {
			return [];
		}
		return entity.getSubEntitiesByClass('user-progress-outcome-activity');
	}

	_getDemonstrations(activityEntity) {
		if (!activityEntity) {
			return [];
		}
		return activityEntity.getSubEntitiesByClasses(['demonstration', 'assessed']);
	}

	_getActivityName(activityEntity) {
		return activityEntity.properties.name;
	}

	_getDateAssessed(demonstrationEntity) {
		let date = Date.parse(demonstrationEntity.properties.dateAssessed);
		if (isNaN(date)) {
			return '';
		}
		//FIXME: need to get date formatting preferences from the LMS somehow?
		return new Date( date ).toDateString();
	}

	_getHref(sirenEntity) {
		if (!sirenEntity) {
			return null;
		}
		let selfLink = sirenEntity.getLink('self');
		return selfLink ? selfLink.href : null;
	}

	_close() {
		this.dispatchEvent( new CustomEvent( 'd2l-outcome-progress-details-closed' ) );
	}

};

customElements.define(OutcomeProgressDetails.is, OutcomeProgressDetails);
