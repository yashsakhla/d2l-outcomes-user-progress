import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * Nl lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangNlBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangNlBehavior = {
	nl: {
		'a11yCollapsed': 'collapsed',
		'a11yExpanded': 'expanded',
		'bigTrendAttemptsScreenReaderString': '{numAttempts, plural, =1 {Poging {attemptNames}} other {Pogingen {attemptNames} en {lastAttemptName}}}',
		'bigTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Poging} other {Pogingen}} {attemptNames}',
		'close': 'Sluiten',
		'evidence': 'Bewijs',
		'headingDate': 'Datum',
		'headingEvidence': 'Naam bewijs',
		'headingLoa': 'Niveau van de resultaten',
		'miniTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Poging} other {Pogingen}} {attemptNames}',
		'miniTrendScreenReaderText': 'Beoordeeld {numAssessed} {numAssessed, plural, =1 {time} other {times}}: {levelNames}',
		'nodeAriaText': 'Level {level}, group {state}, {content}, {position} of {count}.',
		'nodeAriaTextLeaf': 'Level {level}, {content}, {position} of {count}.',
		'nodeLoadingAriaText': 'Level {level}, loading, {position} of {count}.',
		'noEvidence': 'Deze {outcome, select, competencies {Competenties} expectations {Verwachtingen} objectives {Doelstellingen} outcomes {Resultaten} standards {Standaarden} other {Standaarden}} zijn nog niet beoordeeld',
		'noOutcomesInstructor': 'Om te beginnen met het volgen van de resultaten van {outcome, select, competencies {Competenties} expectations {Verwachtingen} objectives {Doelstellingen} outcomes {Resultaten} standards {Standaarden} other {Standaarden}}, pas {outcome, select, competencies {Competenties} expectations {Verwachtingen} objectives {Doelstellingen} outcomes {Resultaten} standards {Standaarden} other {Standaarden}} van cursus aan de beoordeelde activiteiten aan.',
		'noOutcomesStudent': 'Geen {outcome, select, competencies {Competenties} expectations {Verwachtingen} objectives {Doelstellingen} outcomes {Resultaten} standards {Standaarden} other {Standaarden}} zijn geëvalueerd.',
		'noScaleInstructor': 'Als u wilt kijken hoe ver een cursist is bij het bereiken van {outcome, select, competencies {Competenties} expectations {Verwachtingen} objectives {Doelstellingen} outcomes {Resultaten} standards {Standaarden} other {Standaarden}}, maakt en selecteert u een voltooiingsschaal.',
		'noScaleStudent': 'Er is geen schaal ingesteld om de resultaten van {outcome, select, competencies {Competenties} expectations {Verwachtingen} objectives {Doelstellingen} outcomes {Resultaten} standards {Standaarden} other {Standaarden}} te meten.',
		'noSearchResults': 'No results found for "{searchTerm}"',
		'notAssessed': 'Niet geëvalueerd',
		'outcomesListDescription': '{outcome, select, competencies {Competencies} expectations {Expectations} objectives {Objectives} outcomes {Outcomes} standards {Standards} other {Standards}} List',
		'outcomesListLoading': 'Loading',
		'outcomesListLoadingComplete': 'Loading complete',
		'numSearchResults': '{numResults} search {numResults, plural, =1 {result} other {results}} for "{searchTerm}"',
		'searchCleared': 'Search results cleared',
		'searchHint': 'Search...',
		'searchLabel': 'Search',
		'trend': 'Trend',
		'untitled': 'Zonder titel'
}
};
