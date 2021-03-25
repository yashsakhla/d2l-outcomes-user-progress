import { Entity } from 'siren-sdk/src/es6/Entity';
import { UserProgressOutcomeEntity } from 'd2l-outcomes-overall-achievement/src/entities/UserProgressOutcomeEntity';
import { UserProgressOutcomeTreeNodeEntity } from './UserProgressOutcomeTreeNodeEntity';

export class UserProgressOutcomeCollectionEntity extends Entity {

	static get classes() {
		return {
			flatListClass: 'user-progress-outcomes',
			hierarchyClass: 'user-progress-outcome-nodes'
		};
	}

	_getUserProgressOutcomes() {
		if (!this._entity) {
			return;
		}

		return this.isHierarchy()
			? this._entity.getSubEntitiesByClass(UserProgressOutcomeTreeNodeEntity.class)
			: this._entity.getSubEntitiesByClass(UserProgressOutcomeEntity.class);
	}

	isHierarchy() {
		if (!this._entity) {
			return;
		}

		return this._entity.hasClass(UserProgressOutcomeCollectionEntity.classes.hierarchyClass);
	}

	onUserProgressOutcomeChanged(onChange) {
		const outcomes = this._getUserProgressOutcomes();
		outcomes.forEach((outcome, index) => {
			const onChangeWithIndex = (a) => {
				if (a) {
					a.index = index;
				}
				onChange(a);
			};

			outcome && this._subEntity(
				this.isHierarchy() ? UserProgressOutcomeTreeNodeEntity : UserProgressOutcomeEntity,
				outcome,
				onChangeWithIndex
			);
		});
	}

}
