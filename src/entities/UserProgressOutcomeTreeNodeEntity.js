import { Entity } from 'siren-sdk/src/es6/Entity';
import { OutcomeActivityCollectionEntity } from 'd2l-outcomes-overall-achievement/src/entities/OutcomeActivityCollectionEntity';
import { OutcomeEntity } from 'd2l-outcomes-overall-achievement/src/entities/OutcomeEntity';

export class UserProgressOutcomeTreeNodeEntity extends Entity {

	static get class() { return 'user-progress-outcome-node'; }

	static get links() {
		return {
			outcomeRel: 'https://outcomes.api.brightspace.com/rels/outcome',
			outcomeActivitiesRel: 'https://user-progress.api.brightspace.com/rels/outcome-activities'
		};
	}

	getOutcomeActivitiesHref() {
		if (!this._entity || !this._entity.hasLinkByRel(UserProgressOutcomeTreeNodeEntity.links.outcomeActivitiesRel)) {
			return;
		}

		return this._entity.getLinkByRel(UserProgressOutcomeTreeNodeEntity.links.outcomeActivitiesRel).href;
	}

	onChildNodeChanged(onChange) {
		const children = this._getChildNodes();
		children.forEach((child, index) => {
			const onChangeWithIndex = (c) => {
				if (c) {
					c.index = index;
				}
				onChange(c);
			};

			child && this._subEntity(UserProgressOutcomeTreeNodeEntity, child, onChangeWithIndex);
		});
	}

	onOutcomeActivitiesChanged(onChange) {
		const href = this.getOutcomeActivitiesHref();
		href && this._subEntity(OutcomeActivityCollectionEntity, href, onChange);
	}

	onOutcomeChanged(onChange) {
		const href = this._getOutcomeHref();
		href && this._subEntity(OutcomeEntity, href, onChange);
	}

	_getChildNodes() {
		if (!this._entity) {
			return;
		}

		return this._entity.entities ? this._entity.getSubEntitiesByClass(UserProgressOutcomeTreeNodeEntity.class) : [];
	}

	_getOutcomeHref() {
		if (!this._entity || !this._entity.hasLinkByRel(UserProgressOutcomeTreeNodeEntity.links.outcomeRel)) {
			return;
		}

		return this._entity.getLinkByRel(UserProgressOutcomeTreeNodeEntity.links.outcomeRel).href;
	}

}
