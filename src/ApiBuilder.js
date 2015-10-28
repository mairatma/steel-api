'use strict';

import array from 'bower:metal/src/array/array';
import dom from 'bower:metal/src/dom/dom';
import object from 'bower:metal/src/object/object';
import ApiBase from './ApiBase';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import 'bower:steel-button-group/src/ButtonGroup';
import 'bower:steel-dropdown/src/Dropdown';
import 'bower:steel-select/src/Select';
import 'bower:steel-switcher/src/Switcher';
import './ApiBuilder.soy';

/**
 * Responsible for building HTTP APIs.
 */
class ApiBuilder extends ApiBase {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);

		this.skipSurfaceUpdateForAttr_ = null;
		this.on('renderSurface', this.handleRenderSurface_);
		this.on('attrsChanged', this.handleAttrsChanged_);
		this.on('attrsSynced', this.handleAttrsSynced_);
	}

	/**
	 * Called automatically when the component is attached to the document. Builds the CodeMirror
	 * text editors.
	 */
	attached() {
		this.preventCodeMirrorLineBreaks_(this.components[this.id + '-authValidatorCodeMirror']);
	}

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
	 * @inheritDoc
	 */
	disposeInternal() {
		super.disposeInternal();
		this.authValidatorCodeMirror_ = null;
	}

	/**
	 * Handles a `click` event on one of the buttons for expanding/collapsing the
	 * advanced setup for a param.
	 * @param {!Event} event
	 * @protected
	 */
	handleAdvancedSetupClick_(event) {
		var container = event.delegateTarget.parentNode;
		var index = container.getAttribute('data-index');

		var arrow = event.delegateTarget.querySelector('.builder-param-item-advanced-arrow');
		dom.toggleClasses(arrow, 'icon-12-arrow-down-short');
		dom.toggleClasses(arrow, 'icon-12-arrow-up-short');
		dom.toggleClasses(container, 'expanded');

		// Build the CodeMirror editor for the validator field when it becomes visible.
		if (dom.hasClass(container, 'expanded')) {
			var suffix = index === '-1' ? 'Body' : index;
			var codeMirror = this.components[this.id + '-validatorCodeMirror' + suffix];
			if (!codeMirror.getCodeMirror()) {
				this.preventCodeMirrorLineBreaks_(codeMirror);
			}
			codeMirror.visible = true;
		}

		// Focuses the first input field. Needs to reset the field's value after focus
		// so the cursor shows up at the end instead of at the beginning of the text.
		var field = container.querySelector('input[type="text"]');
		field.focus();
		field.value = field.value;

		this.clearSurfaceCache(index === '-1' ? 'body' : 'params');
	}

	/**
	 * Handles an `attrsChanged` event on this component. Makes sure that new params
	 * are automatically focused when created.
	 * @protected
	 */
	handleAttrsChanged_() {
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
	 * Handles an `attrsSynced` event on this component. Clears the variable that is
	 * used for skipping surface updates, since any updates have already happened by
	 * the time this is called.
	 * @protected
	 */
	handleAttrsSynced_() {
		this.skipSurfaceUpdateForAttr_ = null;
	}

	/**
	 * Handles a `valueChanged` event on the `CodeMirror` instance used for the auth validator.
	 * @param {!Object} data
	 * @protected
	 */
	handleAuthValidatorCodeMirrorValueChanged_(data) {
		this.setObjectValue_(this.auth, 'validator', data.newVal.trim());
		this.skipSurfaceUpdateForAttr_ = 'auth';
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
	 * the `data` attr.
	 * @param {!Object} event
	 * @protected
	 */
	handleDataSwitcherCheckedChanged_(event) {
		this.data = event.newVal;
		this.skipSurfaceUpdateForAttr_ = 'data';
	}

	/**
	 * Handles a `valueChanged` event on the `CodeMirror` instance used for the handler.
	 * @param {!Object} data
	 * @protected
	 */
	handleHandlerCodeMirrorValueChanged_(data) {
		this.handler = data.newVal;
		this.skipSurfaceUpdateForAttr_ = 'handler';
	}

	/**
	 * Handles a `valueChanged` event on the `CodeMirror` instance used for a validator.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleValidatorCodeMirrorValueChanged_(data, event) {
		var suffix = event.target.id.substr((this.id + '-validatorCodeMirror').length);
		var index = suffix === 'Body' ? -1 : parseInt(suffix, 10);
		this.updateParamData_(index, 'validator', data.newVal.trim());
	}

	/**
	 * Handles a `checkedChanged` event on the `Switcher` instance used to control
	 * the `visibility` attr.
	 * @param {!Object} event
	 * @protected
	 */
	handleVisibilitySwitcherCheckedChanged_(event) {
		this.visibility = event.newVal;
		this.skipSurfaceUpdateForAttr_ = 'visibility';
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
		this.components[this.id + '-menu' + index].close();
		event.preventDefault();
	}

	/**
	 * Handles an `input` event on the description text field. Updates the `description`
	 * attr with the new value.
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
	 * Handles an `input` event on the title text field. Updates the `title` attr
	 * with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputTitle_(event) {
		this.updateAttrFromInput_(event, 'title');
	}

	/**
	 * Handles a `selectedChanged` event triggered by the methods `ButtonGroup` instance.
	 * Updates the `method` attr with the new value.
	 * @param {!Object} data
	 * @protected
	 */
	handleMethodsSelectedChanged_(data) {
		this.method = data.newVal;
		this.skipSurfaceUpdateForAttr_ = 'method';
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
			this.id + '-permissionsSwitcher',
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
		this.components[this.id + '-menu' + index].close();
		event.preventDefault();
	}

	/**
	 * Handles a `renderSurface` event. Prevents rerendering surfaces caused by render attr
	 * changes that should be skipped (because they were caused by ui change, and so the screen
	 * has already been updated).
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleRenderSurface_(data, event) {
		if (data.renderAttrs.indexOf(this.skipSurfaceUpdateForAttr_) !== -1) {
			this.clearSurfaceCache(data.surfaceId);
			event.preventDefault();
		}
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
			this.id + '-requiredSwitcher',
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
			this.id + '-rolesSwitcher',
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
		var item = event.target.items[data.newVal];
		this.updateParamDataFromComponentEvent_(
			event,
			'builder-param-type-',
			'type',
			item.toLowerCase()
		);
	}

	/**
	 * Prevents line breaks on the given `CodeMirror` component by setting
	 * a key handler for the ENTER key that does nothing.
	 * @param {!CodeMirror} codeMirrorComp
	 * @protected
	 */
	preventCodeMirrorLineBreaks_(codeMirrorComp) {
		codeMirrorComp.config = object.mixin({}, codeMirrorComp.config, {
			extraKeys: {
				Enter: function() {}
			}
		});
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
	 * Synchronization logic for the `auth` attr. Updates the value of the
	 * CodeMirror editor.
	 */
	syncAuth() {
		this.components[this.id + '-authValidatorCodeMirror'].value = this.auth.validator;
	}

	/**
	 * Synchronization logic for the `handler` attr. Updates the value of the
	 * CodeMirror editor.
	 */
	syncHandler() {
		this.components[this.id + '-handlerCodeMirror'].value = this.handler;
	}

	/**
	 * Updates an attribute's value from an `input` event.
	 * @param {!Event} event
	 * @param {string} attrName
	 * @protected
	 */
	updateAttrFromInput_(event, attrName) {
		this[attrName] = event.delegateTarget.value.trim();
		this.skipSurfaceUpdateForAttr_ = attrName;
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
		var name = component.id.substr(prefix.length);

		if (event.target.checked) {
			this.auth[type].push(name);
		} else {
			array.remove(this.auth[type], name);
		}
		this.auth = this.auth;
		this.skipSurfaceUpdateForAttr_ = 'auth';
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
				this.skipSurfaceUpdateForAttr_ = 'body';
			} else {
				this.parameters = this.parameters;
				this.skipSurfaceUpdateForAttr_ = 'parameters';
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
		var suffix = component.id.substr(prefix.length);
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
ApiBuilder.ATTRS = {
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

/**
 * Default element classes.
 * @type {string}
 * @static
 */
ApiBuilder.ELEMENT_CLASSES = 'builder';

ComponentRegistry.register('ApiBuilder', ApiBuilder);

export default ApiBuilder;
