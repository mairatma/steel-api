'use strict';

import core from 'bower:metal/src/core';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';

/**
 * Base class for components that will handle APIs, like `ApiBuilder` and `ApiExplorer`.
 */
class ApiBase extends SoyComponent {
	/**
	 * Returns a JSON object that represents the API handled by this component.
	 * @return {!Object}
	 * @protected
	 */
	toJson() {
		var json = {};
		for (var i = 0; i < ApiBase.API_ATTRS.length; i++) {
			json[ApiBase.API_ATTRS[i]] = this[ApiBase.API_ATTRS[i]];
		}
		return json;
	}
}

/**
 * List of attributes that represent the api constructed by this component.
 * @type {!Array<string>}
 * @static
 */
ApiBase.API_ATTRS = ['description', 'handler', 'method', 'name', 'parameters', 'path'];

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
ApiBase.ATTRS = {
	/**
	 * The api's description.
	 * @type {string}
	 */
	description: {
		validator: core.isString,
		value: ''
	},

	/**
	 * The api's handler code.
	 * @type {string}
	 */
	handler: {
		validator: core.isString,
		value: ''
	},

	/**
	 * The api's HTTP method. Has to be one of the values listed in `ApiBase.Methods`.
	 * @type {!Array<string>}
	 * @default ['get']
	 */
	method: {
		validator: val => val instanceof Array,
		valueFn: function() {
			return ['get'];
		}
	},

	/**
	 * The api's name.
	 * @type {string}
	 */
	name: {
		validator: core.isString,
		value: ''
	},

	/**
	 * An object with the api's parameters. Both body and url parameters should
	 * be listed here, distinguished by the `in` key.
	 * @type {Object}
	 */
	parameters: {
		validator: core.isObject,
		valueFn: function() {
			return {};
		}
	},

	/**
	 * The api's path url.
	 * @type {string}
	 */
	path: {
		validator: core.isString,
		value: ''
	}
};

export default ApiBase;
