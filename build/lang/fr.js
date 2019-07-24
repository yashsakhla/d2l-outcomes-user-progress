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
    "miniTrendScreenReaderText": "Évalué {numAssessed} {numAssessed, plural, one {fois} other {fois}}: {levelNames}",
    "notAssessed": "Pas évalué",
    "untitled": "Sans titre",
    "trend": "Tendance",
    "evidence": "Preuve",
    "close": "Fermer",
    "noEvidence": "Cette {outcome, select, competencies {compétence} expectations {attente} objectives {objectif} outcomes {résultat} standards {norme} other {norme}} n'a pas encore été évaluée",
    "noOutcomes": "{outcome, select, competencies {Aucune compétence} expectations {Aucune attente} objectives {Aucun objectif} outcomes {Aucun résultat} standards {Aucune norme} other {Aucune norme}} n'a été évaluée.",
    "noScale": "Aucune échelle n'a été définie pour mesurer l'atteinte des {outcome, select, competencies {compétences} expectations {attentes} objectives {objectifs} outcomes {résultats} standards {normes} other {normes}}."
}
};
