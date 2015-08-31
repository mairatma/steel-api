'use strict';

import ApiBase from '../src/ApiBase';

describe('ApiBase', function() {
	var api;

	afterEach(function() {
		api.dispose();
	});

	it('should set "auth" attr to empty objet by default', function() {
		api = new ApiBase();
		assert.deepEqual({}, api.auth);
	});

	it('should set "method" attr to "get" by default', function() {
		api = new ApiBase();
		assert.deepEqual(['get'], api.method);
	});

	it('should only accept array values for "method" attr', function() {
		api = new ApiBase({
			method: ['get', 'post']
		});
		assert.deepEqual(['get', 'post'], api.method);

		api.method = ['patch'];
		assert.deepEqual(['patch'], api.method);

		api.method = 'put';
		assert.deepEqual(['patch'], api.method);
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

	it('should return JSON object with only the attrs relating to the constructed api', function() {
		api = new ApiBase({
			auth: {
				permissions: ['Edit', 'Invite'],
				roles: ['Admin', 'Member']
			},
			data: true,
			description: 'Description',
			title: 'Title',
			handler: 'Handler',
			parameters: {
				id: {
					value: 1
				}
			},
			path: 'foo.com/data'
		});

		var expectedJson = {
			auth: {
				permissions: ['Edit', 'Invite'],
				roles: ['Admin', 'Member']
			},
			data: true,
			description: 'Description',
			title: 'Title',
			handler: 'Handler',
			method: ['get'],
			parameters: {
				id: {
					value: 1
				}
			},
			path: 'foo.com/data'
		};
		assert.deepEqual(expectedJson, api.toJson());
	});
});
