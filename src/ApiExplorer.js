'use strict';

import core from 'bower:metal/src/core';
import ApiBase from './ApiBase';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Launchpad from 'bower:api.js/src/api/Launchpad';
import 'bower:steel-select/src/Select';
import './ApiExplorer.soy';

/**
 * Responsible for running HTTP APIs.
 */
class ApiExplorer extends ApiBase {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);

		/**
		 * The values that will be sent for each param with the API request.
		 * @type {Object}
		 * @protected
		 */
		this.paramValues_ = null;

		/**
		 * The params that should be sent with the path, instead of with the body.
		 * @type {!Object<string, boolean>}
		 * @protected
		 */
		this.pathParams_ = {};

		this.on('pathChanged', this.handlePathChanged_);
	}

	/**
	 * Adds all parameters listed in the api's path that are not yet listed in the
	 * given parameters Array.
	 * @param {!Array<!Object>} parameters
	 * @return {boolean} Flag indicating if any missing params were added.
	 * @protected
	 */
	addMissingPathParams_(parameters) {
		var added = false;
		var paramMap = {};
		parameters.forEach(param => paramMap[param.name] = param);
		this.getPathParamNames().forEach(name => {
			if (paramMap[name]) {
				paramMap[name].required = true;
			} else {
				added = true;
				parameters.push({
					name: name,
					required: true
				});
			}
		});
		return added;
	}

	/**
	 * Gets the values of the params that should be sent via the body of the API request.
	 * @return {!Object}
	 * @protected
	 */
	getBodyParams_() {
		var bodyParams = {};
		var paramValues = this.getParamValues_();
		for (var i = 0; i < this.parameters.length; i++) {
			var name = this.parameters[i].name;
			if (core.isDef(paramValues[name]) && !this.pathParams_[name]) {
				bodyParams[name] = paramValues[name];
			}
		}
		return bodyParams;
	}

	/**
	 * Gets the chosen values for this API's parameters.
	 * @return {!Object}
	 * @protected
	 */
	getParamValues_() {
		if (!this.paramValues_) {
			this.paramValues_ = {};
			this.parameters.forEach(param => this.paramValues_[param.name] = param.value);
		}
		return this.paramValues_;
	}

	/**
	 * Handles a `click` event on the button for running the API.
	 * @protected
	 */
	handleClickRun_() {
		var method = this.method[0];
		if (this.method.length > 1) {
			var methodSelect = this.components[this.id + '-methodSelect'];
			method = methodSelect.items[methodSelect.selectedIndex];
		}

		var launchpad = Launchpad.url(this.host + this.replacedPath);
		launchpad[method](this.getBodyParams_()).then(this.handleResponse_.bind(this));
	}

	/**
	 * Handles a `input` event on one of the param's value input fields.
	 * @param {!Event} event
	 * @protected
	 */
	handleParamInput_(event) {
		var inputElement = event.delegateTarget;
		var name = inputElement.getAttribute('name');
		var value = inputElement.value.trim();
		var index = inputElement.getAttribute('data-index');
		this.getParamValues_()[name] = value === '' ? this.parameters[index].value : value;
		this.replacedPath = this.replacePathParams_();
	}

	/**
	 * Handles a `pathChanged` event. Updates the `parameters` attr to include any missing
	 * path params.
	 * @protected
	 */
	handlePathChanged_() {
		if (this.addMissingPathParams_(this.parameters)) {
			this.parameters = this.parameters;
		}
	}

	/**
	 * Handles the HTTP response received after running the API.
	 * @param {!ClientResponse} response
	 * @protected
	 */
	handleResponse_(response) {
		var responseObj = {
			statusCode: response.statusCode(),
			statusText: response.statusText()
		};
		responseObj.body = response.body();
		responseObj.bodyString = responseObj.body;
		if (core.isObject(responseObj.body)) {
			responseObj.bodyString = JSON.stringify(responseObj.body);
		}
		this.response = responseObj;
	}

	/**
	 * Handles a `input` event for the wildcard param.
	 * @protected
	 */
	handleWildcardInput_() {
		this.wildcardValue_ = event.delegateTarget.value.trim();
		this.replacedPath = this.replacePathParams_();
	}

	/**
	 * Replaces the params present in this API's path with their chosen or
	 * default values.
	 * @protected
	 */
	replacePathParams_() {
		this.pathParams_ = {};
		var paramValues = this.getParamValues_();
		var replacedPath = this.path.replace(ApiBase.PATH_PARAMS_REGEX, function(match, name) {
			this.pathParams_[name] = true;
			return core.isDef(paramValues[name]) ? '/' + paramValues[name] : '/:' + name;
		}.bind(this));
		if (this.wildcardValue_ && this.wildcardValue_ !== '') {
			replacedPath = replacedPath.replace(/\/(\*)/, () => '/' + this.wildcardValue_);
		}
		return replacedPath;
	}

	/**
	 * Overrides the original method from `ApiBase` so any parameters from the `path`
	 * attribute can be automatically added to `parameters`.
	 * @param {!Object|Array} parameters
	 * @return {!Array}
	 * @protected
	 */
	setterParametersFn_(parameters) {
		parameters = super.setterParametersFn_(parameters);
		this.addMissingPathParams_(parameters);
		return parameters;
	}

	/**
	 * This is called automatically on the first render and when the `sync`
	 * attr's value changes.
	 */
	syncPath() {
		if (this.wasRendered) {
			this.replacedPath = this.replacePathParams_();
		}
	}
}

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
ApiExplorer.ATTRS = {
	/**
	 * The given path with all params replaced with the values to be used.
	 * @type {string}
	 */
	replacedPath: {
		validator: core.isString,
		valueFn: 'replacePathParams_'
	},

	/**
	 * The last obtained JSON response, if any.
	 * @type {!Object}
	 */
	response: {
		validator: core.isObject
	}
};

/**
 * Default element classes.
 * @type {string}
 * @static
 */
ApiExplorer.ELEMENT_CLASSES = 'explorer';

ComponentRegistry.register('ApiExplorer', ApiExplorer);

export default ApiExplorer;
