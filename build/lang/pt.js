import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * Pt lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangPtBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangPtBehavior = {
	pt: {
		'a11yCollapsed': 'collapsed',
		'a11yExpanded': 'expanded',
		'bigTrendAttemptsScreenReaderString': '{numAttempts, plural, =1 {Tentativa {attemptNames}} other {Tentativas {attemptNames} e {lastAttemptName}}}',
		'bigTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Tentativa} other {Tentativas}} {attemptNames}',
		'close': 'Fechar',
		'evidence': 'Evidência',
		'headingDate': 'Data',
		'headingEvidence': 'Nome da Evidência',
		'headingLoa': 'Nível de Realização',
		'miniTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Tentativa} other {Tentativas}} {attemptNames}',
		'miniTrendScreenReaderText': 'Usuário avaliado {numAssessed} {numAssessed, plural, =1 {vez} other {vezes}}: {levelNames}',
		'nodeAriaText': 'Level {level}, group {state}, {content}, {position} of {count}.',
		'nodeAriaTextLeaf': 'Level {level}, {content}, {position} of {count}.',
		'nodeLoadingAriaText': 'Level {level}, loading, {position} of {count}.',
		'noEvidence': 'Este(a) {outcome, select, competencies {competência} expectations {expectativa} objectives {objetivo} outcomes {resultado} standards {padrão} other {padrão}} ainda não foi avaliado(a)',
		'noOutcomesInstructor': 'Para começar a acompanhar a realização dos(as) {outcome, select, competencies {competências} expectations {expectativas} objectives {objetivos} outcomes {resultados} standards {padrões} other {padrões}}, alinhe os(as) {outcome, select, competencies {competências} expectations {expectativas} objectives {objetivos} outcomes {resultados} standards {padrões} other {padrões}} do curso para as atividades avaliadas.',
		'noOutcomesStudent': 'Nenhum(a) {outcome, select, competencies {competência} expectations {expectativa} objectives {objetivo} outcomes {resultado} standards {padrão} other {padrão}} foi avaliado(a).',
		'noScaleInstructor': 'Para ver o progresso do aluno em relação à realização deste(a) {outcome, select, competencies {competência} expectations {expectativa} objectives {objetivo} outcomes {resultado} standards {padrão} other {padrão}}, crie e selecione uma escala de realização.',
		'noScaleStudent': 'Nenhuma escala foi definida para medir a realização de {outcome, select, competencies {competências} expectations {expectativas} objectives {objetivos} outcomes {resultados} standards {padrões} other {padrões}}.',
		'noSearchResults': 'No results found for "{searchTerm}"',
		'notAssessed': 'Não avaliado',
		'outcomesListDescription': '{outcome, select, competencies {Competencies} expectations {Expectations} objectives {Objectives} outcomes {Outcomes} standards {Standards} other {Standards}} List',
		'outcomesListLoading': 'Loading',
		'outcomesListLoadingComplete': 'Loading complete',
		'numSearchResults': '{numResults} search {numResults, plural, =1 {result} other {results}} for "{searchTerm}"',
		'searchCleared': 'Search results cleared',
		'searchHint': 'Search...',
		'searchLabel': 'Search',
		'trend': 'Tendência',
		'untitled': 'Sem Título'
	}
};
