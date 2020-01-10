import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = /*html*/`<dom-module id="entity-loader">
	<template strip-whitespace="">
		<style>
			:host {
				display: none;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'entity-loader',

	properties: {
		activityMap: {
			type: Object,
			notify: true
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		D2L.Hypermedia.HMConstantsBehavior
	],

	_onEntityChanged: function(entity) {
		if (!entity) {
			return;
		}

		const updatedMap = this.activityMap;
		updatedMap[this.href] = entity;

		// notify object changed
		
		this.set('activityMap', {});
		this.set('activityMap', updatedMap);
	}

});