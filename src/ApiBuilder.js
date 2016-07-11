'use strict';

import { array, object } from 'metal';
import dom from 'metal-dom';
import templates from './ApiBuilder.soy';
import ApiBase from './ApiBase';
import Soy from 'metal-soy';

import 'metal-button-group';
import 'metal-dropdown';
import 'metal-select';
import 'metal-switcher';

/**
 * Responsible for building HTTP APIs.
 */
class ApiBuilder extends ApiBase {
	/**
	 * Overrides the original method from `ApiBase` so this can add any attributes
	 * that are defined on the API's path but were not explicitly added to the
	 * parameters list.
	 * @param {!Array} parameters
	 * @return {!Object}
	 * @protected
	 */
	convertParametersToObj_(parameters) {
		var obj = super.convertParametersToObj_(parameters);
		this.getPathParamNames().forEach(name => {
			if (!obj[name]) {
				obj[name] = {};
			}
		});
		return obj;
	}

	/**
	 * Handles a `click` event on one of the buttons for expanding/collapsing the
	 * advanced setup for a param.
	 * @param {!Event} event
	 * @protected
	 */
	handleAdvancedSetupClick_(event) {
		var container = event.delegateTarget.parentNode;
		var arrow = event.delegateTarget.querySelector('.builder-param-item-advanced-arrow');
		dom.toggleClasses(arrow, 'icon-12-arrow-down-short');
		dom.toggleClasses(arrow, 'icon-12-arrow-up-short');
		dom.toggleClasses(container, 'expanded');

		// Focuses the first input field. Needs to reset the field's value after focus
		// so the cursor shows up at the end instead of at the beginning of the text.
		var field = container.querySelector('input[type="text"]');
		field.focus();
		field.value = field.value;
	}

	/**
	 * Handles an `stateChanged` event on this component. Makes sure that new params
	 * are automatically focused when created.
	 * @protected
	 */
	rendered() {
		if (this.hasAddedParam_) {
			this.hasAddedParam_ = false;
			var selector = '.builder-params .builder-param-item:nth-child(' + this.parameters.length + ') input';
			var input = this.element.querySelector(selector);
			input.focus();
			// This is important because otherwise the key cursor will be at the beginning of the
			// text field, but we want it to be at the end.
			input.value = input.value;
		}
	}

	/**
	 * Handles a `click` event on the button for adding more params.
	 * @param {!Event} event
	 * @protected
	 */
	handleClickAddParam_(event) {
		event.preventDefault();
		this.parameters.push({
			name: ''
		});
		this.parameters = this.parameters;
		this.hasAddedParam_ = true;
	}

	/**
	 * Handles a `checkedChanged` event on the `Switcher` instance used to control
	 * the `data` state property.
	 * @param {!Object} event
	 * @protected
	 */
	handleDataSwitcherCheckedChanged_(event) {
		this.data = event.newVal;
	}

	/**
	 * Handles a `checkedChanged` event on the `Switcher` instance used to control
	 * the `visibility` state property.
	 * @param {!Object} event
	 * @protected
	 */
	handleVisibilitySwitcherCheckedChanged_(event) {
		this.visibility = event.newVal;
	}

	/**
	 * Handles a `click` event on the menu item for duplicating a param.
	 * @param {!Event} event
	 * @protected
	 */
	handleDuplicateParamClick_(event) {
		var index = event.delegateTarget.getAttribute('data-index');
		this.parameters.push(object.mixin({}, this.parameters[index]));
		this.parameters = this.parameters;
		this.hasAddedParam_ = true;
		this.components['menu' + index].close();
		event.preventDefault();
	}

	/**
	 * Handles an `input` event for the auth validator. Updates the changed
	 * validator with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputAuthValidator_(event) {
		this.setObjectValue_(this.auth, 'validator', event.delegateTarget.value.trim());
	}

	/**
	 * Handles an `input` event on the description text field. Updates the `description`
	 * state property with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputDescription_(event) {
		this.updateAttrFromInput_(event, 'description');
	}

	/**
	 * Handles an `input` event on one of the param fields. Updates the changed
	 * param with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputParam_(event) {
		this.updateParamDataFromDomEvent_(event);
	}

	/**
	 * Handles an `input` event on the path text field. Updates the `path` attr
	 * with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputPath_(event) {
		this.updateAttrFromInput_(event, 'path');
	}

	/**
	 * Handles an `input` event on the title text field. Updates the `title`
	 * state property with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputTitle_(event) {
		this.updateAttrFromInput_(event, 'title');
	}

	/**
	 * Handles an `input` event on the title text field. Updates the
	 * `validator` state property with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputValidator_(event) {
		var suffix = event.delegateTarget.getAttribute('data-type');
		var index = suffix === 'Body' ? -1 : parseInt(suffix, 10);
		this.updateParamData_(index, 'validator', event.delegateTarget.value.trim());
	}

	/**
	 * Handles a `selectedChanged` event triggered by the methods `ButtonGroup` instance.
	 * Updates the `method` attr with the new value.
	 * @param {!Object} data
	 * @protected
	 */
	handleMethodsSelectedChanged_(data) {
		this.method = data.newVal;
	}

