'use strict';

import dom from 'bower:metal/src/dom/dom';
import ApiBase from './ApiBase';
import Component from 'bower:metal/src/component/Component';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import 'bower:steel-button-group/src/ButtonGroup';
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
	}

	/**
	 * Handles a `click` event on one of the buttons for expanding/collapsing the
	 * advanced setup for a param.
	 * @param {!Event} event
	 * @protected
	 */
	handleAdvancedSetupClick_(event) {
		var arrow = event.delegateTarget.querySelector('.builder-param-item-advanced-arrow');
		dom.toggleClasses(arrow, 'icon-12-arrow-down-short');
		dom.toggleClasses(arrow, 'icon-12-arrow-up-short');
		dom.toggleClasses(event.delegateTarget.parentNode, 'expanded');
		event.preventDefault();
	}

	/**
	 * Handles an `attrsChanged` event on this component. Makes sure that new params
	 * are automatically focused when created.
	 * @protected
	 */
	handleAttrsChanged_() {
		if (this.hasAddedParam_) {
			this.hasAddedParam_ = false;
			var selector = '.builder-param-item:nth-child(' + this.parameters.length + ') input';
			this.element.querySelector(selector).focus();
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
	 * the `data` attr.
	 * @param {!Object} event
	 * @protected
	 */
	handleDataSwitcherCheckedChanged_(event) {
		this.data = event.newVal;
		this.skipSurfaceUpdateForAttr_ = 'data';
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
	 * Handles an `input` event on the handler text field. Updates the `handler` attr
	 * with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputHandler_(event) {
		this.updateAttrFromInput_(event, 'handler');
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
	 * Handles a `selectedIndexChanged` event from a `Select` instance for param "in" option.
	 * Updates the affected param inside the `parameters` attr with the new value.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleInSelectedIndexChanged_(data, event) {
		this.updateParamDataFromComponentEvent_(
			event,
			this.id + '-inSelect',
			'in',
			event.target.items[data.newVal].name.toLowerCase()
		);
	}

	/**
	 * Handles a `selectedChanged` event triggered by the methods `ButtonGroup` instance.
	 * Updates the `method` attr with the new value.
	 * @protected
	 */
	handleMethodsSelectedChanged_() {
		var newMethods = [];
		var methodButtonGroup = this.components[this.id + '-methodButtonGroup'];
		for (var i = 0; i < methodButtonGroup.buttons.length; i++) {
			if (methodButtonGroup.selected[i]) {
				newMethods.push(methodButtonGroup.buttons[i].label);
			}
		}
		this.method = newMethods;
		this.skipSurfaceUpdateForAttr_ = 'method';
	}

	/**
	 * Handles a `checkedChanged` event from a `Switcher` instance for a param multiple flag.
	 * Updates the affected param inside the `parameters` attr with the new value.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleMultipleCheckedChanged_(data, event) {
		this.updateParamDataFromComponentEvent_(
			event,
			this.id + '-multipleSwitcher',
			'multiple',
			event.target.checked
		);
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
		if (data.renderAttrs && data.renderAttrs.indexOf(this.skipSurfaceUpdateForAttr_) !== -1) {
			this.getSurface(data.surfaceElementId).cacheState = Component.Cache.NOT_INITIALIZED;
			event.preventDefault();
		}
		this.skipSurfaceUpdateForAttr_ = null;
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
	 * Handles a `selectedIndexChanged` event from a `Select` instance for param type. Updates
	 * the affected param inside the `parameters` attr with the new value.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleTypeSelectedIndexChanged_(data, event) {
		this.updateParamDataFromComponentEvent_(
			event,
			this.id + '-typeSelect',
			'type',
			event.target.items[data.newVal].name.toLowerCase()
		);
	}

	/**
	 * Updates an attribute's value from an `input` event.
	 * @param {!Event} event
	 * @param {string} attrName
	 * @protected
	 */
	updateAttrFromInput_(event, attrName) {
		var value = event.delegateTarget.value;
		this[attrName] = value;
		this.skipSurfaceUpdateForAttr_ = attrName;
	}

	/**
	 * Updates a param's data from an `input` or `change` event.
	 * @param {!Event} event
	 * @protected
	 */
	updateParamDataFromComponentEvent_(event, prefix, name, value) {
		var component = event.target;
		var index = parseInt(component.id.substr(prefix.length), 10);
		this.parameters[index][name] = value;
		this.parameters = this.parameters;
		this.skipSurfaceUpdateForAttr_ = 'parameters';
	}

	/**
	 * Updates a param's data from an `input` or `change` event.
	 * @param {!Event} event
	 * @protected
	 */
	updateParamDataFromDomEvent_(event) {
		var param = this.parameters[event.delegateTarget.getAttribute('data-index')];
		var name = event.target.getAttribute('data-name');
		var value = event.target.value;
		if (param[name] !== value) {
			param[name] = value;
			this.parameters = this.parameters;
			this.skipSurfaceUpdateForAttr_ = 'parameters';
		}
	}
}

/**
 * Default element classes.
 * @type {string}
 * @static
 */
ApiBuilder.ELEMENT_CLASSES = 'builder';

ComponentRegistry.register('ApiBuilder', ApiBuilder);

export default ApiBuilder;
