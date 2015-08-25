'use strict';

import dom from 'bower:metal/src/dom/dom';
import ApiBuilder from '../src/ApiBuilder';

describe('ApiBuilder', function() {
	var builder;

	afterEach(function() {
		builder.dispose();
	});

	describe('Render', function() {
		it('should fill name text field with given name', function() {
			builder = new ApiBuilder({
				id: 'builder',
				name: 'foo'
			}).render();
			assert.strictEqual('foo', builder.element.querySelector('#builder-name input').value);
		});

		it('should fill description text field with given description', function() {
			builder = new ApiBuilder({
				id: 'builder',
				description: 'foo'
			}).render();
			assert.strictEqual('foo', builder.element.querySelector('#builder-description textarea').value);
		});

		it('should check method checkboxes for given methods', function() {
			builder = new ApiBuilder({
				id: 'builder',
				method: ['get', 'post']
			}).render();

			var checked = builder.element.querySelectorAll('#builder-methods input:checked');
			assert.strictEqual(2, checked.length);
			assert.strictEqual('get', checked[0].value);
			assert.strictEqual('post', checked[1].value);
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

			var paramRows = builder.element.querySelectorAll('.api-builder-param');
			assert.strictEqual(2, paramRows.length);
			assert.strictEqual('foo', paramRows[0].querySelector('input').value);
			assert.strictEqual('string', paramRows[0].querySelector('select').value);
			assert.strictEqual('value', paramRows[0].querySelectorAll('input')[1].value);
			assert.strictEqual('url', paramRows[0].querySelectorAll('select')[1].value);
			assert.strictEqual('desc', paramRows[0].querySelectorAll('input')[2].value);
			assert.ok(paramRows[0].querySelectorAll('input')[3].checked);

			assert.strictEqual('bar', paramRows[1].querySelector('input').value);
			assert.strictEqual('boolean', paramRows[1].querySelector('select').value);
			assert.strictEqual('', paramRows[1].querySelectorAll('input')[1].value);
			assert.strictEqual('body', paramRows[1].querySelectorAll('select')[1].value);
			assert.strictEqual('', paramRows[1].querySelectorAll('input')[2].value);
			assert.ok(!paramRows[1].querySelectorAll('input')[3].checked);
		});
	});

	describe('Params', function() {
		it('should add a new parameter row when button is clicked', function(done) {
			builder = new ApiBuilder().render();

			assert.strictEqual(0, builder.element.querySelectorAll('.api-builder-param').length);
			dom.triggerEvent(builder.element.querySelector('.api-builder-param-add'), 'click');

			builder.once('attrsChanged', function() {
				assert.strictEqual(1, builder.element.querySelectorAll('.api-builder-param').length);
				dom.triggerEvent(builder.element.querySelector('.api-builder-param-add'), 'click');
				builder.once('attrsChanged', function() {
					assert.strictEqual(2, builder.element.querySelectorAll('.api-builder-param').length);
					done();
				});
			});
		});

		it('should remove a new parameter row when button is clicked', function(done) {
			builder = new ApiBuilder().render();

			dom.triggerEvent(builder.element.querySelector('.api-builder-param-add'), 'click');
			dom.triggerEvent(builder.element.querySelector('.api-builder-param-add'), 'click');

			builder.once('attrsChanged', function() {
				var paramRows = builder.element.querySelectorAll('.api-builder-param');
				assert.strictEqual(2, paramRows.length);

				dom.triggerEvent(paramRows[0].querySelector('.close'), 'click');
				builder.once('attrsChanged', function() {
					var currParamRows = builder.element.querySelectorAll('.api-builder-param');
					assert.strictEqual(1, currParamRows.length);
					done();
				});
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

			var element = builder.element.querySelector('.api-builder-param [data-name="name"]');
			element.value = 'bar';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual('bar', builder.parameters[0].name);
				assert.ok(!builder.toJson().parameters.foo);
				assert.ok(builder.toJson().parameters.bar);
				done();
			});
		});

		it('should update "parameters" when type of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						type: 'string'
					}
				}
			}).render();

			var element = builder.element.querySelector('.api-builder-param [data-name="type"]');
			element.value = 'number';
			dom.triggerEvent(element, 'change');
			builder.once('attrsChanged', function() {
				assert.strictEqual('number', builder.parameters[0].type);
				assert.strictEqual('number', builder.toJson().parameters.foo.type);
				done();
			});
		});

		it('should update "parameters" when value of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						value: '1'
					}
				}
			}).render();

			var element = builder.element.querySelector('.api-builder-param [data-name="value"]');
			element.value = '2';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual('2', builder.parameters[0].value);
				assert.strictEqual('2', builder.toJson().parameters.foo.value);
				done();
			});
		});

		it('should update "parameters" when "in" field of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						in: 'body'
					}
				}
			}).render();

			var element = builder.element.querySelector('.api-builder-param [data-name="in"]');
			element.value = 'url';
			dom.triggerEvent(element, 'change');
			builder.once('attrsChanged', function() {
				assert.strictEqual('url', builder.parameters[0].in);
				assert.strictEqual('url', builder.toJson().parameters.foo.in);
				done();
			});
		});

		it('should update "parameters" when description of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						description: 'desc1'
					}
				}
			}).render();

			var element = builder.element.querySelector('.api-builder-param [data-name="description"]');
			element.value = 'desc2';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual('desc2', builder.parameters[0].description);
				assert.strictEqual('desc2', builder.toJson().parameters.foo.description);
				done();
			});
		});

		it('should update "parameters" when "required" field of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						required: false
					}
				}
			}).render();

			var element = builder.element.querySelector('.api-builder-param [data-name="required"]');
			element.checked = true;
			dom.triggerEvent(element, 'change');
			builder.once('attrsChanged', function() {
				assert.ok(builder.parameters[0].required);
				assert.ok(builder.toJson().parameters.foo.required);
				done();
			});
		});

		it('should not update "parameters" twice if input/change event is triggered but value doesn\'t change', function() {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						description: 'desc1'
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.on('parametersChanged', listener);

			var element = builder.element.querySelector('.api-builder-param [data-name="description"]');
			element.value = 'desc2';
			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);

			dom.triggerEvent(element, 'change');
			assert.strictEqual(1, listener.callCount);
		});
	});

	it('should update "name" when value is changed via input', function(done) {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="name"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		builder.once('attrsChanged', function() {
			assert.strictEqual('foo', builder.name);
			done();
		});
	});

	it('should update "description" when value is changed via input', function(done) {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="description"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		builder.once('attrsChanged', function() {
			assert.strictEqual('foo', builder.description);
			done();
		});
	});

	it('should update "method" when value is changed via checkboxes', function(done) {
		builder = new ApiBuilder().render();

		var elements = builder.element.querySelectorAll('#' + builder.id + '-methods [type="checkbox"]');
		elements[0].checked = true;
		dom.triggerEvent(elements[0], 'change');
		builder.once('attrsChanged', function() {
			assert.deepEqual(['get', 'delete'], builder.method);

			elements[1].checked = false;
			dom.triggerEvent(elements[1], 'change');
			builder.once('attrsChanged', function() {
				assert.deepEqual(['delete'], builder.method);
				done();
			});
		});
	});

	it('should update "path" when value is changed via input', function(done) {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="path"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		builder.once('attrsChanged', function() {
			assert.strictEqual('foo', builder.path);
			done();
		});
	});

	it('should update "handler" when value is changed via input', function(done) {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="handler"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		builder.once('attrsChanged', function() {
			assert.strictEqual('foo', builder.handler);
			done();
		});
	});
});
