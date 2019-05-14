import 'd2l-localize-behavior/d2l-localize-behavior.js';
import '../build/lang/ar.js';
import '../build/lang/de.js';
import '../build/lang/en.js';
import '../build/lang/es.js';
import '../build/lang/fr.js';
import '../build/lang/ja.js';
import '../build/lang/ko.js';
import '../build/lang/nl.js';
import '../build/lang/pt.js';
import '../build/lang/sv.js';
import '../build/lang/tr.js';
import '../build/lang/zh-tw.js';
import '../build/lang/zh.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.OutcomesUserProgress = window.D2L.PolymerBehaviors.OutcomesUserProgress || {};
/** @polymerBehavior D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehaviorImpl = {
	properties: {
		resources: {
			value: function() {
				return {
					'ar': this.ar,
					'de': this.de,
					'en': this.en,
					'es': this.es,
					'fr': this.fr,
					'ja': this.ja,
					'ko': this.ko,
					'nl': this.nl,
					'pt': this.pt,
					'sv': this.sv,
					'tr': this.tr,
					'zh': this.zh,
					'zh-TW': this.zhTw
				};
			}
		}
	}
};
/** @polymerBehavior */
D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehaviorImpl,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangArBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangDeBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangEnBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangEsBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangFrBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangJaBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangKoBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangNlBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangPtBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangSvBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangTrBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangZhBehavior,
	D2L.PolymerBehaviors.OutcomesUserProgress.LocalizeBehavior.LangZhTwBehavior
];
