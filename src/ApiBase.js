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
	convertParametersToObj_(parameters) {
		var obj = {};
		for (var i = 0; i < parameters.length; i++) {
			var name = parameters[i].name;
			if (name && name !== '') {
				obj[parameters[i].name] = object.mixin({}, parameters[i]);
				delete obj[parameters[i].name].name;
			}
		}
		return obj;
	}

	/**
	 * Gets names of all parameters present in the API's path.
	 * @return {!Array<string>}
	 */
	getPathParamNames() {
		var names = [];
		this.path.replace(ApiBase.PATH_PARAMS_REGEX, function(match, name) {
			names.push(name);
			return match;
		});
		return names;
	}

	/**
	 * Parses all object param values to the correct object format.
	 * @param {!Object} parameters
	 * @protected
	 */
	parseObjectParamValues_(parameters) {
		var names = Object.keys(parameters);
		for (var i = 0; i < names.length; i++) {
			var type = parameters[names[i]].type;
			if (type === 'object' || type === 'array') {
				parameters[names[i]].value = JSON.parse(parameters[names[i]].value);
			}
		}
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
		val.forEach(param => {
			if (core.isObject(param.value)) {
				param.value = JSON.stringify(param.value);
			}
		});
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
				val = this.convertParametersToObj_(val);
				this.parseObjectParamValues_(val);
			}
			if (core.isDef(val) && val !== '') {
				json[name] = val;
			}
		}
		return json;
	}
}

/**
 * List of attributes that represent the api constructed by this component.
 * @type {!Array<string>}
 * @static
 */
ApiBase.API_ATTRS = [
	'auth',
	'body',
	'description',
	'handler',
	'method',
	'parameters',
	'path',
	'title',
	'visibility'
];

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
		validator: core.isObject,
		valueFn: function() {
			return {};
		}
	},

	/**
	 * Object with the configuration related to how the body of a request to this
	 * API should be parsed.
	 * @type {Object}
	 */
	body: {
		validator: core.isObject,
		valueFn: function() {
			return {};
		}
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
	},

	/**
	 * Flag indicating if visibility is enabled or not.
	 * @type {boolean}
	 * @default true
	 */
	visibility: {
		value: true
	}
};

/**
 * The regex used to search for params in the API's path.
 * @type {!RegExp}
 * @static
 */
ApiBase.PATH_PARAMS_REGEX = /\/:(\w+)(?:\([^\)]+\))?/g;

export default ApiBase;
