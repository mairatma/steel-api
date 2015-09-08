'use strict';

import core from 'bower:metal/src/core';
import object from 'bower:metal/src/object/object';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';

/**
 * Base class for components that will handle APIs, like `ApiBuilder` and `ApiExplorer`.
 */
class ApiBase extends SoyComponent {
	/**
	 * Converts the given array of strings into a map.
	 * @param {!Array<string>} arr
	 * @return {!Object<string, boolean>}
	 * @protected
	 */
	convertToMap_(arr) {
		var obj = {};
		for (var i = 0; i < arr.length; i++) {
			obj[arr[i]] = true;
		}
		return obj;
	}

	/**
	 * Converts the given parameters from the array to the object format.
	 * @param {!Array} parameters
	 * @return {!Object}
	 * @protected
	 */
	convertParametersToObj_(parameters) {
		var obj = {};
		for (var i = 0; i < parameters.length; i++) {
			obj[parameters[i].name] = object.mixin({}, parameters[i]);
			delete obj[parameters[i].name].name;
		}
		return obj;
	}

	/**
	 * Setter for the `auth` attribute. If its "permissions" and "roles" keys are
	 * given as arrays, they will be converted to maps instead. The `toJson` method will
	 * return the array format for these keys though.
	 * @param {!Object} auth
	 * @return {!Object}
	 * @protected
	 */
	setterAuthFn_(auth) {
		if (auth.roles instanceof Array) {
			auth.roles = this.convertToMap_(auth.roles);
		}
		if (auth.permissions instanceof Array) {
			auth.permissions = this.convertToMap_(auth.permissions);
		}
		return auth;
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
			switch (name) {
				case 'parameters':
					val = this.convertParametersToObj_(val);
					break;
				case 'auth':
					val = object.mixin({}, val);
					if (val.roles) {
						val.roles = Object.keys(val.roles);
					}
					if (val.permissions) {
						val.permissions = Object.keys(val.permissions);
					}
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
ApiBase.API_ATTRS = ['auth', 'data', 'description', 'handler', 'method', 'parameters', 'path', 'title'];

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
ApiBase.ATTRS = {
	/**
	 * Object with the authentication roles and permissions for this API.
	 * @type {!Object}
	 * @default {}
	 */
	auth: {
		setter: 'setterAuthFn_',
		validator: core.isObject,
		valueFn: function() {
			return {
				'roles': [],
				'permissions': [],
				'validator': ''
			};
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
	 * The host url for this api.
	 * @type {string}
	 */
	host: {
		validator: core.isString
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
	},

	/**
	 * The api's title.
	 * @type {string}
	 */
	title: {
		validator: core.isString,
		value: ''
	}
};

/**
 * The regex used to search for params in the API's path.
 * @type {!RegExp}
 * @static
 */
ApiBase.PATH_PARAMS_REGEX = /\/:(\w+)(?:\([^\)]+\))?/g;

export default ApiBase;
