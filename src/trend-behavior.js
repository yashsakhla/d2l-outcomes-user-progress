import 'd2l-polymer-siren-behaviors/store/entity-behavior';
import * as hmConsts from 'd2l-hypermedia-constants';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
/** @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehavior */
D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehaviorImpl = {
	properties: {
		levels: {
			type: Object,
			value: {}
		},
		trendGroups: {
			type: Array,
			value: []
		}
	},

	observers: [
		'_onEntityChanged(entity)'
	],

	_onEntityChanged: function(entity) {
		const levels = {};
		const trendGroups = [];

		if (entity && entity.hasClass(hmConsts.Classes.userProgress.outcomes.activities) && entity.entities) {
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
				trendGroups.push(group);
			});
		}

		this.levels = levels;
		this.trendGroups = trendGroups;
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
					attempts.push(levelId);
				}
			});

			if (dueDate !== null || attempts.length > 0) {
				acc.push({
					attempts: attempts,
					date: dueDate || demonstrationDate,
					name: name
				});
			}

			return acc;
		}, trendGroups);

		return trendGroups;
	}
};
/** @polymerBehavior */
D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehavior = [
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.TrendBehaviorImpl
];
