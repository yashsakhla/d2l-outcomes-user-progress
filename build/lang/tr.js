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
		'a11yCollapsed': 'daraltılmış',
		'a11yExpanded': 'genişletilmiş',
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
		'noSearchResults': '"{searchTerm}" için hiçbir sonuç bulunamadı',
		'nodeAriaTextGroup': 'Grup {state}',
		'nodeAriaTextLevel': 'Seviye {level}',
		'nodeAriaTextPosition': '{position}/{count}',
		'notAssessed': 'Değerlendirilmemiş',
		'numSearchResults': '"{searchTerm}" için {numResults} arama {numResults, plural, =1 {sonuç} other {sonuç}}',
		'outcomesListDescription': '{outcome, select, competencies {Yeterlikler} expectations {Beklentiler} objectives {Hedefler} outcomes {Kazanımlar} standards {Standartlar} other {Standartlar}} Listesi',
		'outcomesListLoading': 'Yükleniyor',
		'outcomesListLoadingComplete': 'Yükleme tamamlandı',
		'searchCleared': 'Arama sonuçları temizlendi',
		'searchHint': 'Ara...',
		'searchLabel': 'Arama',
		'trend': 'Eğilim',
		'untitled': 'Adsız'
	}
};
