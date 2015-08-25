'use strict';

import dom from 'bower:metal/src/dom/dom';
import ApiExplorer from '../src/ApiExplorer';

describe('ApiExplorer', function() {
	var explorer;
	var requests;

	beforeEach(function() {
		requests = [];
		this.xhr = sinon.useFakeXMLHttpRequest();
		this.xhr.onCreate = function(xhr) {
			requests.push(xhr);
		};
	});

	afterEach(function() {
		explorer.dispose();
		this.xhr.restore();
	});

	it('should send request to given path', function() {
		explorer = new ApiExplorer({
			path: 'foo.org/data/'
		}).render();

		dom.triggerEvent(explorer.element.querySelector('.app-explorer-try-it-button'), 'click');
		assert.strictEqual(1, requests.length);
		assert.strictEqual('foo.org/data/', requests[0].url);
	});

	it('should send request with chosen method', function() {
		explorer = new ApiExplorer({
			method: ['get', 'post']
		}).render();

		var selectElement = explorer.element.querySelector('.app-explorer-try-it-methods');
		selectElement.value = 'post';

		dom.triggerEvent(explorer.element.querySelector('.app-explorer-try-it-button'), 'click');
		assert.strictEqual(1, requests.length);
		assert.strictEqual('POST', requests[0].method);

		selectElement.value = 'get';
		dom.triggerEvent(explorer.element.querySelector('.app-explorer-try-it-button'), 'click');
		assert.strictEqual(2, requests.length);
		assert.strictEqual('GET', requests[1].method);
	});

	it('should send request with chosen body params', function() {
		explorer = new ApiExplorer({
			method: ['post'],
			parameters: [
				{
					name: 'name',
					value: 'foo'
				},
				{
					name: 'age'
				},
				{
					name: 'extra'
				}
			]
		}).render();

		var inputs = explorer.element.querySelectorAll('.app-explorer-try-it-param-input');
		assert.strictEqual(3, inputs.length);

		inputs[1].value = 12;
		dom.triggerEvent(explorer.element.querySelector('.app-explorer-try-it-button'), 'click');
		assert.deepEqual('{"name":"foo","age":"12"}', requests[0].requestBody);
	});

	it('should send request with chosen url params', function() {
		explorer = new ApiExplorer({
			parameters: [
				{
					name: 'name',
					in: 'url',
					value: 'foo'
				},
				{
					name: 'age',
					in: 'url'
				},
				{
					name: 'extra',
					in: 'url'
				}
			],
			path: 'foo.org/data/'
		}).render();

		var inputs = explorer.element.querySelectorAll('.app-explorer-try-it-param-input');
		assert.strictEqual(3, inputs.length);

		inputs[1].value = 12;
		dom.triggerEvent(explorer.element.querySelector('.app-explorer-try-it-button'), 'click');
		assert.strictEqual('foo.org/data/?name=foo&age=12', requests[0].url);
	});

	it('should render the response status code and text', function(done) {
		explorer = new ApiExplorer().render();

		dom.triggerEvent(explorer.element.querySelector('.app-explorer-try-it-button'), 'click');
		requests[0].respond(200);

		explorer.once('attrsChanged', function() {
			assert.ok(explorer.response);
			assert.strictEqual(200, explorer.response.statusCode);
			assert.strictEqual('OK', explorer.response.statusText);
			assert.strictEqual('200 OK', explorer.element.querySelector('.api-explorer-response-status').textContent);
			done();
		});
	});

	it('should render the response json body', function(done) {
		explorer = new ApiExplorer().render();

		dom.triggerEvent(explorer.element.querySelector('.app-explorer-try-it-button'), 'click');
		requests[0].respond(
			200,
			{
				'Content-Type': 'application/json'
			},
			'{"foo":"bar"}'
		);

		explorer.once('attrsChanged', function() {
			assert.ok(explorer.response);
			assert.strictEqual('{"foo":"bar"}', explorer.response.bodyString);
			assert.strictEqual('{"foo":"bar"}', explorer.element.querySelector('.api-explorer-response-body').textContent);
			done();
		});
	});

	it('should not render non json body', function(done) {
		explorer = new ApiExplorer().render();

		dom.triggerEvent(explorer.element.querySelector('.app-explorer-try-it-button'), 'click');
		requests[0].respond(
			200,
			{
				'Content-Type': 'text/html'
			},
			'foo'
		);

		explorer.once('attrsChanged', function() {
			assert.ok(explorer.response);
			assert.ok(!explorer.response.bodyString);
			assert.ok(!explorer.element.querySelector('.api-explorer-response-body'));
			done();
		});
	});
});
