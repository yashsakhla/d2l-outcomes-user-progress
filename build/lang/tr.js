import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * Tr lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangTrBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangTrBehavior = {
	tr: {
		'bigTrendAttemptsScreenReaderString': '{numAttempts, plural, =1 {Deneme {attemptNames}} other {Deneme {attemptNames} and {lastAttemptName}}}',
		'bigTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Deneme} other {Deneme}} {attemptNames}',
		'close': 'Kapat',
		'evidence': 'Kanıt',
		'headingDate': 'Tarih',
		'headingEvidence': 'Kanıt Adı',
		'headingLoa': 'Başarı Seviyesi',
		'miniTrendAttemptsTooltipString': '{numAttempts, plural, =1 {Deneme} other {Deneme}} {attemptNames}',
		'miniTrendScreenReaderText': 'Assessed {numAssessed} {numAssessed, plural, =1 {kez} other {kez}}: {levelNames}',
		'noEvidence': 'Bu {outcome, select, competencies {yeterlilik} expectations {beklenti} objectives {hedef} outcomes {kazanım} standards {standart} other {standart}} henüz değerlendirilmedi',
		'noOutcomesInstructor': '{outcome, select, competencies {yeterlilikler} expectations {beklentiler} objectives {hedefler} outcomes {kazanımlar} standards {standartlar} other {standartlar}} başarısını takip etmeye başlamak için, dersi {outcome, select, competencies {yeterlikler} expectations {beklentiler} objectives {hedefler} outcomes {kazanımlar} standards {standartlar} other {standartlar}} değerlendirilen etkinliklere hizalayın.',
		'noOutcomesStudent': '{outcome, select, competencies {yeterlilikler} expectations {beklentiler} objectives {hedefler} outcomes {kazanımlar} standards {standartlar} other {standartlar}} değerlendirilmedi.',
		'noScaleInstructor': 'Şunlara ulaşma konusundaki katılımcı ilerlemesini görmek için, bir başarı ölçütü oluşturun ve seçin: {outcome, select, competencies {yeterlik} expectations {beklenti} objectives {hedef} outcomes {kazanım} standards {standart} other {standart}}.',
		'noScaleStudent': '{outcome, select, competencies {yeterlikler} expectations {beklentiler} objectives {hedefler} outcomes {kazanımlar} standards {standartlar} other {standartlar}} başarısı için bir ölçüt belirlenmedi.',
		'noSearchResults': 'No results found for "{searchTerm}"',
		'notAssessed': 'Değerlendirilmemiş',
		'numSearchResults': '{numResults} search {numResults, plural, =1 {result} other {results}} for "{searchTerm}"',
		'searchHint': 'search...',
		'trend': 'Eğilim',
		'untitled': 'Adsız'
	}
};
