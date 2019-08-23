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
    "bigTrendAttemptsScreenReaderString": "{numAttempts, plural, one {Tentative {attemptNames}} other {Tentatives {attemptNames} et {lastAttemptName}}}",
    "bigTrendAttemptsTooltipString": "{numAttempts, plural, one {Tentative} other {Tentatives}} {attemptNames}",
    "headingDate": "Date",
    "headingEvidence": "Nom de la preuve",
    "headingLoa": "Niveau atteint",
    "miniTrendAttemptsTooltipString": "{numAttempts, plural, one {Attempt} other {Attempts}} {attemptNames}",
    "miniTrendScreenReaderText": "Évalué {numAssessed} {numAssessed, plural, one {fois} other {fois}}: {levelNames}",
    "notAssessed": "Pas évalué",
    "untitled": "Sans titre",
    "trend": "Tendance",
    "evidence": "Preuve",
    "close": "Fermer",
    "noEvidence": "Cette {outcome, select, competencies {compétence} expectations {attente} objectives {objectif} outcomes {résultat} standards {norme} other {norme}} n'a pas encore été évaluée",
    "noOutcomesStudent": "No {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}} have been evaluated.",
    "noOutcomesInstructor": "To start tracking achievement of {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}}, align course {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}} to assessed activities.",
    "noScaleStudent": "No scale has been set to measure achievement of {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}}.",
    "noScaleInstructor": "To view learner progress towards achieving this {outcome, select, competencies {competency} expectations {expectation} objectives {objective} outcomes {outcome} standards {standard} other {standard}}, create and select an achievement scale."
}
};
