import 'd2l-polymer-siren-behaviors/store/entity-behavior';
import * as hmConsts from 'd2l-hypermedia-constants';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
/** @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehavior */
D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehaviorImpl = {
	properties: {
		trendData: {
			type: Object,
			value: null
		}
	},

	observers: [
		'_onEntityChanged(entity)'
	],

	_onEntityChanged: function(entity) {
		const levels = {};
		const groups = [];

		if (
			!entity
			|| !entity.hasClass(hmConsts.Classes.userProgress.outcomes.activities)
		) {
			this.trendData = null;
			return;
		}

		if (entity.entities) {
			const levelEntities = entity.getSubEntitiesByClass(hmConsts.Classes.outcomes.levelOfAchievement);
			levelEntities.forEach((levelEntity, index) => {
				levels[levelEntity.properties.levelId] = {
					name: levelEntity.properties.name,
					color: levelEntity.properties.color,
					score: (index + 1)
				};
			});

			const activityEntities = entity.getSubEntitiesByClass(hmConsts.Classes.userProgress.outcomes.activity);
			const parsedGroups = this._parseTrendGroups(activityEntities, levels);
			parsedGroups.forEach(group => {
				groups.push(group);
			});
		}

		this.trendData = {
			levels,
			groups
		};
	},
	
	_parseTrendGroups: function(activityEntities, validLevels) {
		let trendGroups = [];

		trendGroups = activityEntities.reduce((acc, cur) => {
			const name = cur.properties.name || null;
			const dueDate = cur.properties.dueDate ? new Date(cur.properties.dueDate) : null;
			const demonstrations = cur.entities ? cur.getSubEntitiesByClasses([hmConsts.Classes.outcomes.demonstration, hmConsts.Classes.outcomes.assessed]) : [];
			const attempts = [];

			let demonstrationDate = null;
			demonstrations.forEach(demonstration => {
				const assessedDate = new Date(demonstration.properties.dateAssessed);
				const levelEntity = demonstration.getSubEntityByClasses([hmConsts.Classes.outcomes.demonstratableLevel, hmConsts.Classes.outcomes.selected]);
				const levelId = levelEntity.properties.levelId;

				if (validLevels[levelId]) {
					demonstrationDate = demonstrationDate || assessedDate;
					attempts.push( { 
						levelId: levelId,
						demonstrationActivityHref: demonstration.getLink('https://activities.api.brightspace.com/rels/user-activity-usage').href
					} );
				}
			});

			const groupDate = dueDate && dueDate <= new Date() ? dueDate : demonstrationDate || dueDate;
			if (dueDate !== null || attempts.length > 0) {
				acc.push({
					attempts: attempts,
					date: groupDate,
					name: name
				});
			}

			return acc;
		}, trendGroups);

		return trendGroups.sort((a, b) => a.date.getTime() - b.date.getTime());
	}
};
/** @polymerBehavior */
D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehavior = [
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehaviorImpl
];
