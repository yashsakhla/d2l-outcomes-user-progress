import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * Fr lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangFrBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangFrBehavior = {
	fr: {
    "bigTrendAttemptsScreenReaderString": "{numAttempts, plural, one {Attempt {attemptNames}} other {Attempts {attemptNames} and {lastAttemptName}}}",
    "bigTrendAttemptsTooltipString": "{numAttempts, plural, one {Attempt} other {Attempts}} {attemptNames}",
    "headingDate": "Date",
    "headingEvidence": "Evidence Name",
    "headingLoa": "Level of Achievement",
    "miniTrendScreenReaderText": "Assessed {numAssessed} {numAssessed, plural, one {time} other {times}}: {levelNames}",
    "notAssessed": "Not assessed",
    "untitled": "Untitled",
    "trend": "Trend",
    "evidence": "Evidence",
    "close": "Fermer",
    "noEvidence": "This {outcome, select, competencies {competency} expectations {expectation} objectives {objective} outcomes {outcome} standards {standard} other {standard}} has not yet been assessed",
    "noOutcomes": "No {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}} have been evaluated.",
    "noScale": "No scale has been set to measure achievement of {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}}."
}
};
