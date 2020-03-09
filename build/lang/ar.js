import '@polymer/polymer/polymer-legacy.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = window.D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior || {};

/*
 * Ar lang terms
 * @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangArBehavior
 */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangArBehavior = {
	ar: {
		'bigTrendAttemptsScreenReaderString': '{numAttempts, plural, =1 {محاولة واحدة {attemptNames}} other {من المحاولات {attemptNames} و{lastAttemptName}}}',
		'bigTrendAttemptsTooltipString': '{numAttempts, plural, =1 {محاولة واحدة} other {من المحاولات}} {attemptNames}',
		'close': 'إغلاق',
		'evidence': 'دليل',
		'headingDate': 'التاريخ',
		'headingEvidence': 'اسم الدليل',
		'headingLoa': 'مستوى التحصيل',
		'miniTrendAttemptsTooltipString': '{numAttempts, plural, =1 {محاولة واحدة} other {من المحاولات}} {attemptNames}',
		'miniTrendScreenReaderText': 'تم التقييم {numAssessed} {numAssessed, plural, =1 {مرة واحدة} other {من المرات}}: {levelNames}',
		'noEvidence': 'This {outcome, select, competencies {competency} expectations {expectation} objectives {objective} outcomes {outcome} standards {standard} other {standard}} has not yet been assessed',
		'noOutcomesInstructor': 'To start tracking achievement of {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}}, align course {outcome, select, competencies {competencies} expectations {expectations} objectives {objectives} outcomes {outcomes} standards {standards} other {standards}} to assessed activities.',
		'noOutcomesStudent': 'لم يتم تقييم أي {outcome, select, competencies {كفاءات} expectations {توقعات} objectives {أهداف} outcomes {نتائج} standards {معايير} other {معايير}}.',
		'noScaleInstructor': 'لعرض تقدم المتعلّم لتحقيق {outcome, select, competencies {الكفاءة} expectations {التوقع} objectives {الهدف} outcomes {النتيجة} standards {المعيار} other {المعيار}} هذا، يجب إنشاء مقياس تحصيل وتحديده.',
		'noScaleStudent': 'لم يتم تعيين أي مقياس لقياس تحقيق {outcome, select, competencies {الكفاءات} expectations {التوقعات} objectives {الأهداف} outcomes {النتائج} standards {المعايير} other {المعايير}}.',
		'noSearchResults': 'No results found for "@{searchTerm}@"',
		'notAssessed': 'لم يتم التقييم',
		'numSearchResults': '{numResults} search {numResults, plural, =1 {result} other {results}} for "@{searchTerm}@"',
		'searchCleared': 'Search results cleared',
		'searchHint': 'search...',
		'searchLabel': 'Search',
		'trend': 'الاتجاه',
		'untitled': 'بلا عنوان'
	}
};