	/**
	 * Handles a `checkedChanged` event from a `Switcher` instance for an auth permissions
	 * flag. Updates the `auth` attr with the new value.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handlePermissionCheckedChanged_(data, event) {
		this.updateAuthDataFromComponentEvent_(
			event,
			'permissionsSwitcher',
			'permissions'
		);
	}

	/**
	 * Handles a `click` event on the menu item for removing a param.
	 * @param {!Event} event
	 * @protected
	 */
	handleRemoveParamClick_(event) {
		var index = event.delegateTarget.getAttribute('data-index');
		this.parameters.splice(index, 1);
		this.parameters = this.parameters;
		this.components['menu' + index].close();
		event.preventDefault();
	}

	/**
	 * Handles a `checkedChanged` event from a `Switcher` instance for a param required flag.
	 * Updates the affected param inside the `parameters` attr with the new value.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleRequiredCheckedChanged_(data, event) {
		this.updateParamDataFromComponentEvent_(
			event,
			'requiredSwitcher',
			'required',
			event.target.checked
		);
	}

	/**
	 * Handles a `checkedChanged` event from a `Switcher` instance for an auth roles flag
	 * Updates the `auth` attr with the new value.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleRoleCheckedChanged_(data, event) {
		this.updateAuthDataFromComponentEvent_(
			event,
			'rolesSwitcher',
			'roles'
		);
	}

	/**
	 * Handles a `selectedIndexChanged` event from a `Select` instance for param type. Updates
	 * the affected param inside the `parameters` attr with the new value.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleTypeSelectedIndexChanged_(data, event) {
		this.updateParamDataFromComponentEvent_(
			event,
			'builder-param-type-',
			'type',
			TYPES[data.newVal]
		);
	}

	/**
	 * Sets the value of the given object key, removing the key if the value
	 * is empty.
	 * @param {!Object} obj
	 * @param {string} key
	 * @param {string} value
	 * @protected
	 */
	setObjectValue_(obj, key, value) {
		if (value === '') {
			delete obj[key];
		} else {
			obj[key] = value;
		}
	}

	/**
	 * Updates an attribute's value from an `input` event.
	 * @param {!Event} event
	 * @param {string} attrName
	 * @protected
	 */
	updateAttrFromInput_(event, attrName) {
		this[attrName] = event.delegateTarget.value.trim();
	}

	/**
	 * Updates the `auth` attribute from an `input` or `change` event.
	 * @param {!Event} event
	 * @param {string} prefix
	 * @param {string} type
	 * @protected
	 */
	updateAuthDataFromComponentEvent_(event, prefix, type) {
		this.auth[type] = this.auth[type] || [];

		var component = event.target;
		var name = component.config.ref.substr(prefix.length);

		if (event.target.checked) {
			this.auth[type].push(name);
		} else {
			array.remove(this.auth[type], name);
		}
		this.auth = this.auth;
	}

	/**
	 * Updates a param's data from its index, name and value.
	 * @param {number} index
	 * @param {string} name
	 * @param {*} value
	 * @protected
	 */
	updateParamData_(index, name, value) {
		var param = index === -1 ? this.body : this.parameters[index];
		var prevValue = param[name] || '';
		if (prevValue !== value) {
			this.setObjectValue_(param, name, value);
			if (index === -1) {
				this.body = this.body;
			} else {
				this.parameters = this.parameters;
			}
		}
	}

	/**
	 * Updates a param's data from an `input` or `change` event.
	 * @param {!Event} event
	 * @param {string} prefix
	 * @param {string} name
	 * @param {*} value
	 * @protected
	 */
	updateParamDataFromComponentEvent_(event, prefix, name, value) {
		var component = event.target;
		var suffix = component.config.ref.substr(prefix.length);
		var index = suffix === 'Body' ? -1 : parseInt(suffix, 10);
		this.updateParamData_(index, name, value);
	}

	/**
	 * Updates a param's data from an `input` or `change` event.
	 * @param {!Event} event
	 * @protected
	 */
	updateParamDataFromDomEvent_(event) {
		var name = event.target.getAttribute('data-name');
		if (name) {
			var value = event.target.value.trim();
			var index = parseInt(event.delegateTarget.getAttribute('data-index'), 10);
			this.updateParamData_(index, name, value);
		}
	}
}

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
ApiBuilder.STATE = {
	/**
	 * All permissions that can be picked by the user in the Authentication section.
	 * @type {!Array<string>}
	 * @default []
	 */
	permissions: {
		validator: val => val instanceof Array,
		valueFn: function() {
			return [];
		}
	},

	/**
	 * All roles that can be picked by the user in the Authentication section.
	 * @type {!Array<string>}
	 * @default []
	 */
	roles: {
		validator: val => val instanceof Array,
		valueFn: function() {
			return [];
		}
	}
};

Soy.register(ApiBuilder, templates);

var TYPES = ['any', 'array', 'boolean', 'number', 'object', 'string'];

export default ApiBuilder;
