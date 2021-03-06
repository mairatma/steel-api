'use strict';

import ApiBase from '../src/ApiBase';

describe('ApiBase', function() {
	var api;

	afterEach(function() {
		api.dispose();
	});

	it('should set "auth" attr to empty object by default', function() {
		api = new ApiBase();
		assert.deepEqual({}, api.auth);
	});

	it('should set "body" attr to empty object by default', function() {
		api = new ApiBase();
		assert.deepEqual({}, api.body);
	});

	it('should set "method" attr to "get" by default', function() {
		api = new ApiBase();

		var expected = ['get'];
		assert.deepEqual(expected, api.method);
	});

	it('should convert "method" array to map format', function() {
		api = new ApiBase({
			method: ['get', 'post']
		});

		var expected = ['get', 'post'];
		assert.deepEqual(expected, api.method);
	});

	it('should only accept array and object values for "method" attr', function() {
		api = new ApiBase({
			method: ['get', 'post']
		});

		var expected = ['get', 'post'];
		assert.deepEqual(expected, api.method);

		api.method = ['patch'];
		expected = ['patch'];
		assert.deepEqual(expected, api.method);

		api.method = ['put'];
		expected = ['put'];
		assert.deepEqual(expected, api.method);

		api.method = 'delete';
		assert.deepEqual(expected, api.method);
	});

	it('should set "parameters" attr to empty array by default', function() {
		api = new ApiBase();
		assert.deepEqual([], api.parameters);
	});

	it('should convert "parameters" attr to array format', function() {
		api = new ApiBase({
			parameters: {
				id: {
					value: 1
				},
				foo: {
					in: 'url'
				}
			}
		});

		var expected = [
			{
				name: 'id',
				value: 1
			},
			{
				name: 'foo',
				in: 'url'
			}
		];
		assert.deepEqual(expected, api.parameters);
	});

	it('should convert object values from "parameters" to strings', function() {
		api = new ApiBase({
			parameters: [
				{
					name: 'id',
					value: {
						foo: 1,
						bar: 'bar'
					}
				}
			]
		});

		var expected = [
			{
				name: 'id',
				value: '{"foo":1,"bar":"bar"}'
			}
		];
		assert.deepEqual(expected, api.parameters);
	});

	it('should get the names of all path params', function() {
		api = new ApiBase({
			path: '/data/:foo/:bar(someRegex)'
		});

		assert.deepEqual(['bar', 'foo'], api.getPathParamNames().sort());
	});

	it('should return JSON object with only the attrs relating to the constructed api', function() {
		api = new ApiBase({
			auth: {
				permissions: ['Edit', 'Invite'],
				roles: ['Admin', 'Member']
			},
			body: {
				type: 'object'
			},
			data: true,
			description: 'Description',
			handler: 'Handler',
			parameters: {
				id: {
					value: 1
				}
			},
			path: '/data',
			title: 'Title',
			visibility: true
		});

		var expectedJson = {
			auth: {
				permissions: ['Edit', 'Invite'],
				roles: ['Admin', 'Member']
			},
			body: {
				type: 'object'
			},
			data: true,
			description: 'Description',
			handler: 'Handler',
			method: ['get'],
			parameters: {
				id: {
					value: 1
				}
			},
			path: '/data',
			title: 'Title',
			visibility: true
		};
		assert.deepEqual(expectedJson, api.toJson());
	});

	it('should transform param object values to object format when returned by "toJson" call', function() {
		api = new ApiBase({
			parameters: {
				arr: {
					type: 'array',
					value: [1, 2]
				},
				obj: {
					type: 'object',
					value: {
						foo: 1,
						bar: 'bar'
					}
				},
				notObj: {
					value: {
						foo: 1,
						bar: 'bar'
					}
				}
			}
		});

		var expectedParams = {
			arr: {
				type: 'array',
				value: [1, 2]
			},
			obj: {
				type: 'object',
				value: {
					foo: 1,
					bar: 'bar'
				}
			},
			notObj: {
				value: '{"foo":1,"bar":"bar"}'
			}
		};
		assert.deepEqual(expectedParams, api.toJson().parameters);
	});

	it('should ignore parameters without names on object returned by "toJson"', function() {
		api = new ApiBase({
			parameters: [
				{
					name: 'arr',
					type: 'array',
					value: [1, 2]
				},
				{
					type: 'object',
					value: {
						foo: 1,
						bar: 'bar'
					}
				}
			]
		});

		var expectedParams = {
			arr: {
				type: 'array',
				value: [1, 2]
			}
		};
		assert.deepEqual(expectedParams, api.toJson().parameters);
	});

	it('should ignore keys with empty values on object returned by "toJson"', function() {
		api = new ApiBase({
			description: '',
			handler: '',
			title: 'My Title',
			visibility: false
		});

		var json = api.toJson();
		assert.ok(!('description' in json));
		assert.ok(!('handler' in json));
		assert.strictEqual('My Title', json.title);
		assert.strictEqual(false, json.visibility);
	});
});
