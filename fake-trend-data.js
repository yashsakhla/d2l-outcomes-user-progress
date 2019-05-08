export const getLevelData = function(setNumber) {
    if (setNumber === 1) {
        return {
            'abc111': {
                score: 1,
                color: '#777',
                name: 'Level 1'
            },
            'abc222': {
                score: 2,
                color: '#88CC55',
                name: 'Level 2'
            }
        };
    } else if (setNumber === 2) {
        return {
            'abc111': {
                score: 1,
                color: '#ff4000',
                name: 'Level 1'
            },
            'abc222': {
                score: 2,
                color: '#ffcc00',
                name: 'Level 2'
            },
            'abc333': {
                score: 3,
                color: '#88CC55',
                name: 'Level 3'
            }
        };
    } else if (setNumber === 3) {
        return {
            'abc111': {
                score: 1,
                color: '#777',
                name: 'Level 1'
            },
            'abc222': {
                score: 2,
                color: '#777',
                name: 'Level 2'
            },
            'abc333': {
                score: 3,
                color: '#88CC55',
                name: 'Level 3'
            },
            'abc444': {
                score: 4,
                color: '#88CC55',
                name: 'Level 4'
            }
        };
    } else if (setNumber === 4) {
        return {
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
        };
    } else if (setNumber === 5) {
        return {
            'abc111': {
                score: 1,
                color: '#ff0000',
                name: 'Level 1'
            },
            'abc222': {
                score: 2,
                color: '#ff0000',
                name: 'Level 2'
            },
            'abc333': {
                score: 3,
                color: '#ff4000',
                name: 'Level 3'
            },
            'abc444': {
                score: 4,
                color: '#ff4000',
                name: 'Level 4'
            },
            'abc555': {
                score: 5,
                color: '#ff8000',
                name: 'Level 5'
            },
            'abc666': {
                score: 6,
                color: '#ff8000',
                name: 'Level 6'
            },
            'abc777': {
                score: 7,
                color: '#ffbf00',
                name: 'Level 7'
            },
            'abc888': {
                score: 8,
                color: '#ffbf00',
                name: 'Level 8'
            },
            'abc999': {
                score: 9,
                color: '#ffff00',
                name: 'Level 9'
            },
            'abc1010': {
                score: 10,
                color: '#ffff00',
                name: 'Level 10'
            },
            'abc1111': {
                score: 11,
                color: '#bfff00',
                name: 'Level 11'
            },
            'abc1212': {
                score: 12,
                color: '#bfff00',
                name: 'Level 12'
            },
            'abc1313': {
                score: 13,
                color: '#73e600',
                name: 'Level 13'
            },
            'abc1414': {
                score: 14,
                color: '#73e600',
                name: 'Level 14'
            },
            'abc1515': {
                score: 15,
                color: '#39e600',
                name: 'Level 15'
            },
            'abc1616': {
                score: 16,
                color: '#39e600',
                name: 'Level 16'
            },
            'abc1717': {
                score: 17,
                color: '#00cc00',
                name: 'Level 17'
            },
            'abc1818': {
                score: 18,
                color: '#00cc00',
                name: 'Level 18'
            },
            'abc1919': {
                score: 19,
                color: '#00cc33',
                name: 'Level 19'
            },
            'abc2020': {
                score: 20,
                color: '#00cc33',
                name: 'Level 20'
            }
        };
    }

    return {
        'abc111': {
            score: 1,
            color: '#ff4000',
            name: 'Level 1'
        },
        'abc222': {
            score: 2,
            color: '#ffcc00',
            name: 'Level 2'
        },
        'abc333': {
            score: 3,
            color: '#88CC55',
            name: 'Level 3'
        }
    };
};

