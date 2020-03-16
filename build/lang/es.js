import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * Es lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangEsBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangEsBehavior = {
	es: {
		'a11yCollapsed': 'collapsed',
		'a11yExpanded': 'expanded',
		'bigTrendAttemptsScreenReaderString': '{numAttempts, plural, =1 {Intento {attemptNames}} other {Intentos {attemptNames} y {lastAttemptName}}}',
		'bigTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Intento} other {Intentos}} {attemptNames}',
		'close': 'Cerrar',
		'evidence': 'Prueba',
		'headingDate': 'Fecha',
		'headingEvidence': 'Nombre de la prueba',
		'headingLoa': 'Nivel de logro',
		'miniTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Intento} other {Intentos}} {attemptNames}',
		'miniTrendScreenReaderText': 'Se evaluó {numAssessed} {numAssessed, plural, =1 {hora} other {horas}}: {levelNames}',
		'nodeAriaTextGroup': 'Group {state}',
		'nodeAriaTextLevel': 'Level {level}',
		'nodeAriaTextPosition': '{position} of {count}',
		'noEvidence': 'Este {outcome, select, competencies {competencia} expectations {expectativa} objectives {objetivo} outcomes {resultado} standards {estándar} other {estándar}} aún no se ha evaluado',
		'noOutcomesInstructor': 'Para comenzar a realizar el seguimiento del logro de {outcome, select, competencies {competencias} expectations {expectativas} objectives {objetivos} outcomes {resultados} standards {estándares} other {estándares}}, debe alinear el curso {outcome, select, competencies {competencias} expectations {expectativas} objectives {objetivos} outcomes {resultados} standards {estándares} other {estándares}} con las actividades evaluadas.',
		'noOutcomesStudent': '{outcome, select, competencies {competencias} expectations {expectativas} objectives {objetivos} outcomes {resultados} standards {estándares} other {estándares}} no se han evaluado.',
		'noScaleInstructor': 'Con el fin de ver el progreso del estudiante para lograr este {outcome, select, competencies {competencia} expectations {expectativa} objectives {objetivo} outcomes {resultado} standards {estándar} other {estándar}}, cree y seleccione una escala de logros.',
		'noScaleStudent': 'No se ha establecido ninguna escala para medir el logro de {outcome, select, competencies {competencias} expectations {expectativas} objectives {objetivos} outcomes {resultados} standards {estándares} other {estándares}}.',
		'noSearchResults': 'No results found for "{searchTerm}"',
		'notAssessed': 'Sin evaluación',
		'numSearchResults': '{numResults} search {numResults, plural, =1 {result} other {results}} for "{searchTerm}"',
		'outcomesListDescription': '{outcome, select, competencies {Competencies} expectations {Expectations} objectives {Objectives} outcomes {Outcomes} standards {Standards} other {Standards}} List',
		'outcomesListLoading': 'Loading',
		'outcomesListLoadingComplete': 'Loading complete',
		'searchCleared': 'Search results cleared',
		'searchHint': 'Search...',
		'searchLabel': 'Search',
		'trend': 'Tendencia',
		'untitled': 'Sin título'
}
};
