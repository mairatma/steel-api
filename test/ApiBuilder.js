'use strict';

import dom from 'bower:metal/src/dom/dom';
import ApiBuilder from '../src/ApiBuilder';

describe('ApiBuilder', function() {
	var builder;

	afterEach(function() {
		builder.dispose();
	});

	describe('Render', function() {
		it('should fill title text field with given title', function() {
			builder = new ApiBuilder({
				id: 'builder',
				title: 'foo'
			}).render();
			assert.strictEqual('foo', builder.element.querySelector('#builder-title input').value);
		});

		it('should fill description text field with given description', function() {
			builder = new ApiBuilder({
				id: 'builder',
				description: 'foo'
			}).render();
			assert.strictEqual('foo', builder.element.querySelector('#builder-description textarea').value);
		});

		it('should check selected buttons for given methods', function() {
			builder = new ApiBuilder({
				id: 'builder',
				method: ['get', 'post']
			}).render();

			var buttons = builder.element.querySelectorAll('#builder-methods .btn-group .btn-group-selected');
			assert.strictEqual(2, buttons.length);
			assert.strictEqual('get', buttons[0].textContent);
			assert.strictEqual('post', buttons[1].textContent);
		});

		it('should fill path text field with given path', function() {
			builder = new ApiBuilder({
				id: 'builder',
				path: 'foo'
			}).render();
			assert.strictEqual('foo', builder.element.querySelector('#builder-path input').value);
		});

		it('should fill handler text field with given handler', function() {
			builder = new ApiBuilder({
				id: 'builder',
				handler: 'foo'
			}).render();
			assert.strictEqual('foo', builder.element.querySelector('#builder-handler textarea').value);
		});

		it('should fill param values with the given parameters', function() {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						type: 'string',
						value: 'value',
						in: 'url',
						description: 'desc',
						required: true
					},
					bar: {
						type: 'boolean'
					}
				}
			}).render();

			var paramRows = builder.element.querySelectorAll('.builder-param-item');
			assert.strictEqual(2, paramRows.length);
			assert.strictEqual('foo', paramRows[0].querySelectorAll('input')[0].value);
			assert.strictEqual(1, builder.components[builder.id + '-typeSelect0'].selectedIndex);
			assert.ok(builder.components[builder.id + '-requiredSwitcher0'].checked);

			assert.strictEqual('bar', paramRows[1].querySelectorAll('input')[0].value);
			assert.strictEqual(2, builder.components[builder.id + '-typeSelect1'].selectedIndex);
			assert.ok(!builder.components[builder.id + '-requiredSwitcher1'].checked);
		});
	});

	describe('Params', function() {
		it('should add a new parameter row when button is clicked', function(done) {
			builder = new ApiBuilder().render();

			assert.strictEqual(0, builder.element.querySelectorAll('.builder-param-item').length);
			dom.triggerEvent(builder.element.querySelector('.builder-param-more button'), 'click');

			builder.once('attrsChanged', function() {
				assert.strictEqual(1, builder.element.querySelectorAll('.builder-param-item').length);
				dom.triggerEvent(builder.element.querySelector('.builder-param-more button'), 'click');
				builder.once('attrsChanged', function() {
					assert.strictEqual(2, builder.element.querySelectorAll('.builder-param-item').length);
					done();
				});
			});
		});

		it('should automatically focus newly added parameter row', function(done) {
			builder = new ApiBuilder().render();

			assert.strictEqual(0, builder.element.querySelectorAll('.builder-param-item').length);
			dom.triggerEvent(builder.element.querySelector('.builder-param-more button'), 'click');

			builder.once('attrsChanged', function() {
				var paramInput = builder.element.querySelector('.builder-param-item input');
				assert.strictEqual(document.activeElement, paramInput);
				done();
			});
		});

		it('should update "parameters" when name of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						value: 1
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.once('parametersChanged', listener);

			var element = builder.element.querySelector('.builder-param-item [data-name="name"]');
			element.value = 'bar';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual(1, listener.callCount);
				assert.strictEqual('bar', builder.parameters[0].name);
				assert.ok(!builder.toJson().parameters.foo);
				assert.ok(builder.toJson().parameters.bar);
				done();
			});
		});

		it('should update "parameters" when type of a param is changed via select', function() {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						type: 'string'
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.once('parametersChanged', listener);

			var select = builder.components[builder.id + '-typeSelect0'];
			select.selectedIndex = 0;
			assert.strictEqual(1, listener.callCount);
			assert.strictEqual('number', builder.parameters[0].type);
			assert.strictEqual('number', builder.toJson().parameters.foo.type);
		});

		it('should update "parameters" when "required" field of a param is changed via input', function() {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						required: false
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.once('parametersChanged', listener);

			var switcher = builder.components[builder.id + '-requiredSwitcher0'];
			switcher.checked = true;
			assert.strictEqual(1, listener.callCount);
			assert.ok(builder.parameters[0].required);
			assert.ok(builder.toJson().parameters.foo.required);
		});

		it('should update "parameters" when description of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						description: 'desc1'
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.once('parametersChanged', listener);

			var element = builder.element.querySelector('.builder-param-item [data-name="description"]');
			element.value = 'desc2';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual(1, listener.callCount);
				assert.strictEqual('desc2', builder.parameters[0].description);
				assert.strictEqual('desc2', builder.toJson().parameters.foo.description);
				done();
			});
		});

		it('should not update "parameters" twice if input event is triggered but value doesn\'t change', function() {
			builder = new ApiBuilder({
				parameters: {
					foo: {
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.on('parametersChanged', listener);

			var element = builder.element.querySelector('.builder-param-item [data-name="name"]');
			element.value = 'bar';
			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);

			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);
		});
	});

	it('should update "title" when value is changed via input', function() {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="title"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		assert.strictEqual('foo', builder.title);
	});

	it('should update "data" when value is changed via switcher', function() {
		builder = new ApiBuilder().render();

		var switcher = builder.components[builder.id + '-dataSwitcher'];
		switcher.checked = true;
		assert.ok(builder.data);

		switcher.checked = false;
		assert.ok(!builder.data);
	});

	it('should update "description" when value is changed via input', function() {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="description"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		assert.strictEqual('foo', builder.description);
	});

	it('should update "method" when method button is clicked', function() {
		builder = new ApiBuilder().render();

		var buttons = builder.element.querySelectorAll('.btn-group button');
		dom.triggerEvent(buttons[5], 'click');
		assert.deepEqual(['get', 'delete'], builder.method);

		dom.triggerEvent(buttons[0], 'click');
		assert.deepEqual(['delete'], builder.method);
	});

	it('should not allow deselecting all method buttons', function() {
		builder = new ApiBuilder().render();

		var buttons = builder.element.querySelectorAll('.btn-group button');
		dom.triggerEvent(buttons[0], 'click');
		assert.deepEqual(['get'], builder.method);
		assert.ok(dom.hasClass(buttons[0], 'btn-group-selected'));

		dom.triggerEvent(buttons[5], 'click');
		dom.triggerEvent(buttons[0], 'click');
		dom.triggerEvent(buttons[5], 'click');
		assert.deepEqual(['delete'], builder.method);
		assert.ok(dom.hasClass(buttons[5], 'btn-group-selected'));
	});

	it('should update "path" when value is changed via input', function() {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="path"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		assert.strictEqual('foo', builder.path);
	});

	it('should update "handler" when value is changed via input', function() {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="handler"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		assert.strictEqual('foo', builder.handler);
	});
});
