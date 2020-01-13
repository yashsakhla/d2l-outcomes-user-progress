import '@polymer/polymer/polymer-legacy.js';
import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography.js';
import '../demonstration-activity-provider.js';
import '../entity-loader.js';
import * as hmConsts from 'd2l-hypermedia-constants';
import '../localize-behavior';
import './evidence-skeleton.js';
import './evidence-entry.js';

export class EvidenceList extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior,
		D2L.PolymerBehaviors.OutcomesUserProgress.DemonstrationActivityProviderBehavior
	],
	PolymerElement
) {

	static get is() {
		return 'd2l-evidence-list';
	}

	static get template() {
		const template = html`
			<style include="d2l-typography">
				.no-evidence {
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 8px;
					background-color: var(--d2l-color-regolith);
					color: var(--d2l-color-ferrite);
					padding: 15px;
					box-sizing: border-box;
					width: 100%;
				}
			</style>
			<div aria-busy="[[!entity]]">
				<template is="dom-repeat" items="[[getDemonstrationActivitiesHrefs(entity)]]" as="activityHref">
					<entity-loader
						href="[[activityHref]]"
						token="[[token]]"
						entity-map="{{demonstrationProviderActivities}}"
					></entity-loader>
				</template>
				<template is="dom-if" if="[[entity]]">
					<template is="dom-repeat" items="[[_evidence]]" as="info">
						<d2l-evidence-entry
							type="[[info.type]]"
							name="[[info.name]]"
							date="[[info.date]]"
							level-href="[[info.levelHref]]"
							feedback-href="[[info.feedbackHref]]"
							token="[[token]]"
							last="[[info.isLast]]"
							link="[[info.link]]"
						></d2l-evidence-entry>
					</template>
					<div class="no-evidence" hidden="[[!_isEmpty(_evidence)]]">
						[[localize('noEvidence', 'outcome', outcomeTerm)]]
					</div>
				</template>
				<template is="dom-if" if="[[!entity]]">
					<d2l-evidence-skeleton></d2l-evidence-skeleton>
				</template>
			</div>
		`;
		template.setAttribute('strip-whitespace', true);
		return template;
	}

	static get properties() {
		return {
			outcomeTerm: String,
			_evidence: {
				type: Array,
				computed: '_getEvidence(entity, demonstrationProviderActivities)'
			}
		};
	}

	_isEmpty(array) {
		return !array || !array.length;
	}

	_getEvidence(entity, demonstrationProviderActivities) {
		if (!entity || !entity.entities) {
			return [];
		}

		const evidenceList = [];
		const activities = entity.getSubEntitiesByClass(hmConsts.Classes.userProgress.outcomes.activity);
		activities.forEach(activity => {
			if (!activity.entities) {
				return;
			}
			const demonstrations = activity.getSubEntitiesByClasses([
				hmConsts.Classes.outcomes.demonstration,
				hmConsts.Classes.outcomes.assessed
			]);
			const submissionLinkFromRootActivity = activity.getLink('https://user-progress.api.brightspace.com/rels/submission-link') || {};
			demonstrations.forEach(demonstration => {
				const level = demonstration.getSubEntityByClasses([
					hmConsts.Classes.outcomes.demonstratableLevel,
					hmConsts.Classes.outcomes.selected
				]);
				if (!level) {
					return;
				}
				const levelLink = level.getLink(hmConsts.Rels.Achievements.level);
				if (!levelLink || !levelLink.href) {
					return;
				}

				const feedbackLink = demonstration.getLink(hmConsts.Rels.UserProgress.feedback) || {};
				const demonstrationActivityLink = demonstration.getLink(hmConsts.Rels.Activities.userActivityUsage) || {};

				let activityName = activity.properties.name;
				let submissionLinkFromDemonstrationActivity = null;
				const demonstrationActivity = demonstrationProviderActivities[ demonstrationActivityLink.href ];

				if (demonstrationActivity) {
					submissionLinkFromDemonstrationActivity = demonstrationActivity.getLink('https://user-progress.api.brightspace.com/rels/submission-link');

					const nameEntity = demonstrationActivity.getSubEntityByClasses(['user-activity-name']);
					if (nameEntity) {
						activityName = nameEntity.properties.longText;
					}
				}
				const submissionLink = submissionLinkFromDemonstrationActivity || submissionLinkFromRootActivity || null;

				if (demonstrationActivity) {
					evidenceList.push({
						type: activity.properties.type,
						name: (!activityName || activityName.trim() === '' ? this.localize('untitled') : activityName),
						date: this._getEvidenceDate(activity, demonstration),
						levelHref: levelLink.href,
						feedbackHref: feedbackLink.href || null,
						link: submissionLink.href
					});
				}
			});
		});

		evidenceList.reverse();

		if (evidenceList.length) {
			evidenceList[evidenceList.length - 1].isLast = true;
		}

		return evidenceList;
	}

	_getEvidenceDate(activityEntity, demonstrationEntity) {
		if (activityEntity.properties.dueDate
			&& new Date(activityEntity.properties.dueDate) <= new Date()
		) {
			return activityEntity.properties.dueDate;
		}

		return demonstrationEntity.properties.dateAssessed;
	}

}

customElements.define(EvidenceList.is, EvidenceList);
