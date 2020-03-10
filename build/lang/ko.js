import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * Ko lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangKoBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangKoBehavior = {
	ko: {
		'bigTrendAttemptsScreenReaderString': '{numAttempts, plural, =1 {Attempt {attemptNames}} other {Attempts {attemptNames} 및 {lastAttemptName}}}',
		'bigTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Attempt} other {Attempts}} {attemptNames}',
		'close': '닫기',
		'evidence': '근거',
		'headingDate': '날짜',
		'headingEvidence': '근거 이름',
		'headingLoa': '성취 수준',
		'miniTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Attempt} other {Attempts}} {attemptNames}',
		'miniTrendScreenReaderText': '평가됨 {numAssessed} {numAssessed, plural, =1 {time} other {times}}: {levelNames}',
		'noEvidence': 'This {outcome, select, competencies {competency} expectations {expectation} objectives {objective} outcomes {outcome} standards {standard} other {standard}} has not yet been assessed',
		'noOutcomesInstructor': 'To start tracking achievement of {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}}, align course {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}} to assessed activities.',
		'noOutcomesStudent': 'No {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}} have been evaluated.',
		'noScaleInstructor': 'To view learner progress towards achieving this {outcome, select, competencies {competency} expectations {expectation} objectives {objective} outcomes {outcome} standards {standard} other {standard}}, create and select an achievement scale.',
		'noScaleStudent': 'No scale has been set to measure achievement of {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}}.',
		'noSearchResults': 'No results found for "@{searchTerm}@"',
		'notAssessed': '평가되지 않음',
		'numSearchResults': '{numResults} search {numResults, plural, =1 {result} other {results}} for "@{searchTerm}@"',
		'searchCleared': 'Search results cleared',
		'searchHint': 'search...',
		'searchLabel': 'Search',
		'trend': '추세',
		'untitled': '제목 없음'
	}
};