export const getTrendData = function(setNumber) {
    if (setNumber === 1) {
        return [
            {
                activityId: '123',
                attempts: [ 'abc111' ],
                date: '1535774400',
                name: 'Activity 1'
            },
            {
                activityId: '124',
                attempts: [ 'abc111' ],
                date: '1538366400',
                name: 'Activity 2'
            },
            {
                activityId: '125',
                attempts: [ 'abc111', 'abc222' ],
                date: '1538366401',
                name: 'Activity 3'
            },
            {
                activityId: '126',
                attempts: [ 'abc111' ],
                date: '1538366402',
                name: 'Activity 4'
            },
            {
                activityId: '127',
                attempts: [ 'abc222' ],
                date: '1541044800',
                name: 'Activity 5'
            },
            {
                activityId: '128',
                attempts: [ 'abc222' ],
                date: '1541044801',
                name: 'Activity 6'
            }
        ];
    } else if (setNumber === 2) {
        return [
            {
                activityId: '123',
                attempts: [ 'abc111' ],
                date: '1535774400',
                name: null
            },
            {
                activityId: '124',
                attempts: [ ],
                date: '1535774401',
                name: 'Activity 2'
            },
            {
                activityId: '125',
                attempts: [ 'abc222' ],
                date: '1535774402',
                name: 'Activity 3'
            }
        ];
    } else if (setNumber === 3) {
        return [
            {
                activityId: '123',
                attempts: [ 'abc111' ],
                date: '1530417600',
                name: 'Activity 1'
            },
            {
                activityId: '124',
                attempts: [ 'abc222' ],
                date: '1530417600',
                name: 'Activity 2'
            },
            {
                activityId: '125',
                attempts: [ 'abc222', 'abc333' ],
                date: '1530417600',
                name: 'Activity 3'
            },
            {
                activityId: '126',
                attempts: [ 'abc222' ],
                date: '1530417600',
                name: 'Activity 4'
            },
            {
                activityId: '127',
                attempts: [ 'abc444' ],
                date: '1530417600',
                name: 'Activity 5'
            },
            {
                activityId: '128',
                attempts: [ 'abc333' ],
                date: '1533096000',
                name: 'Activity 6'
            },
            {
                activityId: '129',
                attempts: [ 'abc444' ],
                date: '1533096000',
                name: 'Activity 7'
            },
            {
                activityId: '130',
                attempts: [ 'abc222', 'abc333' ],
                date: '1533096000',
                name: 'Activity 8'
            },
            {
                activityId: '131',
                attempts: [ 'abc444' ],
                date: '1533096000',
                name: 'Activity 9'
            },
            {
                activityId: '132',
                attempts: [ 'abc333' ],
                date: '1533096000',
                name: 'Activity 10'
            },
            {
                activityId: '133',
                attempts: [ 'abc444' ],
                date: '1535774400',
                name: 'Activity 11'
            },
            {
                activityId: '134',
                attempts: [ 'abc111' ],
                date: '1535774400',
                name: 'Activity 12'
            },
            {
                activityId: '135',
                attempts: [ 'abc444' ],
                date: '1535774400',
                name: 'Activity 13'
            },
            {
                activityId: '136',
                attempts: [ 'abc333' ],
                date: '1535774400',
                name: 'Activity 14'
            },
            {
                activityId: '137',
                attempts: [ 'abc333' ],
                date: '1535774400',
                name: 'Activity 15'
            },
            {
                activityId: '138',
                attempts: [ 'abc111' ],
                date: '1535774400',
                name: 'Activity 16'
            },
            {
                activityId: '139',
                attempts: [ 'abc222' ],
                date: '1538366400',
                name: 'Activity 17'
            },
            {
                activityId: '140',
                attempts: [ 'abc222', 'abc333' ],
                date: '1538366401',
                name: 'Activity 18'
            },
            {
                activityId: '141',
                attempts: [ 'abc222' ],
                date: '1538366402',
                name: 'Activity 19'
            },
            {
                activityId: '142',
                attempts: [ 'abc444' ],
                date: '1541044800',
                name: 'Activity 20'
            },
            {
                activityId: '143',
                attempts: [ 'abc333' ],
                date: '1541044801',
                name: 'Activity 21'
            },
            {
                activityId: '144',
                attempts: [ 'abc444' ],
                date: '1541044802',
                name: 'Activity 22'
            },
            {
                activityId: '145',
                attempts: [ 'abc222', 'abc333' ],
                date: '1541044803',
                name: 'Activity 23'
            },
            {
                activityId: '146',
                attempts: [ 'abc444' ],
                date: '1541044804',
                name: 'Activity 24'
            },
            {
                activityId: '147',
                attempts: [ 'abc333' ],
                date: '1541044805',
                name: 'Activity 25'
            },
            {
                activityId: '148',
                attempts: [ 'abc444' ],
                date: '1543640400',
                name: 'Activity 26'
            },
            {
                activityId: '149',
                attempts: [ 'abc111' ],
                date: '1543640401',
                name: 'Activity 27'
            },
            {
                activityId: '150',
                attempts: [ 'abc444' ],
                date: '1543640402',
                name: 'Activity 28'
            },
            {
                activityId: '151',
                attempts: [ 'abc333' ],
                date: '1543640403',
                name: 'Activity 29'
            },
            {
                activityId: '152',
                attempts: [ 'abc333' ],
                date: '1543640404',
                name: 'Activity 30'
            }
        ];
    } else if (setNumber === 4) {
        return [
            {
                activityId: '123',
                attempts: [ 'abc111' ],
                date: '1546318800',
                name: 'Intro Activity'
            },
            {
                activityId: '124',
                attempts: [ 'abc222', 'abc222' ],
                date: '1546318801'
            },
            {
                activityId: '125',
                attempts: [ ],
                date: '1548997200',
                name: 'Book Report'
            },
            {
                activityId: '126',
                attempts: [ 'abc333' ],
                date: '1551416400',
                name: 'Assembly Assignment'
            },
            {
                activityId: '127',
                attempts: [ 'abc222', 'abc444', 'abc222' ],
                date: '1551416401',
                name: 'Learning Numbers'
            },
            {
                activityId: '128',
                attempts: [ 'abc555' ],
                date: '1551416402',
                name: 'Happy Pizza'
            }
        ];
    } else if (setNumber === 5) {
        return [
            {
                activityId: '123',
                attempts: [ 'abc444' ],
                date: '1530417600',
                name: 'Activity 1'
            },
            {
                activityId: '124',
                attempts: [ 'abc888' ],
                date: '1530417600',
                name: 'Activity 2'
            },
            {
                activityId: '125',
                attempts: [ 'abc222', 'abc999' ],
                date: '1530417600',
                name: 'Activity 3'
            },
            {
                activityId: '126',
                attempts: [ 'abc555', 'abc444' ],
                date: '1530417600',
                name: 'Activity 4'
            },
            {
                activityId: '127',
                attempts: [ 'abc1111' ],
                date: '1530417600',
                name: 'Activity 5'
            },
            {
                activityId: '128',
                attempts: [ 'abc1212', 'abc1818' ],
                date: '1533096000',
                name: 'Activity 6'
            },
            {
                activityId: '129',
                attempts: [ 'abc1616' ],
                date: '1533096000',
                name: 'Activity 7'
            },
            {
                activityId: '130',
                attempts: [ 'abc999' ],
                date: '1533096000',
                name: 'Activity 8'
            },
            {
                activityId: '131',
                attempts: [ 'abc555', 'abc2020' ],
                date: '1533096000',
                name: 'Activity 9'
            },
            {
                activityId: '132',
                attempts: [ 'abc1313' ],
                date: '1533096000',
                name: 'Activity 10'
            },
            {
                activityId: '133',
                attempts: [ 'abc444' ],
                date: '1535774400',
                name: 'Activity 11'
            },
            {
                activityId: '134',
                attempts: [ 'abc1212' ],
                date: '1535774400',
                name: 'Activity 12'
            },
            {
                activityId: '135',
                attempts: [ 'abc1717' ],
                date: '1535774400',
                name: 'Activity 13'
            },
            {
                activityId: '136',
                attempts: [ 'abc333', 'abc888' ],
                date: '1535774400',
                name: 'Activity 14'
            },
            {
                activityId: '137',
                attempts: [ 'abc111' ],
                date: '1535774400',
                name: 'Activity 15'
            }
        ];
    }

    return [];
}