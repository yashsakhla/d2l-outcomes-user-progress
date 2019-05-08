export const getLevelData = function(setNumber) {
    if (setNumber === 1) {
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
    }

    return [];
}