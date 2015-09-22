'use strict';

import dom from 'bower:metal/src/dom/dom';
import ApiBuilder from '../src/ApiBuilder';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';

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
						description: 'desc',
						required: true
					},
					bar: {
						type: 'boolean',
						validator: 'validator'
					}
				}
			}).render();

			var paramRows = builder.element.querySelectorAll('.builder-params .builder-param-item');
			assert.strictEqual(2, paramRows.length);
			assert.strictEqual('foo', paramRows[0].querySelectorAll('input')[0].value);
			assert.strictEqual(2, builder.components[builder.id + '-typeSelect0'].selectedIndex);
			assert.ok(builder.components[builder.id + '-requiredSwitcher0'].checked);
			assert.strictEqual('desc', paramRows[0].querySelector('input[data-name="description"]').value);
			assert.strictEqual('value', paramRows[0].querySelector('input[data-name="value"]').value);
			assert.strictEqual('', paramRows[0].querySelector('input[data-name="validator"]').value);

			assert.strictEqual('bar', paramRows[1].querySelectorAll('input')[0].value);
			assert.strictEqual(3, builder.components[builder.id + '-typeSelect1'].selectedIndex);
			assert.ok(!builder.components[builder.id + '-requiredSwitcher1'].checked);
			assert.strictEqual('', paramRows[1].querySelector('input[data-name="description"]').value);
			assert.strictEqual('', paramRows[1].querySelector('input[data-name="value"]').value);
			assert.strictEqual('validator', paramRows[1].querySelector('input[data-name="validator"]').value);
		});
	});

	describe('Params', function() {
		it('should add a new parameter row when button is clicked', function(done) {
			builder = new ApiBuilder().render();

			assert.strictEqual(0, builder.element.querySelectorAll('.builder-params .builder-param-item').length);
			dom.triggerEvent(builder.element.querySelector('.builder-param-more button'), 'click');

			builder.once('attrsChanged', function() {
				assert.strictEqual(1, builder.element.querySelectorAll('.builder-params .builder-param-item').length);
				dom.triggerEvent(builder.element.querySelector('.builder-param-more button'), 'click');
				builder.once('attrsChanged', function() {
					assert.strictEqual(2, builder.element.querySelectorAll('.builder-params .builder-param-item').length);
					done();
				});
			});
		});

		it('should automatically focus newly added parameter row', function(done) {
			builder = new ApiBuilder().render();

			dom.triggerEvent(builder.element.querySelector('.builder-param-more button'), 'click');

			builder.once('attrsChanged', function() {
				var paramInput = builder.element.querySelector('.builder-params .builder-param-item input');
				assert.strictEqual(document.activeElement, paramInput);
				done();
			});
		});

		it('should duplicate a parameter row when button is clicked', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						description: 'desc'
					}
				}
			}).render();

			dom.triggerEvent(builder.element.querySelectorAll('.builder-param-actions li')[0], 'click');

			builder.once('attrsChanged', function() {
				var paramRows = builder.element.querySelectorAll('.builder-params .builder-param-item');
				assert.strictEqual(2, paramRows.length);
				assert.strictEqual('desc', builder.parameters[0].description);
				assert.strictEqual('desc', builder.parameters[1].description);
				assert.ok(!dom.hasClass(builder.components[builder.id + '-menu0'].element, 'open'));
				done();
			});
		});

		it('should remove a parameter row when button is clicked', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						type: 'boolean'
					},
					bar: {
					}
				}
			}).render();

			dom.triggerEvent(builder.element.querySelectorAll('.builder-param-actions li')[1], 'click');

			builder.once('attrsChanged', function() {
				assert.strictEqual(1, builder.element.querySelectorAll('.builder-params .builder-param-item').length);
				assert.ok(!dom.hasClass(builder.components[builder.id + '-menu0'].element, 'open'));
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

			var element = builder.element.querySelector('.builder-params .builder-param-item [data-name="name"]');
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

		it('should trim param name before using it', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						value: 1
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.once('parametersChanged', listener);

			var element = builder.element.querySelector('.builder-params .builder-param-item [data-name="name"]');
			element.value = '   bar       ';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual('bar', builder.parameters[0].name);
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
			select.selectedIndex = 1;
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

			var element = builder.element.querySelector('.builder-params .builder-param-item [data-name="description"]');
			element.value = 'desc2';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual(1, listener.callCount);
				assert.strictEqual('desc2', builder.parameters[0].description);
				assert.strictEqual('desc2', builder.toJson().parameters.foo.description);
				done();
			});
		});

		it('should expand/collapse advanced setup when element is clicked', function() {
			builder = new ApiBuilder({
				parameters: {
					foo: {
					}
				}
			}).render();

			var advancedElement = builder.element.querySelector('.builder-params .builder-param-item-advanced');
			assert.ok(!dom.hasClass(advancedElement, 'expanded'));

			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			assert.ok(dom.hasClass(advancedElement, 'expanded'));
			assert.strictEqual(advancedElement.parentNode.querySelector('[data-name="value"]'), document.activeElement);

			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			assert.ok(!dom.hasClass(advancedElement, 'expanded'));
		});

		it('should update "parameters" when value of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						value: 'value1'
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.once('parametersChanged', listener);

			var element = builder.element.querySelector('.builder-params .builder-param-item [data-name="value"]');
			element.value = 'value2';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual(1, listener.callCount);
				assert.strictEqual('value2', builder.parameters[0].value);
				assert.strictEqual('value2', builder.toJson().parameters.foo.value);
				done();
			});
		});

		it('should update "parameters" when validator of a param is changed via input', function(done) {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						validator: 'validator1'
					}
				}
			}).render();

			var listener = sinon.stub();
			builder.once('parametersChanged', listener);

			var element = builder.element.querySelector('.builder-params .builder-param-item [data-name="validator"]');
			element.value = 'validator2';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual(1, listener.callCount);
				assert.strictEqual('validator2', builder.parameters[0].validator);
				assert.strictEqual('validator2', builder.toJson().parameters.foo.validator);
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

			var element = builder.element.querySelector('.builder-params .builder-param-item [data-name="name"]');
			element.value = 'bar';
			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);

			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);
		});
	});

	describe('Body', function() {
		it('should update "body" when its type is changed via select', function() {
			builder = new ApiBuilder({
				body: {
					type: 'string'
				}
			}).render();

			var listener = sinon.stub();
			builder.once('bodyChanged', listener);

			var select = builder.components[builder.id + '-typeSelectBody'];
			select.selectedIndex = 1;
			assert.strictEqual(1, listener.callCount);
			assert.strictEqual('number', builder.body.type);
		});

		it('should update "body" when its "required" field is changed via input', function() {
			builder = new ApiBuilder({
				body: {
					required: false
				}
			}).render();

			var listener = sinon.stub();
			builder.once('bodyChanged', listener);

			var switcher = builder.components[builder.id + '-requiredSwitcherBody'];
			switcher.checked = true;
			assert.strictEqual(1, listener.callCount);
			assert.ok(builder.body.required);
		});

		it('should update "body" when its description is changed via input', function(done) {
			builder = new ApiBuilder({
				body: {
					description: 'desc1'
				}
			}).render();

			var listener = sinon.stub();
			builder.once('bodyChanged', listener);

			var element = builder.element.querySelector('.builder-param-item [data-name="description"]');
			element.value = 'desc2';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual(1, listener.callCount);
				assert.strictEqual('desc2', builder.body.description);
				done();
			});
		});

		it('should expand/collapse advanced setup when its button is clicked for body', function() {
			builder = new ApiBuilder().render();

			var advancedElement = builder.element.querySelector('.builder-param-item-advanced');
			assert.ok(!dom.hasClass(advancedElement, 'expanded'));

			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			assert.ok(dom.hasClass(advancedElement, 'expanded'));
			assert.strictEqual(advancedElement.parentNode.querySelector('[data-name="validator"]'), document.activeElement);

			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			assert.ok(!dom.hasClass(advancedElement, 'expanded'));
		});

		it('should update "body" when its validator is changed via input', function(done) {
			builder = new ApiBuilder({
				body: {
					validator: 'validator1'
				}
			}).render();

			var listener = sinon.stub();
			builder.once('bodyChanged', listener);

			var element = builder.element.querySelector('.builder-param-item [data-name="validator"]');
			element.value = 'validator2';
			dom.triggerEvent(element, 'input');
			builder.once('attrsChanged', function() {
				assert.strictEqual(1, listener.callCount);
				assert.strictEqual('validator2', builder.body.validator);
				done();
			});
		});

		it('should not update "body" twice if input event is triggered but value doesn\'t change', function() {
			builder = new ApiBuilder().render();

			var listener = sinon.stub();
			builder.on('bodyChanged', listener);

			var element = builder.element.querySelector('.builder-param-item [data-name="description"]');
			element.description = 'bar';
			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);

			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);
		});
	});

	describe('Auth', function() {
		beforeEach(function() {
			builder = new ApiBuilder({
				auth: {
					permissions: ['Edit', 'Delete'],
					roles: ['Admin', 'Member']
				},
				permissions: ['Edit', 'Delete', 'Add'],
				roles: ['Owner', 'Admin', 'Member']
			}).render();
		});

		it('should initially select the roles/permissions switchers defined by the `auth` attr', function() {
			assert.strictEqual(
				3,
				builder.element.querySelectorAll('.builder-section-auth-roles .builder-param-switcher').length
			);

			assert.ok(builder.components[builder.id + '-permissionsSwitcherEdit'].checked);
			assert.ok(builder.components[builder.id + '-permissionsSwitcherDelete'].checked);
			assert.ok(!builder.components[builder.id + '-permissionsSwitcherAdd'].checked);
			assert.ok(!builder.components[builder.id + '-rolesSwitcherOwner'].checked);
			assert.ok(builder.components[builder.id + '-rolesSwitcherAdmin'].checked);
			assert.ok(builder.components[builder.id + '-rolesSwitcherMember'].checked);
		});

		it('should update "auth" when permission switcher value changes', function() {
			builder.components[builder.id + '-permissionsSwitcherEdit'].checked = false;
			assert.deepEqual(['Delete'], builder.auth.permissions);
		});

		it('should update "auth" when role switcher value changes', function() {
			builder.components[builder.id + '-rolesSwitcherOwner'].checked = true;
			assert.deepEqual(['Admin', 'Member', 'Owner'], builder.auth.roles.sort());
		});

		it('should update "auth" when validator is changed via input', function() {
			var element = builder.element.querySelector('.builder-section-auth input');
			element.value = 'validator';
			dom.triggerEvent(element, 'input');
			assert.strictEqual('validator', builder.auth.validator);
		});

		it('should update "auth" without errors when first permission is added', function() {
			builder.dispose();
			builder = new ApiBuilder({
				permissions: ['Edit', 'Delete', 'Add'],
				roles: ['Owner', 'Admin', 'Member']
			}).render();
			builder.components[builder.id + '-permissionsSwitcherEdit'].checked = true;
			assert.deepEqual(['Edit'], builder.auth.permissions);
		});
	});

	it('should update "title" when value is changed via input', function() {
		builder = new ApiBuilder().render();

		var element = builder.element.querySelector('[name="title"]');
		element.value = 'foo';
		dom.triggerEvent(element, 'input');
		assert.strictEqual('foo', builder.title);
	});

	it('should update "visibility" when value is changed via switcher', function() {
		builder = new ApiBuilder().render();

		var switcher = builder.components[builder.id + '-visibilitySwitcher'];
		switcher.checked = true;
		assert.ok(builder.visibility);

		switcher.checked = false;
		assert.ok(!builder.visibility);
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
		var expectedMethod = ['get', 'delete'];
		assert.deepEqual(expectedMethod, builder.method);

		dom.triggerEvent(buttons[0], 'click');
		expectedMethod = ['delete'];
		assert.deepEqual(expectedMethod, builder.method);
	});

	it('should not allow deselecting all method buttons', function() {
		builder = new ApiBuilder().render();

		var buttons = builder.element.querySelectorAll('.btn-group button');
		dom.triggerEvent(buttons[0], 'click');
		var expectedMethod = ['get'];
		assert.deepEqual(expectedMethod, builder.method);
		assert.ok(dom.hasClass(buttons[0], 'btn-group-selected'));

		dom.triggerEvent(buttons[5], 'click');
		dom.triggerEvent(buttons[0], 'click');
		dom.triggerEvent(buttons[5], 'click');
		expectedMethod = ['delete'];
		assert.deepEqual(expectedMethod, builder.method);
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

	it('should add missing parameters from the path to the final parameters list', function() {
		builder = new ApiBuilder({
			parameters: {
				extra: {
				},
				id: {
					description: 'ID'
				}
			},
			path: '/data/:id/:foo'
		}).render();

		var params = builder.toJson().parameters;
		assert.deepEqual(['extra', 'foo', 'id'], Object.keys(params).sort());
		assert.strictEqual('ID', params.id.description);
	});

	it('should decorate ApiBuilder without repainting when content is correct', function() {
		var markup = ComponentRegistry.Templates.ApiBuilder.content({
			auth: {
				permissions: ['Edit'],
				roles: ['Admin', 'Member']
			},
			description: 'My description',
			handler: 'My Handler',
			host: 'foo.org',
			id: 'builder',
			method: ['get', 'post'],
			parameters: [
				{
					description: 'desc',
					name: 'bar',
					value: 12,
					type: 'number'
				}
			],
			path: '/data',
			permissions: ['Owner', 'Admin', 'Member'],
			roles: ['Edit', 'Invite', 'Delete', 'Add'],
			title: 'My API'
		});

		dom.append(document.body, markup.content);
		var outerHTML = document.getElementById('builder').outerHTML;

		builder = new ApiBuilder({
			auth: {
				permissions: ['Edit'],
				roles: ['Admin', 'Member']
			},
			description: 'My description',
			element: '#builder',
			handler: 'My Handler',
			host: 'foo.org',
			method: ['get', 'post'],
			parameters: [
				{
					description: 'desc',
					name: 'bar',
					value: 12,
					type: 'number'
				}
			],
			path: '/data',
			permissions: ['Owner', 'Admin', 'Member'],
			roles: ['Edit', 'Invite', 'Delete', 'Add'],
			title: 'My API'
		}).decorate();

		assert.strictEqual(builder.element.outerHTML, outerHTML);
	});
});
