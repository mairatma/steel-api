'use strict';

import core from 'bower:metal/src/core';
import ApiBase from './ApiBase';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Launchpad from 'bower:api.js/src/api/Launchpad';
import './ApiExplorer.soy';

/**
 * Responsible for running HTTP APIs.
 */
class ApiExplorer extends ApiBase {
	/**
	 * Gets all params that were set on their input fields, separating them between
	 * body and url params.
	 * @return {!{body: !Object, url: !Object}}
	 * @protected
	 */
	getParamsFromInputs_() {
		var params = {
			body: {},
			url: {}
		};
		var paramNodes = this.element.querySelectorAll('.app-explorer-try-it-param-input');
		for (var i = 0; i < paramNodes.length; i++) {
			var value = paramNodes[i].value;
			if (value.trim() === '') {
				value = this.parameters[i].value;
			}
			if (core.isDef(value)) {
				params[this.parameters[i].in || 'body'][this.parameters[i].name] = value;
			}
		}
		return params;
	}

	/**
	 * Handles a `click` event on the button for running the API.
	 * @protected
	 */
	handleClickRun_() {
		var method = this.element.querySelector('.app-explorer-try-it-methods').value;
		var params = this.getParamsFromInputs_();

		var launchpad = Launchpad.url(this.path);
		this.setLaunchpadParams_(launchpad, params.url);
		launchpad[method](params.body).then(this.handleResponse_.bind(this));
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
		var body = response.body();
		if (core.isObject(body)) {
			responseObj.body = body;
			responseObj.bodyString = JSON.stringify(body);
		}
		this.response = responseObj;
	}

	/**
	 * Sets the given params on the given `Launchpad` instance.
	 * @param {!Launchpad} launchpad
	 * @param {!Object} params
	 * @protected
	 */
	setLaunchpadParams_(launchpad, params) {
		var paramNames = Object.keys(params);
		for (var i = 0; i < paramNames.length; i++) {
			launchpad.param(paramNames[i], params[paramNames[i]]);
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
ApiExplorer.ELEMENT_CLASSES = 'api-explorer';

ComponentRegistry.register('ApiExplorer', ApiExplorer);

export default ApiExplorer;
