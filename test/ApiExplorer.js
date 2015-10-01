'use strict';

import dom from 'bower:metal/src/dom/dom';
import ApiExplorer from '../src/ApiExplorer';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import EventEmitter from 'bower:metal/src/events/EventEmitter';

describe('ApiExplorer', function() {
	var explorer;
	var ioInstance;
	var requests;

	beforeEach(function() {
		ioInstance = new EventEmitter();
		window.io = function() {
			return ioInstance;
		};
		sinon.spy(window, 'io');

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

	it('should replace "@/" substrings from path with "/"', function() {
		explorer = new ApiExplorer({
			path: '/data@/:foo@/:bar'
		}).render();
		assert.strictEqual('/data/:foo/:bar', explorer.path);
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

	it('should render a check icon if "visibility" is true or not set', function() {
		explorer = new ApiExplorer().render();
		assert.ok(explorer.visibility);
		assert.ok(explorer.element.querySelector('.explorer-visibility .icon-12-check'));
		assert.ok(!explorer.element.querySelector('.explorer-visibility .icon-12-close-short'));
	});

	it('should render a close icon if "visibility" is false', function() {
		explorer = new ApiExplorer({
			visibility: false
		}).render();
		assert.ok(!explorer.element.querySelector('.explorer-visibility .icon-12-check'));
		assert.ok(explorer.element.querySelector('.explorer-visibility .icon-12-close-short'));
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

	it('should ignore wildcard on request path if no value was chosen for it', function() {
		explorer = new ApiExplorer({
			host: 'foo.org',
			path: '/data/*'
		}).render();

		dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
		assert.strictEqual('foo.org/data', requests[0].url);
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

	describe('Response', function() {
		it('should render the response status code and text (1xx)', function(done) {
			explorer = new ApiExplorer().render();

			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			requests[0].respond(100);

			explorer.once('attrsChanged', function() {
				assert.ok(explorer.response);
				assert.strictEqual(100, explorer.response.statusCode);
				assert.strictEqual('Continue', explorer.response.statusText);

				var element = explorer.element.querySelector('.explorer-status');
				assert.strictEqual('100 Continue', element.textContent);
				assert.ok(dom.hasClass(element, 'explorer-status-1xx'));
				done();
			});
		});

		it('should render the response status code and text (2xx)', function(done) {
			explorer = new ApiExplorer().render();

			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			requests[0].respond(200);

			explorer.once('attrsChanged', function() {
				assert.ok(explorer.response);
				assert.strictEqual(200, explorer.response.statusCode);
				assert.strictEqual('OK', explorer.response.statusText);

				var element = explorer.element.querySelector('.explorer-status');
				assert.strictEqual('200 OK', element.textContent);
				assert.ok(dom.hasClass(element, 'explorer-status-2xx'));
				done();
			});
		});

		it('should render the response status code and text (3xx)', function(done) {
			explorer = new ApiExplorer().render();

			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			requests[0].respond(301);

			explorer.once('attrsChanged', function() {
				assert.ok(explorer.response);
				assert.strictEqual(301, explorer.response.statusCode);
				assert.strictEqual('Moved Permanently', explorer.response.statusText);

				var element = explorer.element.querySelector('.explorer-status');
				assert.strictEqual('301 Moved Permanently', element.textContent);
				assert.ok(dom.hasClass(element, 'explorer-status-3xx'));
				done();
			});
		});

		it('should render the response status code and text (4xx)', function(done) {
			explorer = new ApiExplorer().render();

			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			requests[0].respond(404);

			explorer.once('attrsChanged', function() {
				assert.ok(explorer.response);
				assert.strictEqual(404, explorer.response.statusCode);
				assert.strictEqual('Not Found', explorer.response.statusText);

				var element = explorer.element.querySelector('.explorer-status');
				assert.strictEqual('404 Not Found', element.textContent);
				assert.ok(dom.hasClass(element, 'explorer-status-4xx'));
				done();
			});
		});

		it('should render the response status code and text (5xx)', function(done) {
			explorer = new ApiExplorer().render();

			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			requests[0].respond(500);

			explorer.once('attrsChanged', function() {
				assert.ok(explorer.response);
				assert.strictEqual(500, explorer.response.statusCode);
				assert.strictEqual('Internal Server Error', explorer.response.statusText);

				var element = explorer.element.querySelector('.explorer-status');
				assert.strictEqual('500 Internal Server Error', element.textContent);
				assert.ok(dom.hasClass(element, 'explorer-status-5xx'));
				done();
			});
		});

		it('should render the response json body', function(done) {
			explorer = new ApiExplorer().render();

			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			requests[0].respond(
				200,
				{
					'Content-Type': 'application/json;'
				},
				'{"foo":"bar"}'
			);

			explorer.once('attrsChanged', function() {
				assert.ok(explorer.response);
				assert.strictEqual('{\n    "foo": "bar"\n}', explorer.response.bodyString);

				var codeMirror = explorer.element.querySelector('.explorer-code-container .CodeMirror').CodeMirror;
				assert.strictEqual('{\n    "foo": "bar"\n}', codeMirror.getValue());
				assert.strictEqual('application/json', codeMirror.getOption('mode'));
				done();
			});
		});

		it('should render response without json body', function(done) {
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
				assert.strictEqual('foo', explorer.response.bodyString);

				var codeMirror = explorer.element.querySelector('.explorer-code-container .CodeMirror').CodeMirror;
				assert.strictEqual('foo', codeMirror.getValue());
				assert.strictEqual('text/html', codeMirror.getOption('mode'));
				done();
			});
		});

		it('should update CodeMirror\'s mode when response changes but CodeMirror is the same', function(done) {
			explorer = new ApiExplorer({
				response: {
					bodyString: 'Body',
					statusCode: 200,
					statusText: 'OK',
					type: 'text/html'
				}
			}).render();

			var codeMirror = explorer.element.querySelector('.explorer-code-container .CodeMirror').CodeMirror;

			explorer.response = {
				bodyString: 'Body',
				statusCode: 200,
				statusText: 'OK',
				type: 'application/javascript'
			};
			explorer.once('attrsChanged', function() {
				var newCodeMirror = explorer.element.querySelector('.explorer-code-container .CodeMirror').CodeMirror;
				assert.strictEqual(codeMirror, newCodeMirror);
				assert.strictEqual('application/javascript', newCodeMirror.getOption('mode'));
				done();
			});
		});
	});

	describe('Response - Real Time', function() {
		it('should not render real time response if button is not clicked', function() {
			explorer = new ApiExplorer({
				method: ['get', 'post']
			}).render();
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');

			ioInstance.emit('changes', 'foo');
			assert.ok(!explorer.response);
		});

		it('should not render real time response if button is clicked but selected method is not "get"', function() {
			explorer = new ApiExplorer({
				method: ['post', 'get']
			}).render();
			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');

			ioInstance.emit('changes', 'foo');
			assert.ok(!explorer.response);
		});

		it('should not render real time response if button is not turned off again', function() {
			explorer = new ApiExplorer({
				method: ['get', 'post']
			}).render();
			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');

			ioInstance.emit('changes', 'foo');
			assert.ok(explorer.response);
			assert.ok(!explorer.response.bodyString);
		});

		it('should add "real-time" css class to element during real time request', function() {
			explorer = new ApiExplorer({
				method: ['get', 'post']
			}).render();
			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');
			assert.ok(!dom.hasClass(explorer.element, 'real-time'));

			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			assert.ok(dom.hasClass(explorer.element, 'real-time'));

			explorer.method = ['post', 'get'];
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');
			assert.ok(!dom.hasClass(explorer.element, 'real-time'));
		});

		it('should send "sort" query automatically with real time request', function() {
			explorer = new ApiExplorer({
				host: 'foo.org',
				method: ['get', 'post']
			}).render();
			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');

			assert.strictEqual(1, io.callCount);
			assert.strictEqual('foo.org?sort=' + encodeURIComponent('[{"id":"desc"}]') + '?url=%2F', io.args[0][0]);
		});

		it('should render real time response with json content', function(done) {
			explorer = new ApiExplorer({
				method: ['get', 'post']
			}).render();
			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');

			ioInstance.emit('changes', {
				foo: 'bar'
			});
			assert.ok(explorer.response);
			assert.strictEqual('{\n    "foo": "bar"\n}', explorer.response.bodyString);

			explorer.once('attrsChanged', function() {
				var codeMirror = explorer.element.querySelector('.explorer-code-container .CodeMirror').CodeMirror;
				assert.strictEqual('{\n    "foo": "bar"\n}', codeMirror.getValue());
				assert.strictEqual('application/json', codeMirror.getOption('mode'));
				done();
			});
		});

		it('should render real time response without json content', function(done) {
			explorer = new ApiExplorer({
				method: ['get', 'post']
			}).render();
			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');

			ioInstance.emit('changes', 'foo');
			assert.ok(explorer.response);
			assert.strictEqual('foo', explorer.response.bodyString);

			explorer.once('attrsChanged', function() {
				var codeMirror = explorer.element.querySelector('.explorer-code-container .CodeMirror').CodeMirror;
				assert.strictEqual('foo', codeMirror.getValue());
				assert.strictEqual('text/plain', codeMirror.getOption('mode'));
				done();
			});
		});

		it('should keep rendering received real time responses', function(done) {
			explorer = new ApiExplorer({
				method: ['get', 'post']
			}).render();
			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');

			ioInstance.emit('changes', 'foo');

			explorer.once('attrsChanged', function() {
				var codeMirror = explorer.element.querySelector('.explorer-code-container .CodeMirror').CodeMirror;
				assert.strictEqual('foo', codeMirror.getValue());
				assert.strictEqual('text/plain', codeMirror.getOption('mode'));

				ioInstance.emit('changes', 'bar');
				explorer.once('attrsChanged', function() {
					codeMirror = explorer.element.querySelector('.explorer-code-container .CodeMirror').CodeMirror;
					assert.strictEqual('bar', codeMirror.getValue());
					assert.strictEqual('text/plain', codeMirror.getOption('mode'));
					done();
				});
			});
		});
	});

	describe('Snippet - JavaScript', function() {
		it('should render correct snippet for sending request via js', function() {
			explorer = new ApiExplorer({
				host: 'foo.org',
				path: '/data'
			}).render();

			var codeMirror = explorer.element.querySelector('.explorer-snippets-container .CodeMirror').CodeMirror;
			var expectedStr = 'Launchpad.url(\'foo.org/data\')\n    .body(params)\n    .get();';
			assert.strictEqual(expectedStr, codeMirror.getValue());
		});

		it('should render correct snippet when method changes', function(done) {
			explorer = new ApiExplorer({
				host: 'foo.org',
				method: ['get', 'post'],
				path: '/data'
			}).render();

			explorer.methodSelectedIndex = 1;
			explorer.once('attrsChanged', function() {
				var codeMirror = explorer.element.querySelector('.explorer-snippets-container .CodeMirror').CodeMirror;
				var expectedStr = 'Launchpad.url(\'foo.org/data\')\n    .body(params)\n    .post();';
				assert.strictEqual(expectedStr, codeMirror.getValue());
				done();
			});
		});

		it('should render correct snippet when path param changes', function(done) {
			explorer = new ApiExplorer({
				host: 'foo.org',
				path: '/data/:foo'
			}).render();

			var inputs = explorer.element.querySelectorAll('.explorer-section-try-param');
			inputs[0].value = 12;
			dom.triggerEvent(inputs[0], 'input');

			explorer.once('attrsChanged', function() {
				var codeMirror = explorer.element.querySelector('.explorer-snippets-container .CodeMirror').CodeMirror;
				var expectedStr = 'Launchpad.url(\'foo.org/data/12\')\n    .body(params)\n    .get();';
				assert.strictEqual(expectedStr, codeMirror.getValue());
				done();
			});
		});

		it('should render correct snippet when request is real time', function() {
			explorer = new ApiExplorer({
				host: 'foo.org',
				path: '/data'
			}).render();

			dom.triggerEvent(explorer.element.querySelector('.switcher'), 'click');
			dom.triggerEvent(explorer.element.querySelector('.explorer-section-try-button'), 'click');

			var codeMirror = explorer.element.querySelector('.explorer-snippets-container .CodeMirror').CodeMirror;
			var expectedStr = 'Launchpad.url(\'foo.org/data\')\n    .body(params)\n    .sort(\'id\', \'desc\')\n    .watch();';
			assert.strictEqual(expectedStr, codeMirror.getValue());
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
				permissions: ['Edit'],
				roles: ['Admin', 'Member']
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
				permissions: ['Edit'],
				roles: ['Admin', 'Member']
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
		});

		// Compare with the resulting HTML right after rendering, but before CodeMirror is added.
		var afterRenderHTML;
		explorer.on('render', () => {
			afterRenderHTML = explorer.element.outerHTML;
		});
		explorer.decorate();

		assert.strictEqual(afterRenderHTML, outerHTML);
	});
});
