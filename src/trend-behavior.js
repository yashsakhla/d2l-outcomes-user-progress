import 'd2l-polymer-siren-behaviors/store/entity-behavior';

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

        if (entity && entity.hasClass('outcomes-progress') && entity.entities) {
            const levelEntities = entity.getSubEntitiesByClass('level-of-achievment');
            levelEntities.forEach((levelEntity, index) => {
                levels[levelEntity.properties.levelId] = {
                    name: levelEntity.properties.name,
                    color: levelEntity.properties.color,
                    score: (index + 1)
                };
            });          

            const activityEntities = entity.getSubEntitiesByClass('user-progress-outcome-activity');
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
            const demonstrations = cur.entities ? cur.getSubEntitiesByClasses(['demonstration', 'assessed']) : [];
            const attempts = [];
            
            let demonstrationDate = null;
            demonstrations.forEach(demonstration => {
                const assessedDate = new Date(demonstration.properties.dateAssessed);
                const levelEntity = demonstration.getSubEntityByClasses(['demonstratable-level', 'selected']);
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
