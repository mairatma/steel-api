/* jshint ignore:start */
import Component from 'metal-component';
import { SoyAop, SoyRenderer, SoyTemplates } from 'metal-soy';
var Templates = SoyTemplates.get();
// This file was automatically generated from ApiBuilder.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.ApiBuilder.
 */

if (typeof Templates.ApiBuilder == 'undefined') { Templates.ApiBuilder = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="builder component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiBuilder.title(opt_data, null, opt_ijData) + Templates.ApiBuilder.description(opt_data, null, opt_ijData) + Templates.ApiBuilder.methods(opt_data, null, opt_ijData) + Templates.ApiBuilder.path(opt_data, null, opt_ijData) + Templates.ApiBuilder.params(opt_data, null, opt_ijData) + Templates.ApiBuilder.body(opt_data, null, opt_ijData) + Templates.ApiBuilder.handler(opt_data, null, opt_ijData) + Templates.ApiBuilder.auth(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.render.soyTemplateName = 'Templates.ApiBuilder.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.title = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-title" class="builder-title"><input type="text" class="form-control-borderless" name="title" placeholder="add a title..." value="' + soy.$$escapeHtmlAttribute(opt_data.title ? opt_data.title : '') + '" autocomplete="off" autofocus data-oninput="handleInputTitle_" /><div class="builder-data show-tooltip" alt="When data is enabled your API becomes a RESTful database that can store and sync data in realtime"><div class="builder-data-switcher">' + soy.$$escapeHtml(Templates.Switcher.render({checked: opt_data.data != null ? opt_data.data : true, events: {checkedChanged: opt_data.id + ':handleDataSwitcherCheckedChanged_'}, id: opt_data.id + '-dataSwitcher'}, null, opt_ijData)) + '</div><span class="builder-data-label">Data</span></div><div class="builder-visibility show-tooltip" alt="When your API is marked as \'visible\' it means that it can be requested by anyone, whereas \'invisible\' acts like a firewall where only your server can request it"><div class="builder-visibility-switcher">' + soy.$$escapeHtml(Templates.Switcher.render({checked: opt_data.visibility != null ? opt_data.visibility : true, events: {checkedChanged: opt_data.id + ':handleVisibilitySwitcherCheckedChanged_'}, id: opt_data.id + '-visibilitySwitcher'}, null, opt_ijData)) + '</div><span class="builder-visibility-label">Visibility</span></div></div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.title.soyTemplateName = 'Templates.ApiBuilder.title';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.description = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-description" class="builder-description"><textarea class="form-control-borderless" name="description" placeholder="add a description..." autocomplete="off" data-oninput="handleInputDescription_">' + soy.$$escapeHtmlRcdata(opt_data.description ? opt_data.description : '') + '</textarea></div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.description.soyTemplateName = 'Templates.ApiBuilder.description';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.methods = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-methods" class="api-builder-methods"><p class="api-section-title">Method <a class="api-section-title-link show-tooltip" alt="Learn more" target="_blank" href="/docs/js/building-apis.html#1-method"><span class="icon-12-external"></span></a></p>' + soy.$$escapeHtml(Templates.ButtonGroup.render({buttons: [{label: 'get', cssClass: 'btn btn-default http-get-bg', icon: 'btn-group-icon icon-12-check'}, {label: 'post', cssClass: 'btn btn-default http-post-bg', icon: 'btn-group-icon icon-12-check'}, {label: 'put', cssClass: 'btn btn-default http-put-bg', icon: 'btn-group-icon icon-12-check'}, {label: 'patch', cssClass: 'btn btn-default http-patch-bg', icon: 'btn-group-icon icon-12-check'}, {label: 'delete', cssClass: 'btn btn-default http-delete-bg', icon: 'btn-group-icon icon-12-check'}], events: {selectedChanged: opt_data.id + ':handleMethodsSelectedChanged_'}, id: opt_data.id + '-methodButtonGroup', minSelected: 1, selected: opt_data.method ? opt_data.method : ['get']}, null, opt_ijData)) + '</div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.methods.soyTemplateName = 'Templates.ApiBuilder.methods';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.path = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-path"><p class="api-section-title">Endpoint <a class="api-section-title-link show-tooltip" alt="Learn more" target="_blank" href="/docs/js/building-apis.html#2-endpoint"><span class="icon-12-external"></span></a></p><div class="form-group"><div class="input-group"><div class="input-group-addon">' + soy.$$escapeHtml(opt_data.host ? opt_data.host : '') + '</div><div class="input-inner-addon input-inner-addon-left"><span class="input-inner-icon-helper icon-16-info show-tooltip" alt="The endpoint could provide different capabilities to make your service more flexible. Visit the learn section for more information."></span><input type="text" class="input-group-addon-input form-control" name="path" placeholder="/new-api" value="' + soy.$$escapeHtmlAttribute(opt_data.path ? opt_data.path : '') + '" data-oninput="handleInputPath_" /></div></div></div></div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.path.soyTemplateName = 'Templates.ApiBuilder.path';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.handler = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-handler" class="form-group"><p class="api-section-title">Handler <a class="api-section-title-link show-tooltip" alt="Learn more" target="_blank" href="/docs/js/building-apis.html#5-handler"><span class="icon-12-external"></span></a></p><div class="builder-section-handler">' + soy.$$escapeHtml(Templates.CodeMirror.render({config: {lineNumbers: true, mode: 'javascript', placeholder: 'function handler() {\n  return "Hello World";\n}', value: opt_data.handler}, events: {valueChanged: opt_data.id + ':handleHandlerCodeMirrorValueChanged_'}, id: opt_data.id + '-handlerCodeMirror'}, null, opt_ijData)) + '</div></div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.handler.soyTemplateName = 'Templates.ApiBuilder.handler';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body"><p class="api-section-title">Body <a class="api-section-title-link show-tooltip" alt="Learn more" target="_blank" href="/docs/js/building-apis.html#4-body"><span class="icon-12-external"></span></a></p><div class="builder-section-body">' + Templates.ApiBuilder.param({id: opt_data.id, index: -1, param: opt_data.body ? opt_data.body : []}, null, opt_ijData) + '</div></div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.body.soyTemplateName = 'Templates.ApiBuilder.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-params" class="builder-params"><p class="api-section-title">Parameters <a class="api-section-title-link show-tooltip" alt="Learn more" target="_blank" href="/docs/js/building-apis.html#3-parameters"><span class="icon-12-external"></span></a></p><div class="builder-section-params">';
  if (opt_data.parameters) {
    var paramList82 = opt_data.parameters;
    var paramListLen82 = paramList82.length;
    for (var paramIndex82 = 0; paramIndex82 < paramListLen82; paramIndex82++) {
      var paramData82 = paramList82[paramIndex82];
      output += Templates.ApiBuilder.param({id: opt_data.id, index: paramIndex82, param: paramData82}, null, opt_ijData);
    }
  }
  output += '<div class="builder-param-more row"><div class="col-md-16"><button class="btn btn-default btn-sm" data-onclick="handleClickAddParam_"><span class="icon-16-plus"></span> Add Parameter</button></div></div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.params.soyTemplateName = 'Templates.ApiBuilder.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.param = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var isBody__soy90 = opt_data.index == -1;
  var suffix__soy91 = isBody__soy90 ? 'Body' : opt_data.index;
  output += '<div class="builder-param-item" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '" data-oninput="handleInputParam_"><div class="row builder-param-item-row">' + ((! isBody__soy90) ? '<div class="col-md-6"><label class="api-section-label" for="builder-param-name-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '">Name</label><input id="builder-param-name-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '" type="text" class="form-control" placeholder="Parameter" value="' + soy.$$escapeHtmlAttribute(opt_data.param.name) + '" data-name="name" /></div>' : '') + '<div class="col-md-6"><label class="api-section-label" for="builder-param-type-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '">Type</label>';
  var typesMap0__soy107 = {'any': 0, 'array': 1, 'boolean': 2, 'number': 3, 'object': 4, 'string': 5};
  output += soy.$$escapeHtml(Templates.Select.render({id: 'builder-param-type-' + suffix__soy91, buttonClass: 'btn btn-default form-control dropdown-select', events: {selectedIndexChanged: opt_data.id + ':handleTypeSelectedIndexChanged_'}, items: ['Any', 'Array', 'Boolean', 'Number', 'Object', 'String'], label: 'Type', selectedIndex: opt_data.param.type ? typesMap0__soy107[opt_data.param.type] : 0}, null, opt_ijData)) + '</div><div class="col-md-3"><span class="builder-param-label">Required</span>' + soy.$$escapeHtml(Templates.Switcher.render({checked: opt_data.param.required ? opt_data.param.required : false, events: {checkedChanged: opt_data.id + ':handleRequiredCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-requiredSwitcher' + suffix__soy91}, null, opt_ijData)) + '</div>' + ((! isBody__soy90) ? '<div class="col-md-1 builder-param-actions">' + soy.$$escapeHtml(Templates.Dropdown.render({body: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleDuplicateParamClick_" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="#">Duplicate</a></li><li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleRemoveParamClick_" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="#">Remove</a></li>'), header: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<button class="builder-param-ellipsis btn-transparent icon-16-ellipsis" type="button" data-onclick="toggle"></button>'), id: opt_data.id + '-menu' + suffix__soy91}, null, opt_ijData)) + '</div>' : '') + '</div>' + ((! isBody__soy90) ? '<div class="row builder-param-item-row"><div class="col-md-12"><label class="api-section-label" for="builder-param-description-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '">Description</label><input id="builder-param-description-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '" type="text" class="form-control" placeholder="Type what this parameter does" value="' + soy.$$escapeHtmlAttribute(opt_data.param.description ? opt_data.param.description : '') + '" data-name="description" /></div></div>' : '') + '<div class="builder-param-item-advanced" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><button class="builder-param-item-advanced-btn btn-transparent" type="button" data-onclick="handleAdvancedSetupClick_">Advanced Setup <span class="builder-param-item-advanced-arrow icon-12-arrow-down-short"></span></button>' + ((isBody__soy90) ? '<div class="row builder-param-item-row"><div class="col-md-6"><label class="api-section-label" for="builder-param-description-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '">Description</label><input id="builder-param-description-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '" type="text" class="form-control" placeholder="Type what should be passed to the body" value="' + soy.$$escapeHtmlAttribute(opt_data.param.description ? opt_data.param.description : '') + '" data-name="description" /></div></div>' : '<div class="row builder-param-item-row"><div class="col-md-6"><label class="api-section-label" for="builder-param-value-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '">Value</label><div class="input-inner-addon input-inner-addon-left"><span class="input-inner-icon-helper icon-16-info show-tooltip" alt="Define a value that will be injected in the received request"></span><input id="builder-param-value-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '" type="text" class="form-control" placeholder="What is the default value?" value="' + soy.$$escapeHtmlAttribute(opt_data.param.value ? opt_data.param.value : '') + '" data-name="value" /></div></div></div>') + '<div class="row builder-param-item-row"><div class="col-md-6"><label class="api-section-label" for="builder-param-validator-' + soy.$$escapeHtmlAttribute(suffix__soy91) + '">Validator</label><div class="input-inner-addon input-inner-addon-left"><span class="input-inner-icon-helper icon-16-info show-tooltip" alt="Describe any JavaScript expression to authorize the request. There couple variables that you could use here such as $auth, $params, $values"></span>' + soy.$$escapeHtml(Templates.CodeMirror.render({config: {lineNumbers: true, mode: 'javascript', value: opt_data.param.validator ? opt_data.param.validator : ''}, events: {valueChanged: opt_data.id + ':handleValidatorCodeMirrorValueChanged_'}, id: opt_data.id + '-validatorCodeMirror' + suffix__soy91, visible: false}, null, opt_ijData)) + '</div></div></div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.param.soyTemplateName = 'Templates.ApiBuilder.param';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.auth = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-auth" class="form-group"><p class="api-section-title">Authentication <a class="api-section-title-link show-tooltip" alt="Learn more" target="_blank" href="/docs/js/building-apis.html#6-authentication"><span class="icon-12-external"></span></a></p><div class="builder-section-auth"><div class="builder-section-auth-row">';
  if (opt_data.roles && opt_data.roles.length) {
    output += '<div class="builder-section-auth-roles"><p class="api-section-title">Roles</p>';
    var roleList186 = opt_data.roles;
    var roleListLen186 = roleList186.length;
    for (var roleIndex186 = 0; roleIndex186 < roleListLen186; roleIndex186++) {
      var roleData186 = roleList186[roleIndex186];
      output += '<div class="builder-param-switcher-container">';
      var roleChecked__soy188 = '' + ('' + Templates.ApiBuilder.arrHasItem({array: opt_data.auth.roles, item: roleData186}, null, opt_ijData));
      roleChecked__soy188 = soydata.$$markUnsanitizedTextForInternalBlocks(roleChecked__soy188);
      output += soy.$$escapeHtml(Templates.Switcher.render({checked: ('' + roleChecked__soy188).indexOf('true') != -1, events: {checkedChanged: opt_data.id + ':handleRoleCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-rolesSwitcher' + roleData186}, null, opt_ijData)) + '<span class="builder-param-label"> ' + soy.$$escapeHtml(roleData186) + '</span></div>';
    }
    output += '</div>';
  }
  if (opt_data.permissions && opt_data.permissions.length) {
    output += '<div class="builder-section-auth-permissions"><p class="api-section-title">Permissions</p>';
    var permissionList205 = opt_data.permissions;
    var permissionListLen205 = permissionList205.length;
    for (var permissionIndex205 = 0; permissionIndex205 < permissionListLen205; permissionIndex205++) {
      var permissionData205 = permissionList205[permissionIndex205];
      output += '<div class="builder-param-switcher-container">';
      var permissionChecked__soy207 = '' + ('' + Templates.ApiBuilder.arrHasItem({array: opt_data.auth.permissions, item: permissionData205}, null, opt_ijData));
      permissionChecked__soy207 = soydata.$$markUnsanitizedTextForInternalBlocks(permissionChecked__soy207);
      output += soy.$$escapeHtml(Templates.Switcher.render({checked: ('' + permissionChecked__soy207).indexOf('true') != -1, events: {checkedChanged: opt_data.id + ':handlePermissionCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-permissionsSwitcher' + permissionData205}, null, opt_ijData)) + '<span class="builder-param-label"> ' + soy.$$escapeHtml(permissionData205) + '</span></div>';
    }
    output += '</div>';
  }
  output += '</div><label class="api-section-label" for="builder-param-auth-validator">Validator</label><div class="input-inner-addon input-inner-addon-left"><span class="input-inner-icon-helper icon-16-info show-tooltip" alt="Describe any JavaScript expression to authorize the request. There couple variables that you could use here such as $auth, $params, $values"></span>' + soy.$$escapeHtml(Templates.CodeMirror.render({config: {lineNumbers: true, mode: 'javascript', placeholder: '$auth !== null', value: opt_data.auth.validator ? opt_data.auth.validator : ''}, events: {valueChanged: opt_data.id + ':handleAuthValidatorCodeMirrorValueChanged_'}, id: opt_data.id + '-authValidatorCodeMirror'}, null, opt_ijData)) + '</div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.auth.soyTemplateName = 'Templates.ApiBuilder.auth';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.arrHasItem = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  if (opt_data.array) {
    var arrItemList230 = opt_data.array;
    var arrItemListLen230 = arrItemList230.length;
    for (var arrItemIndex230 = 0; arrItemIndex230 < arrItemListLen230; arrItemIndex230++) {
      var arrItemData230 = arrItemList230[arrItemIndex230];
      output += (opt_data.item == arrItemData230) ? '\'true\'' : '';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.arrHasItem.soyTemplateName = 'Templates.ApiBuilder.arrHasItem';
}

Templates.ApiBuilder.render.params = ["id"];
Templates.ApiBuilder.title.params = ["id","title","visibility","data"];
Templates.ApiBuilder.description.params = ["id","description"];
Templates.ApiBuilder.methods.params = ["id","method"];
Templates.ApiBuilder.path.params = ["host","id","path"];
Templates.ApiBuilder.handler.params = ["id"];
Templates.ApiBuilder.body.params = ["id","body"];
Templates.ApiBuilder.params.params = ["id","parameters"];
Templates.ApiBuilder.param.private = true;
Templates.ApiBuilder.auth.params = ["auth","id","permissions","roles"];
Templates.ApiBuilder.arrHasItem.private = true;

class ApiBuilder extends Component {}
ApiBuilder.RENDERER = SoyRenderer;
SoyAop.registerTemplates('ApiBuilder');
export default ApiBuilder;
/* jshint ignore:end */
