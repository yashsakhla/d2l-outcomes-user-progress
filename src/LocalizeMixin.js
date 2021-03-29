import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

const LocalizeMixinInternal = (superclass) => class extends LocalizeDynamicMixin(superclass) {

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`../lang/${lang}.js`)).default
		};
	}

};

export const LocalizeMixin = dedupeMixin(LocalizeMixinInternal);
