import '@brightspace-ui/core/components/colors/colors';
import 'd2l-outcomes-overall-achievement/src/trend/mini-trend';
import { bodySmallStyles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { oupConsts } from '../consts';
import { UserProgressOutcomeEntity } from 'd2l-outcomes-overall-achievement/src/entities/UserProgressOutcomeEntity';

export class OutcomesListItem extends EntityMixinLit(LitElement) {

	static get properties() {
		return {
			_activitiesHref: { attribute: false },
			_outcomeEntity: { attribute: false }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			bodyStandardStyles,
			css`
				#container {
					border-top: 1px solid var(--d2l-color-mica);
					display: flex;
					padding: 18px 0px;
				}

				#container:not([aria-busy]):hover {
					cursor: pointer;
				}

				#primary {
					flex-grow: 1;
				}

				#primary .sub-text {
					margin-top: 6px;
				}

				#secondary {
					display: flex;
					flex-shrink: 0;
					justify-content: flex-end;
					margin-left: 24px;
					min-width: 84px;
				}

				@keyframes skeleton-pulse {
					from { background-color: var(--d2l-color-sylvite); }
					to { background-color: var(--d2l-color-regolith); }
				}

				.skeleton {
					animation-direction: alternate;
					animation-duration: 1.8s;
					animation-iteration-count: infinite;
					animation-name: skeleton-pulse;
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
					display: inline-block;
				}

				.main-text .skeleton {
					height: 19px;
					width: 100%;
				}

				.sub-text .skeleton {
					height: 14px;
					width: 20%;
				}

				[hidden] {
					display: none !important;
				}
			`
		];
	}

	constructor() {
		super();
		this._setEntityType(UserProgressOutcomeEntity);
	}

	static get is() { return 'd2l-outcomes-list-item'; }

	render() {
		return html`
			<div id="container" role="listitem" @click=${this._onItemClicked} aria-busy=${!this._outcomeEntity}>
				<div id="primary">
					${this._outcomeEntity ? html`
						<div class="main-text d2l-body-standard">${this._outcomeEntity.getDescription()}</div>
						<div class="sub-text d2l-body-small">${this._outcomeEntity.getIdentifier()}</div>
					` : html`
						<div class="main-text">
							<div class="skeleton"></div>
							<div class="skeleton"></div>
						</div>
						<div class="sub-text">
							<div class="skeleton"></div>
						</div>
					`}
				</div>
				<div id="secondary">
					<d2l-coa-mini-trend
						href=${this._activitiesHref}
						token=${this.token}
						hide-unpublished-coa
					></d2l-coa-mini-trend>
				</div>
			</div>
		`;
	}

	shouldUpdate(changedProps) {
		// The parent function needs to be called even when its result won't be used
		// to ensure that entity gets fetched on initial set of href/token
		const parentOpinion = super.shouldUpdate(changedProps);

		if (!this.rendered) {
			// Force at least 1 render even with no href/token to load skeleton
			this.rendered = true;
			return true;
		}
		return parentOpinion;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onEntityChanged(entity);
			super._entity = entity;
		}
	}

	_onEntityChanged(entity) {
		if (entity) {
			const activitiesHref = entity.getOutcomeActivitiesHref();
			let outcomeEntity = null;
			entity.onOutcomeChanged(outcome => outcomeEntity = outcome);

			entity.subEntitiesLoaded().then(() => {
				this._activitiesHref = activitiesHref;
				this._outcomeEntity = outcomeEntity;
			});
		}
	}

	_onItemClicked() {
		if (this._outcomeEntity) {
			this.dispatchEvent(new CustomEvent(oupConsts.events.outcomeListItemClicked, { composed: true, bubbles: true, detail: { href: this.href } }));
		}
	}

}

customElements.define(OutcomesListItem.is, OutcomesListItem);
