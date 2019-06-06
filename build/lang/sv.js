import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * sv lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangSvBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangSvBehavior = {
    sv: {
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
    "close": "Stäng",
    "noEvidence": "This {outcome, select, competencies {competency} expectations {expectation} objectives {objective} outcomes {outcome} standards {standard} other {standard}} has not yet been assessed"
}
};
