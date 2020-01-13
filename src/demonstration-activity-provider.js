import 'd2l-polymer-siren-behaviors/store/entity-behavior';
import * as hmConsts from 'd2l-hypermedia-constants';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
/** @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.DemonstrationActivityProviderBehavior */
D2L.PolymerBehaviors.OutcomesUserProgress.DemonstrationActivityProviderBehaviorImpl = {

	properties: {
		demonstrationProviderActivities: {
			type: Object,
			value: {}
		}
	},

	created() {
		this.demonstrationProviderActivities = {};
	},

	getDemonstrationActivitiesHrefs(entity) {
		if (!entity) {
			return [];
		}

		const activities = entity.getSubEntitiesByClass('user-progress-outcome-activity');

		const uauHrefs = [];
		activities.forEach(activity => {
			const demonstrations = activity.getSubEntitiesByClasses([
				hmConsts.Classes.outcomes.demonstration,
				hmConsts.Classes.outcomes.assessed
			]);

			if (!demonstrations) {
				return;
			}
			demonstrations.forEach(demonstration => {
				const demonstrationActivityLink = demonstration.getLink(hmConsts.Rels.Activities.userActivityUsage);
				if (!demonstrationActivityLink || !demonstrationActivityLink.href) {
					return;
				}

				uauHrefs.push(demonstrationActivityLink.href);
			});
		});

		return uauHrefs;
	}
};
/** @polymerBehavior */
D2L.PolymerBehaviors.OutcomesUserProgress.DemonstrationActivityProviderBehavior = [
	D2L.PolymerBehaviors.OutcomesUserProgress.DemonstrationActivityProviderBehaviorImpl
];
