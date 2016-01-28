'use strict';

import dom from 'metal/src/dom/dom';
import ApiBuilder from '../src/ApiBuilder';
import SoyTemplates from 'metal/src/soy/SoyTemplates';

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
			var codeMirror = builder.element.querySelector('.builder-section-handler .CodeMirror').CodeMirror;
			assert.strictEqual('foo', codeMirror.getValue());
		});
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
		assert.strictEqual(5, builder.components['builder-param-type-0'].selectedIndex);
		assert.ok(builder.components[builder.id + '-requiredSwitcher0'].checked);
		assert.strictEqual('desc', paramRows[0].querySelector('input[data-name="description"]').value);

		assert.strictEqual('bar', paramRows[1].querySelectorAll('input')[0].value);
		assert.strictEqual(2, builder.components['builder-param-type-1'].selectedIndex);
		assert.ok(!builder.components[builder.id + '-requiredSwitcher1'].checked);
		assert.strictEqual('', paramRows[1].querySelector('input[data-name="description"]').value);
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

			var select = builder.components['builder-param-type-0'];
			select.selectedIndex = 3;
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

		it('should fill param values for advanced setup with the given parameters', function() {
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
			var advancedElement = paramRows[0].querySelector('.builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');

			assert.strictEqual('value', paramRows[0].querySelector('input[data-name="value"]').value);
			var codeMirror = paramRows[0].querySelector('.CodeMirror').CodeMirror;
			assert.strictEqual('', codeMirror.getValue());

			advancedElement = paramRows[1].querySelector('.builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');

			assert.strictEqual('', paramRows[1].querySelector('input[data-name="value"]').value);
			codeMirror = paramRows[1].querySelector('.CodeMirror').CodeMirror;
			assert.strictEqual('validator', codeMirror.getValue());
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

		it('should update "parameters" when validator of a param is changed via input', function() {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						validator: 'validator1'
					}
				}
			}).render();

			var advancedElement = builder.element.querySelector('.builder-params .builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			var codeMirror = builder.element.querySelector('.builder-params .CodeMirror').CodeMirror;

			var listener = sinon.stub();
			builder.once('parametersChanged', listener);

			codeMirror.setValue('validator2');
			assert.strictEqual(1, listener.callCount);
			assert.strictEqual('validator2', builder.parameters[0].validator);
			assert.strictEqual('validator2', builder.toJson().parameters.foo.validator);
		});

		it('should remove key from the param when new value is empty', function() {
			builder = new ApiBuilder({
				parameters: {
					foo: {
						validator: 'value1'
					}
				}
			}).render();

			var advancedElement = builder.element.querySelector('.builder-params .builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			var codeMirror = builder.element.querySelector('.builder-params .CodeMirror').CodeMirror;

			codeMirror.setValue('');
			assert.ok(!('validator' in builder.parameters[0]));
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

			var select = builder.components['builder-param-type-Body'];
			select.selectedIndex = 1;
			assert.strictEqual(1, listener.callCount);
			assert.strictEqual('array', builder.body.type);
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

		it('should expand/collapse advanced setup when its button is clicked for body', function() {
			builder = new ApiBuilder().render();

			var advancedElement = builder.element.querySelector('.builder-param-item-advanced');
			assert.ok(!dom.hasClass(advancedElement, 'expanded'));

			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			assert.ok(dom.hasClass(advancedElement, 'expanded'));
			assert.strictEqual(builder.element.querySelector('.builder-param-item [data-name="description"]'), document.activeElement);

			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			assert.ok(!dom.hasClass(advancedElement, 'expanded'));
		});

		it('should update "body" when its description is changed via input', function(done) {
			builder = new ApiBuilder({
				body: {
					description: 'desc1'
				}
			}).render();

			var advancedElement = builder.element.querySelector('.builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');

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

		it('should update "body" when its validator is changed via input', function() {
			builder = new ApiBuilder({
				body: {
					validator: 'validator1'
				}
			}).render();

			var advancedElement = builder.element.querySelector('.builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');

			var listener = sinon.stub();
			builder.once('bodyChanged', listener);

			var codeMirror = builder.element.querySelector('.builder-param-item .CodeMirror').CodeMirror;
			codeMirror.setValue('validator2');
			assert.strictEqual(1, listener.callCount);
			assert.strictEqual('validator2', builder.body.validator);
		});

		it('should remove key from "body" when new value is empty', function() {
			builder = new ApiBuilder({
				body: {
					validator: 'validator1'
				}
			}).render();

			var advancedElement = builder.element.querySelector('.builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');

			var codeMirror = builder.element.querySelector('.builder-param-item .CodeMirror').CodeMirror;
			codeMirror.setValue('');
			assert.ok(!('validator' in builder.body));
		});

		it('should not allow adding line breaks on validator', function() {
			builder = new ApiBuilder({
				body: {
					validator: 'validator1'
				}
			}).render();

			var advancedElement = builder.element.querySelector('.builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');

			var textarea = builder.element.querySelector('.builder-param-item .CodeMirror textarea');
			dom.triggerEvent(textarea, 'keydown', {
				keyCode: 13
			});
			assert.strictEqual('validator1', builder.body.validator);
		});

		it('should not build a new CodeMirror if the textarea hasn\'t change when the advanced options are opened', function() {
			builder = new ApiBuilder().render();

			var advancedElement = builder.element.querySelector('.builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			var codeMirror = builder.element.querySelector('.builder-param-item .CodeMirror').CodeMirror;

			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');
			var newCodeMirror = builder.element.querySelector('.builder-param-item .CodeMirror').CodeMirror;
			assert.strictEqual(codeMirror, newCodeMirror);
		});

		it('should not update "body" twice if input event is triggered but value doesn\'t change', function() {
			builder = new ApiBuilder().render();

			var listener = sinon.stub();
			builder.on('bodyChanged', listener);

			var element = builder.element.querySelector('.builder-param-item [data-name="description"]');
			element.value = 'bar';
			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);

			dom.triggerEvent(element, 'input');
			assert.strictEqual(1, listener.callCount);
		});

		it('should not add nameless option to "body" when input event is triggered for CodeMirror\'s textarea', function() {
			builder = new ApiBuilder().render();

			var advancedElement = builder.element.querySelector('.builder-param-item-advanced');
			dom.triggerEvent(advancedElement.querySelector('button'), 'click');

			var textarea = builder.element.querySelector('.builder-param-item .CodeMirror textarea');
			textarea.value = 'validator';
			dom.triggerEvent(textarea, 'input');
			assert.ok(!builder.body[null]);
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
			var codeMirror = builder.element.querySelector('.builder-section-auth .CodeMirror').CodeMirror;
			codeMirror.setValue('validator');
			assert.strictEqual('validator', builder.auth.validator);
		});

		it('should remove "validator" from "auth" when new value is empty', function() {
			var codeMirror = builder.element.querySelector('.builder-section-auth .CodeMirror').CodeMirror;
			codeMirror.setValue('validator');
			codeMirror.setValue('');
			assert.ok(!('validator' in builder.auth));
		});

		it('should update CodeMirror editor for validator if value changes through attr', function(done) {
			builder.auth = {
				validator: 'validator'
			};
			builder.once('attrsChanged', function() {
				builder.once('attrsChanged', function() {
					var codeMirror = builder.element.querySelector('.builder-section-auth .CodeMirror').CodeMirror;
					codeMirror.setValue('validator');
					assert.strictEqual('validator', builder.auth.validator);
					done();
				});
			});
		});

		it('should not create new CodeMirror editor if textarea is not repainted', function(done) {
			var codeMirror = builder.element.querySelector('.builder-section-auth .CodeMirror').CodeMirror;
			builder.auth = builder.auth;
			builder.once('attrsChanged', function() {
				var newCodeMirror = builder.element.querySelector('.builder-section-auth .CodeMirror').CodeMirror;
				assert.strictEqual(codeMirror, newCodeMirror);
				done();
			});
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
		dom.triggerEvent(buttons[4], 'click');
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

		dom.triggerEvent(buttons[4], 'click');
		dom.triggerEvent(buttons[0], 'click');
		dom.triggerEvent(buttons[4], 'click');
		expectedMethod = ['delete'];
		assert.deepEqual(expectedMethod, builder.method);
		assert.ok(dom.hasClass(buttons[4], 'btn-group-selected'));
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

		var codeMirror = builder.element.querySelector('.builder-section-handler .CodeMirror').CodeMirror;
		codeMirror.setValue('foo');
		assert.strictEqual('foo', builder.handler);
	});

	it('should update handler UI when attr value is changed', function(done) {
		builder = new ApiBuilder().render();

		builder.handler = 'foo';
		builder.once('attrsChanged', function() {
			builder.components[builder.id + '-handlerCodeMirror'].once('attrsChanged', function() {
				var codeMirror = builder.element.querySelector('.builder-section-handler .CodeMirror').CodeMirror;
				assert.strictEqual('foo', codeMirror.getValue());
				done();
			});
		});
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
		var markup = SoyTemplates.get('ApiBuilder', 'render')({
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
		});

		// Compare with the resulting HTML right after rendering, but before CodeMirror is added.
		var afterRenderHTML;
		builder.on('render', () => {
			afterRenderHTML = builder.element.outerHTML;
		});
		builder.decorate();

		assert.strictEqual(afterRenderHTML, outerHTML);
	});
});
