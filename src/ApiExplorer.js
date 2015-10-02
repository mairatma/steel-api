'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import object from 'bower:metal/src/object/object';
import ApiBase from './ApiBase';
import Clipboard from 'bower:steel-clipboard/src/Clipboard';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Embodied from 'bower:api.js/src/api-query/Embodied';
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

		this.realTimeListener_ = this.handleStreamResponse_.bind(this);
		this.snippetType_ = 'js';

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
	 * Called automatically when the component is attached to the document. Builds the CodeMirror
	 * text editor for the response body.
	 */
	attached() {
		this.buildResponseCodeMirror_();
		this.buildSnippetsCodeMirror_();
		this.buildClipboard_();
	}

	/**
	 * Builds the `CodeMirror` text editor for the body section.
	 * @protected
	 */
	buildBodyCodeMirror_() {
		if (!this.bodyCodeMirror_) {
			this.bodyCodeMirror_ = this.buildCodeMirror_(this.element.querySelector('.explorer-section-body textarea'));
		}
	}

	/**
	 * Builds a CodeMirror text editor.
	 * @param {!Element} textarea
	 * @param {Object=} opt_options
	 * @return {!CodeMirror}
	 * @protected
	 */
	buildCodeMirror_(textarea, opt_options) {
		var options = object.mixin({
			lineNumbers: true,
			mode: 'javascript'
		}, opt_options);
		return CodeMirror.fromTextArea(textarea, options);
	}

	/**
	 * Builds the CodeMirror text editor for the handler field.
	 * @protected
	 */
	buildResponseCodeMirror_() {
		var textarea = this.element.querySelector('.explorer-code-container textarea');
		if (textarea) {
			if (!this.responseCodeMirror_ || textarea !== this.responseCodeMirror_.getTextArea()) {
				this.responseCodeMirror_ = this.buildCodeMirror_(textarea, {
					mode: this.response.type,
					readOnly: true,
					value: this.response.bodyString,
					viewportMargin: Infinity
				});
			} else {
				this.responseCodeMirror_.setOption('mode', this.response.type);
				this.responseCodeMirror_.setValue(this.response.bodyString);
			}
		}
	}

	/**
	 * Builds the CodeMirror text editor for the snippets section.
	 * @protected
	 */
	buildSnippetsCodeMirror_() {
		if (!this.response.statusText) {
			return;
		}

		if (!this.snippetsCodeMirror_) {
			var textarea = this.element.querySelector('.explorer-snippets-container textarea');
			this.snippetsCodeMirror_ = this.buildCodeMirror_(
				textarea,
				{
					readOnly: true,
					viewportMargin: Infinity
				}
			);
		}
		this.updateSnippet_();
	}

	/**
	 * Creates a new `Clipboard` instance for the "Try out" input field.
	 * @protected
	 */
	buildClipboard_() {
		this.clipboard_ = new Clipboard();
		this.clipboardSnippets_ = new Clipboard({
			selector: '#' + this.id + ' .explorer-section-snippets-copy',
			text: () => this.snippetsCodeMirror_.getValue()
		});
	}

	/**
	 * Builds the cURL code snippet for sending the configured request.
	 * @return {string}
	 * @protected
	 */
	buildCurlSnippet_() {
		var method = this.getRequestMethod_();
		var body = this.getRequestBody_();
		var snippet = 'curl -X "' + method.toUpperCase() + '" "' + this.getRequestUrl_() + '"' +
			' \\\n  -H "Content-Type: ' + this.getRequestContentType_(body) + '"';

		if (document.cookie) {
			snippet += ' \\\n  -H "Cookie: ' + document.cookie + '"';
		}

		body = JSON.stringify(body).replace(/"/g, '\\"');
		if (body !== '{}') {
			snippet += ' \\\n  -d "' + body + '"';
		}
		return snippet;
	}

	/**
	 * Builds the Java code snippet for sending the configured request.
	 * @return {string}
	 * @protected
	 */
	buildJavaSnippet_() {
		var snippet = 'Launchpad.url("' + this.getRequestUrl_() + '")\n' +
			'    .header("content-type", "application/json")\n';
		var body = this.getRequestBody_();
		if (core.isObject(body)) {
			body = JSON.stringify(body);
		}
		if (core.isString(body)) {
			body = '"' + body.replace(/"/g, '\\"') + '"';
		}
		return snippet + this.buildLauchpadMethodCall_(body);
	}

	/**
	 * Builds the JavaScript code snippet for sending the configured request.
	 * @return {string}
	 * @protected
	 */
	buildJsSnippet_() {
		var snippet = 'Launchpad.url(\'' + this.getRequestUrl_() + '\')\n';
		var body = this.getRequestBody_(true);
		return snippet + this.buildLauchpadMethodCall_(core.isObject(body) ? JSON.stringify(body) : body);
	}

	/**
	 * Builds the method call part of the code snippet for a Launchpad request.
	 * @param {string} body
	 * @protected
	 */
	buildLauchpadMethodCall_(body) {
		var method = this.getRequestMethod_();
		if (body === '{}') {
			body = '';
		}
		if (this.isRequestRealTime_(method)) {
			return '    .watch(' + body + ');';
		} else {
			return '    .' + method + '(' + body + ');';
		}
	}

	/**
	 * Builds a `Launchpad` request with the currently chosen argument.
	 * @return {!Launchpad}
	 * @protected
	 */
	buildLaunchpadRequest_() {
		var body = this.getRequestBody_();
		return Launchpad.url(this.getRequestUrl_())
			.header('Content-Type', this.getRequestContentType_(body))
			.body(body);
	}

	/**
	 * Closes the open real time connection, if there is one.
	 * @protected
	 */
	closeRealTimeConnection_() {
		if (this.realTimeCon_) {
			dom.removeClasses(this.element, 'real-time');
			this.realTimeCon_.off('changes', this.realTimeListener_);
			this.realTimeCon_ = null;
		}
	}

	/**
	 * @inheritDoc
	 */
	disposeInternal() {
		this.closeRealTimeConnection_();
		super.disposeInternal();
		this.responseCodeMirror_ = null;
		this.snippetsCodeMirror_ = null;
		this.bodyCodeMirror_ = null;
		this.clipboard_.dispose();
		this.clipboard_ = null;
		this.clipboardSnippets_.dispose();
		this.clipboardSnippets_ = null;
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
	 * Gets the body content that should be sent with the request.
	 * @param {boolean=} opt_raw If true, will return the raw value of the body,
	 *   without calling "eval" on it.
	 * @return {*}
	 * @protected
	 */
	getRequestBody_(opt_raw) {
		var body = this.bodyCodeMirror_ ? this.bodyCodeMirror_.getValue() : '';
		if (body.trim() === '') {
			body = this.getBodyParams_();
		} else if (!opt_raw) {
			body = eval('(function() {return ' + body + ';})()'); // jshint ignore:line
			if (body instanceof Embodied) {
				body = body.body();
			}
		}
		return body;
	}

	/**
	 * Gets the request's content type according to its body content.
	 * @param {*} body
	 * @return {string}
	 * @protected
	 */
	getRequestContentType_(body) {
		return core.isObject(body) ? 'application/json' : 'text/plain';
	}

	/**
	 * Gets the currently selected method, which will be used in the request.
	 * @return {string}
	 * @protected
	 */
	getRequestMethod_() {
		var method = this.method[0];
		if (this.method.length > 1) {
			method = this.method[this.methodSelectedIndex];
		}
		return method;
	}

	/**
	 * Gets the full url that the request will be sent to.
	 * @return {string}
	 * @protected
	 */
	getRequestUrl_() {
		return this.host + this.replacedPath.replace(/\/(\*)/, () => '');
	}

	/**
	 * Handles a `click` event on the toggler for the body section. Expands/collapses
	 * the body when clicked.
	 * @param {!Event} event
	 * @protected
	 */
	handleBodyTogglerClick_(event) {
		var container = event.delegateTarget.parentNode;
		var arrow = event.delegateTarget.querySelector('.explorer-section-body-toggler-arrow');
		dom.toggleClasses(arrow, 'icon-12-arrow-down-short');
		dom.toggleClasses(arrow, 'icon-12-arrow-up-short');
		dom.toggleClasses(container, 'expanded');
		if (dom.hasClass(container, 'expanded')) {
			this.buildBodyCodeMirror_();
			this.bodyCodeMirror_.getInputField().focus();
		} else {
			this.bodyCodeMirror_.setValue('');
		}
	}

	/**
	 * Handles a `click` event on the button for running the API.
	 * @protected
	 */
	handleClickRun_() {
		this.sendRequest_();
	}

	/**
	 * Handles a `selectedIndexChanged` event from the method `Select` instance.
	 * Updates the `methodSelectedIndex` attr accordingly.
	 * @param {!Object} data
	 * @param {!Event} event
	 * @protected
	 */
	handleMethodSelectedIndexChanged_(data, event) {
		this.methodSelectedIndex = event.target.selectedIndex;
		this.response = {};
		this.closeRealTimeConnection_();
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
	 * Handles a `checkedChanged` event from the real time `Switcher` instance.
	 * Closes the real time connection in case it was turned off.
	 * @protected
	 */
	handleRealTimeCheckedChanged_() {
		this.updateRealTimeConnection_();
		this.updateSnippet_();
	}

	/**
	 * Handles the HTTP response received after running the API.
	 * @param {!ClientResponse} response
	 * @protected
	 */
	handleResponse_(response) {
		var type = response.headers().get('Content-Type') || '';
		var separatorIndex = type.indexOf(';');
		this.updateResponse_(
			response.body(),
			response.statusCode(),
			response.statusText(),
			separatorIndex === -1 ? type : type.substr(0, separatorIndex)
		);
	}

	/**
	 * Handles a `click` event for one of the snippet language buttons.
	 * @param {!Event} event
	 * @protected
	 */
	handleSnippetLanguageClick_(event) {
		dom.removeClasses(
			this.element.querySelector('.explorer-snippets-type-selected'),
			'explorer-snippets-type-selected'
		);
		dom.addClasses(event.delegateTarget, 'explorer-snippets-type-selected');
		this.snippetType_ = event.delegateTarget.getAttribute('data-lang');
		this.updateSnippet_();
	}

	/**
	 * Handles a response coming from a stream (real time) request.
	 * @param {!Object} response
	 * @protected
	 */
	handleStreamResponse_(response) {
		this.updateResponse_(
			response,
			200,
			'OK',
			core.isObject(response) ? 'application/json' : 'text/plain'
		);
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
	 * Checks if the request will be real time.
	 * @param {string} method
	 * @return {boolean}
	 * @protected
	 */
	isRequestRealTime_(method) {
		var realTimeSwitcher = this.components[this.id + '-realTimeSwitcher'];
		return method === 'get' && realTimeSwitcher.checked;
	}

	/**
	 * Opens a real time connection and listens to its updates.
	 * @protected
	 */
	openRealTimeConnection_() {
		this.sendRequest_();
		this.realTimeCon_ = this.buildLaunchpadRequest_().watch();
		this.realTimeCon_.on('changes', this.realTimeListener_);
		dom.addClasses(this.element, 'real-time');
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
	 * Sends a request with the current chosen configuration.
	 * @protected
	 */
	sendRequest_() {
		var launchpad = this.buildLaunchpadRequest_();
		launchpad[this.getRequestMethod_()]().then(this.handleResponse_.bind(this));
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
	 * Replaces "@/" substrings with "/", since these characters are just
	 * separators that shouldn't be sent with the request.
	 * @param {string} path
	 * @return {string}
	 * @protected
	 */
	setterPathFn_(path) {
		return path.replace(/@\//g, '/');
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

	/**
	 * Synchronization logic for the `response` attr. Updates the CodeMirror
	 * text editor for the response body.
	 */
	syncResponse() {
		if (this.wasRendered) {
			this.buildResponseCodeMirror_();
			if (this.response.statusText) {
				dom.removeClasses(this.getSurfaceElement('trySnippets'), 'hidden');
				this.buildSnippetsCodeMirror_();
			} else {
				dom.addClasses(this.getSurfaceElement('trySnippets'), 'hidden');
			}
		}
	}

	/**
	 * Updates the real time connection, creating or closing it as necessary.
	 * @protected
	 */
	updateRealTimeConnection_() {
		if (this.isRequestRealTime_(this.getRequestMethod_())) {
			this.openRealTimeConnection_();
		} else {
			this.closeRealTimeConnection_();
		}
	}

	/**
	 * Updates the response attr according to the given information.
	 * @param {*} content The content that should be rendered as the response.
	 * @param {number} statusCode
	 * @param {string} statusText
	 * @param {string} type
	 * @protected
	 */
	updateResponse_(content, statusCode, statusText, type) {
		this.response = {
			bodyString: core.isObject(content) ? JSON.stringify(content, null, 4) : content,
			type: type,
			statusCode: statusCode,
			statusText: statusText
		};
	}

	/**
	 * Updates the code snippet that will be shown to the user.
	 * @protected
	 */
	updateSnippet_() {
		if (!this.snippetsCodeMirror_) {
			return;
		}
		switch (this.snippetType_) {
			case 'js':
				this.snippet_ = this.buildJsSnippet_();
				break;
			case 'java':
				this.snippet_ = this.buildJavaSnippet_();
				break;
			case 'curl':
				this.snippet_ = this.buildCurlSnippet_();
				break;
		}
		this.snippetsCodeMirror_.setValue(this.snippet_);
	}
}

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
ApiExplorer.ATTRS = {
	/**
	 * The index of the currently selected method.
	 * @type {number}
	 */
	methodSelectedIndex: {
		validator: core.isNumber,
		value: 0
	},

	/**
	 * The api's path url.
	 * @type {string}
	 */
	path: {
		setter: 'setterPathFn_',
		validator: core.isString,
		value: ''
	},

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
		validator: core.isObject,
		valueFn: () => {
			return {};
		}
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
