'use strict';

import dom from 'bower:metal/src/dom/dom';
import ApiExplorer from '../src/ApiExplorer';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';

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

	it('should add missing path params to the "parameters" attr', function() {
		explorer = new ApiExplorer({
			parameters: [
				{
					name: 'bar',
					value: 12
				}
			],
			path: '/data/:foo/:bar'
		}).render();

		assert.strictEqual(2, explorer.parameters.length);
		assert.strictEqual('bar', explorer.parameters[0].name);
		assert.ok(explorer.parameters[0].required);
		assert.strictEqual(12, explorer.parameters[0].value);
		assert.strictEqual('foo', explorer.parameters[1].name);
		assert.ok(explorer.parameters[1].required);
		assert.ok(!explorer.parameters[1].value);
	});

	it('should add missing path params to the "parameters" attr when "path" changes', function() {
		explorer = new ApiExplorer({
			parameters: [
				{
					name: 'bar',
					value: 12
				}
			],
			path: '/data/:bar'
		}).render();

		explorer.path = '/data/:foo/:bar';

		assert.strictEqual(2, explorer.parameters.length);
		assert.strictEqual('bar', explorer.parameters[0].name);
		assert.strictEqual(12, explorer.parameters[0].value);
		assert.strictEqual('foo', explorer.parameters[1].name);
		assert.ok(!explorer.parameters[1].value);
	});

	it('should send request to given host and path', function() {
		explorer = new ApiExplorer({
			host: 'foo.org',
			path: '/data'
		}).render();

		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		assert.strictEqual(1, requests.length);
		assert.strictEqual('foo.org/data', requests[0].url);
	});

	it('should send request with chosen method', function() {
		explorer = new ApiExplorer({
			method: ['get', 'post']
		}).render();

		var methodSelect = explorer.components[explorer.element.id + '-methodSelect'];
		methodSelect.selectedIndex = 1;

		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		assert.strictEqual(1, requests.length);
		assert.strictEqual('POST', requests[0].method);

		methodSelect.selectedIndex = 0;
		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
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

		var inputs = explorer.element.querySelectorAll('.explorer-section-try-param');
		assert.strictEqual(3, inputs.length);

		inputs[1].value = 12;
		dom.triggerEvent(inputs[1], 'input');
		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		assert.strictEqual('{"name":"foo","age":"12"}', requests[0].requestBody);
	});

	it('should send request with chosen path params', function() {
		explorer = new ApiExplorer({
			host: 'foo.org',
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
			],
			path: '/data/:name/:age'
		}).render();

		var inputs = explorer.element.querySelectorAll('.explorer-section-try-param');
		assert.strictEqual(3, inputs.length);

		inputs[1].value = 12;
		dom.triggerEvent(inputs[1], 'input');
		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		assert.strictEqual('foo.org/data/foo/12', requests[0].url);
	});

	it('should send request with default value if param chosen value is deleted', function() {
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

		var inputs = explorer.element.querySelectorAll('.explorer-section-try-param');

		inputs[0].value = 'bar';
		dom.triggerEvent(inputs[0], 'input');
		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		assert.strictEqual('{"name":"bar"}', requests[0].requestBody);

		inputs[0].value = '';
		dom.triggerEvent(inputs[0], 'input');
		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		assert.strictEqual('{"name":"foo"}', requests[1].requestBody);
	});

	it('should send request with chosen wildcard value', function() {
		explorer = new ApiExplorer({
			host: 'foo.org',
			path: '/data/*'
		}).render();

		var input = explorer.element.querySelector('.explorer-section-try-param');
		input.value = 12;
		dom.triggerEvent(input, 'input');
		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		assert.strictEqual('foo.org/data/12', requests[0].url);
	});

	it('should send request with chosen path params after path is changed', function(done) {
		explorer = new ApiExplorer({
			host: 'foo.org',
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
			],
			path: '/data/:name/:age'
		}).render();

		var inputs = explorer.element.querySelectorAll('.explorer-section-try-param');
		assert.strictEqual(3, inputs.length);

		inputs[1].value = 12;
		dom.triggerEvent(inputs[1], 'input');
		explorer.path = '/another/:age';

		explorer.once('attrsChanged', function() {
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			assert.strictEqual('foo.org/another/12', requests[0].url);
			assert.strictEqual('{"name":"foo"}', requests[0].requestBody);
			done();
		});
	});

	it('should send request with chosen path params after method is changed', function(done) {
		explorer = new ApiExplorer({
			host: 'foo.org',
			method: ['post', 'put'],
			parameters: [
				{
					name: 'name'
				}
			],
			path: '/data/:name'
		}).render();

		var methodSelect = explorer.components[explorer.element.id + '-methodSelect'];
		methodSelect.selectedIndex = 1;

		var input = explorer.element.querySelector('.explorer-section-try-param');
		input.value = 'foo';
		dom.triggerEvent(input, 'input');

		explorer.once('attrsChanged', function() {
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			assert.strictEqual('foo.org/data/foo', requests[0].url);
			assert.strictEqual('PUT', requests[0].method);
			done();
		});
	});

	it('should render the response status code and text', function(done) {
		explorer = new ApiExplorer().render();

		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		requests[0].respond(200);

		explorer.once('attrsChanged', function() {
			assert.ok(explorer.response);
			assert.strictEqual(200, explorer.response.statusCode);
			assert.strictEqual('OK', explorer.response.statusText);
			assert.strictEqual('200 OK', explorer.element.querySelector('.explorer-status').textContent);
			done();
		});
	});

	it('should render the response json body', function(done) {
		explorer = new ApiExplorer().render();

		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
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
			assert.strictEqual('{"foo":"bar"}', explorer.element.querySelector('.explorer-code-container').textContent);
			done();
		});
	});

	it('should not render non json body', function(done) {
		explorer = new ApiExplorer().render();

		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
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
			assert.ok(!explorer.element.querySelector('.explorer-code-container'));
			done();
		});
	});

	it('should render path on header', function() {
		explorer = new ApiExplorer({
			path: '/data/:name'
		}).render();
		assert.strictEqual('/data/:name', explorer.element.querySelector('.explorer-title-name').textContent);
	});

	it('should render title when defined instead of path on header', function() {
		explorer = new ApiExplorer({
			path: '/data/:name',
			title: 'My Title'
		}).render();
		assert.strictEqual('My Title', explorer.element.querySelector('.explorer-title-name').textContent);
	});

	it('should decorate ApiExplorer without repainting when content is correct', function() {
		var markup = ComponentRegistry.Templates.ApiExplorer.content({
			auth: {
				permissions: {
					Edit: true
				},
				roles: {
					Admin: true,
					Member: true
				}
			},
			description: 'My description',
			host: 'foo.org',
			id: 'explorer',
			method: ['get', 'post'],
			parameters: [
				{
					description: 'desc',
					name: 'bar',
					value: 12,
					required: true,
					type: 'number'
				}
			],
			path: '/data/:bar',
			replacedPath: '/data/12',
			response: {
				bodyString: 'OK',
				statusCode: 200
			},
			title: 'My API'
		});

		dom.append(document.body, markup.content);
		var outerHTML = document.getElementById('explorer').outerHTML;

		explorer = new ApiExplorer({
			auth: {
				permissions: {
					Edit: true
				},
				roles: {
					Admin: true,
					Member: true
				}
			},
			description: 'My description',
			element: '#explorer',
			host: 'foo.org',
			id: 'explorer',
			method: ['get', 'post'],
			parameters: [
				{
					description: 'desc',
					name: 'bar',
					value: 12,
					required: true,
					type: 'number'
				}
			],
			path: '/data/:bar',
			replacedPath: '/data/12',
			response: {
				bodyString: 'OK',
				statusCode: 200
			},
			title: 'My API'
		}).decorate();

		assert.strictEqual(explorer.element.outerHTML, outerHTML);
	});
});
