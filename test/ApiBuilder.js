'use strict';

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
				id: 'builder',
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

			var paramRows = builder.element.querySelectorAll('#builder-params .row');
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
});
