import '../src/outcomes-user-progress/outcomes-user-progress.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<d2l-outcomes-user-progress>', () => {
	let element;

	beforeEach(async() => {
		element = await fixture(html`
			<d2l-outcomes-user-progress></d2l-outcomes-user-progress>
		`);
	});

	describe('smoke test', () => {
		it('can be instantiated', () => {
			expect(element.tagName).to.equal('D2L-OUTCOMES-USER-PROGRESS');
		});
	});

	describe('accessibility tests', () => {
		it('should pass all axe tests', () => {
			expect(element).to.be.accessible();
		});
	});
});
