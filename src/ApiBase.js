'use strict';

import core from 'bower:metal/src/core';
import object from 'bower:metal/src/object/object';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';

/**
 * Base class for components that will handle APIs, like `ApiBuilder` and `ApiExplorer`.
 */
class ApiBase extends SoyComponent {
	/**
	 * Converts the given parameters from the array to the object format.
	 * @param {!Array} parameters
	 * @return {!Object}
	 * @protected
	 */
	convertToObj_(parameters) {
		var obj = {};
		for (var i = 0; i < parameters.length; i++) {
			obj[parameters[i].name] = object.mixin({}, parameters[i]);
			delete obj[parameters[i].name].name;
		}
		return obj;
	}

	/**
	 * Setter for the `parameters` attribute. If given as an object, the value will
	 * be converted into an array format for internal use. The `toJson` method will
	 * return the object format for the `parameters` attribute though.
	 * @param {!Object|Array} val
	 * @return {!Array}
	 * @protected
	 */
	setterParametersFn_(val) {
		if (!(val instanceof Array)) {
			var obj = val;
			val = Object.keys(obj).map(function(name) {
				return object.mixin({
					name: name
				}, obj[name]);
			});
		}
		return val;
	}

	/**
	 * Returns a JSON object that represents the API handled by this component.
	 * @return {!Object}
	 * @protected
	 */
	toJson() {
		var json = {};
		for (var i = 0; i < ApiBase.API_ATTRS.length; i++) {
			var name = ApiBase.API_ATTRS[i];
			var val = this[name];
			if (name === 'parameters') {
				val = this.convertToObj_(val);
			}
			json[name] = val;
		}
		return json;
	}
}

/**
 * List of attributes that represent the api constructed by this component.
 * @type {!Array<string>}
 * @static
 */
ApiBase.API_ATTRS = ['auth', 'data', 'description', 'handler', 'method', 'name', 'parameters', 'path'];

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
ApiBase.ATTRS = {
	/**
	 * Object with the authentication roles and permissions for this API.
	 * @type {!{roles: Array<string>=, permissions: Array<string>=}}
	 * @default {}
	 */
	auth: {
		validator: core.isObject,
		valueFn: function() {
			return {};
		}
	},

	/**
	 * Flag indicating if data is enabled or not.
	 * @type {boolean}
	 * @default false
	 */
	data: {
		value: false
	},

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
	 * be listed here, distinguished by the `in` key. Note that the parameters
	 * can be given either as an array or as an object (in which case each key
	 * should represent the name of a param).
	 * @type {!Object|Array}
	 */
	parameters: {
		setter: 'setterParametersFn_',
		validator: core.isObject,
		valueFn: function() {
			return [];
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
