'use strict';

import array from 'bower:metal/src/array/array';
import ApiBase from './ApiBase';
import Component from 'bower:metal/src/component/Component';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
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
	}

	/**
	 * Handles a `change` event on a method checkbox. Updates the `method`
	 * attr to include/exclude the affected value.
	 * @param {!Event} event
	 * @protected
	 */
	handleChangeMethod_(event) {
		if (event.delegateTarget.checked) {
			this.method.push(event.delegateTarget.value);
		} else {
			array.remove(this.method, event.delegateTarget.value);
		}
		this.method = this.method;
		this.skipSurfaceUpdateForAttr_ = 'method';
	}

	/**
	 * Handles a `change` event on one of the param fields. Updates the changed
	 * param with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleChangeParam_(event) {
		this.updateParamDataFromEvent_(event);
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
	}

	/**
	 * Handles a `click` event on the button for removing a param.
	 * @param {!Event} event
	 * @protected
	 */
	handleClickRemoveParam_(event) {
		var index = event.delegateTarget.getAttribute('data-index');
		this.parameters.splice(index, 1);
		this.parameters = this.parameters;
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
	 * Handles an `input` event on the name text field. Updates the `name` attr
	 * with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputName_(event) {
		this.updateAttrFromInput_(event, 'name');
	}

	/**
	 * Handles an `input` event on one of the param fields. Updates the changed
	 * param with the new value.
	 * @param {!Event} event
	 * @protected
	 */
	handleInputParam_(event) {
		this.updateParamDataFromEvent_(event);
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
	updateParamDataFromEvent_(event) {
		var param = this.parameters[event.delegateTarget.getAttribute('data-index')];
		var name = event.target.getAttribute('data-name');
		var value = event.target.value;
		if (event.target.type === 'checkbox') {
			value = event.target.checked;
		}
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
ApiBuilder.ELEMENT_CLASSES = 'api-builder';

ComponentRegistry.register('ApiBuilder', ApiBuilder);

export default ApiBuilder;
