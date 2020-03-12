import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * En lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangEnBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangEnBehavior = {
	en: {
		'bigTrendAttemptsScreenReaderString': '{numAttempts, plural, =1 {Attempt {attemptNames}} other {Attempts {attemptNames} and {lastAttemptName}}}',
		'bigTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Attempt} other {Attempts}} {attemptNames}',
		'headingDate': 'Date',
		'headingEvidence': 'Evidence Name',
		'headingLoa': 'Level of Achievement',
		'miniTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Attempt} other {Attempts}} {attemptNames}',
		'miniTrendScreenReaderText': 'Assessed {numAssessed} {numAssessed, plural, =1 {time} other {times}}: {levelNames}',
		'notAssessed': 'Not assessed',
		'untitled': 'Untitled',
		'trend': 'Trend',
		'evidence': 'Evidence',
		'close': 'Close',
		'noEvidence': 'This {outcome, select, competencies {competency} expectations {expectation} objectives {objective} outcomes {outcome} standards {standard} other {standard}} has not yet been assessed',
		'noOutcomesStudent': 'No {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}} have been evaluated.',
		'noOutcomesInstructor': 'To start tracking achievement of {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}}, align course {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}} to assessed activities.',
		'noScaleStudent': 'No scale has been set to measure achievement of {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}}.',
		'noScaleInstructor': 'To view learner progress towards achieving this {outcome, select, competencies {competency} expectations {expectation} objectives {objective} outcomes {outcome} standards {standard} other {standard}}, create and select an achievement scale.',
		'outcomesListDescription': '{outcome, select, competencies {Competencies} expectations {Expectations} objectives {Objectives} outcomes {Outcomes} standards {Standards} other {Standards}} List',
		'outcomesListLoading': 'Loading',
		'outcomesListLoadingComplete': 'Loading complete',
		'searchCleared': 'Search results cleared',
		'searchHint': 'Search...',
		'searchLabel': 'Search',
		'numSearchResults': '{numResults} search {numResults, plural, =1 {result} other {results}} for "{searchTerm}"',
		'noSearchResults': 'No results found for "{searchTerm}"',
		'a11yCollapsed': 'collapsed',
		'a11yExpanded': 'expanded',
		'nodeAriaText': 'Level {level}, group {state}, {content}, {position} of {count}.',
		'nodeAriaTextLeaf': 'Level {level}, {content}, {position} of {count}.',
		'nodeLoadingAriaText': 'Level {level}, loading, {position} of {count}.'
	}
};
