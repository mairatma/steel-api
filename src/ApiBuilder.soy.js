/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
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
Templates.ApiBuilder.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="builder component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiBuilder.title(opt_data, null, opt_ijData) + Templates.ApiBuilder.description(opt_data, null, opt_ijData) + Templates.ApiBuilder.methods(opt_data, null, opt_ijData) + Templates.ApiBuilder.path(opt_data, null, opt_ijData) + Templates.ApiBuilder.params(opt_data, null, opt_ijData) + Templates.ApiBuilder.handler(opt_data, null, opt_ijData) + Templates.ApiBuilder.auth(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.content.soyTemplateName = 'Templates.ApiBuilder.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.title = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-title" class="builder-title"><input type="text" class="form-control-borderless" name="title" placeholder="add a title..." value="' + soy.$$escapeHtmlAttribute(opt_data.title) + '" data-oninput="handleInputTitle_" /><div class="builder-data"><span class="builder-data-label">Data</span><div class="builder-data-switcher">' + soy.$$escapeHtml(Templates.Switcher.content({checked: opt_data.data, events: {checkedChanged: opt_data.id + ':handleDataSwitcherCheckedChanged_'}, id: opt_data.id + '-dataSwitcher'}, null, opt_ijData)) + '</div></div></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-description" class="builder-description"><textarea class="form-control-borderless" name="description" placeholder="add a description..." data-oninput="handleInputDescription_">' + soy.$$escapeHtmlRcdata(opt_data.description) + '</textarea></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-methods" class="api-builder-methods"><p class="api-section-title">Method</p>' + soy.$$escapeHtml(Templates.ButtonGroup.content({buttons: [{label: 'get', cssClass: 'btn btn-default btn-get-bg'}, {label: 'head', cssClass: 'btn btn-default btn-head-bg'}, {label: 'post', cssClass: 'btn btn-default btn-post-bg'}, {label: 'put', cssClass: 'btn btn-default btn-put-bg'}, {label: 'patch', cssClass: 'btn btn-default btn-patch-bg'}, {label: 'delete', cssClass: 'btn btn-default btn-delete-bg'}], events: {selectedChanged: opt_data.id + ':handleMethodsSelectedChanged_'}, id: opt_data.id + '-methodButtonGroup', minSelected: 1, selected: opt_data.method}, null, opt_ijData)) + '</div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-path"><p class="api-section-title">Endpoint</p><div class="form-group"><div class="input-group"><div class="input-group-addon">' + soy.$$escapeHtml(opt_data.host) + '</div><div class="input-inner-addon input-inner-addon-left"><span class="icon-16-info"></span><input type="text" class="input-group-addon-input form-control" name="path" placeholder="/new-api" value="' + soy.$$escapeHtmlAttribute(opt_data.path) + '" data-oninput="handleInputPath_" /></div></div></div></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-handler" class="form-group"><p class="api-section-title">Handler</p><div class="builder-section-handler"><textarea class="form-control handler" name="handler" placeholder="function(request, response) {return \'Hello World\';}" data-oninput="handleInputHandler_">' + soy.$$escapeHtmlRcdata(opt_data.handler) + '</textarea></div></div>');
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
Templates.ApiBuilder.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-params"><p class="api-section-title">Parameters</p><div class="builder-section-params">';
  var paramList62 = opt_data.parameters;
  var paramListLen62 = paramList62.length;
  for (var paramIndex62 = 0; paramIndex62 < paramListLen62; paramIndex62++) {
    var paramData62 = paramList62[paramIndex62];
    output += Templates.ApiBuilder.param({id: opt_data.id, index: paramIndex62, param: paramData62}, null, opt_ijData);
  }
  output += '<div class="builder-param-more row"><div class="col-md-12"><button class="btn btn-default btn-sm" data-onclick="handleClickAddParam_"><span class="icon-16-plus"></span> Add Parameter</button></div></div></div></div>';
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
  var output = '<div class="builder-param-item" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '" data-oninput="handleInputParam_"><div class="row builder-param-item-row"><div class="col-md-4"><input type="text" class="form-control" placeholder="Parameter" value="' + soy.$$escapeHtmlAttribute(opt_data.param.name) + '" data-name="name" /></div><div class="col-md-4">';
  var typesMap0__soy75 = {'number': 0, 'string': 1, 'boolean': 2, 'array': 3, 'object': 4};
  output += soy.$$escapeHtml(Templates.Select.content({buttonClass: 'btn btn-default form-control dropdown-select', events: {selectedIndexChanged: opt_data.id + ':handleTypeSelectedIndexChanged_'}, id: opt_data.id + '-typeSelect' + opt_data.index, items: ['Number', 'String', 'Boolean', 'Array', 'Object'], label: 'Type', selectedIndex: opt_data.param.type ? typesMap0__soy75[opt_data.param.type] : -1}, null, opt_ijData)) + '</div><div class="col-md-3"><span class="builder-param-label">Required</span>' + soy.$$escapeHtml(Templates.Switcher.content({checked: opt_data.param.required ? opt_data.param.required : false, events: {checkedChanged: opt_data.id + ':handleRequiredCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-requiredSwitcher' + opt_data.index}, null, opt_ijData)) + '</div><div class="col-md-1 builder-param-actions">' + soy.$$escapeHtml(Templates.Dropdown.content({body: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleDuplicateParamClick_" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="#">Duplicate</a></li><li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleRemoveParamClick_" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="#">Remove</a></li>'), header: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<button class="btn-transparent" data-onclick="toggle"><span class="builder-param-ellipsis icon-16-ellipsis"></span></button>'), id: opt_data.id + '-menu' + opt_data.index}, null, opt_ijData)) + '</div></div><div class="row builder-param-item-row"><div class="col-md-8"><input type="text" class="form-control" placeholder="Description" value="' + soy.$$escapeHtmlAttribute(opt_data.param.description ? opt_data.param.description : '') + '" data-name="description" /></div></div><div class="builder-param-item-advanced"><a href="#" class="api-section-title" data-onclick="handleAdvancedSetupClick_">Advanced Setup <span class="builder-param-item-advanced-arrow icon-12-arrow-down-short"></span></a><div class="row builder-param-item-row"><div class="col-md-8"><input type="text" class="form-control" placeholder="Value" value="' + soy.$$escapeHtmlAttribute(opt_data.param.value ? opt_data.param.value : '') + '" data-name="value" /></div></div><div class="row builder-param-item-row"><div class="col-md-8"><input type="text" class="form-control" placeholder="Validator" value="' + soy.$$escapeHtmlAttribute(opt_data.param.validator ? opt_data.param.validator : '') + '" data-name="validator" /></div></div></div></div>';
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-auth" class="form-group"><p class="api-section-title">Authentication</p><div class="builder-section-auth"><div class="row"><div class="builder-section-auth-roles col-md-6"><p class="api-section-title">Roles</p>';
  var roleList115 = opt_data.roles;
  var roleListLen115 = roleList115.length;
  for (var roleIndex115 = 0; roleIndex115 < roleListLen115; roleIndex115++) {
    var roleData115 = roleList115[roleIndex115];
    output += '<div>' + soy.$$escapeHtml(Templates.Switcher.content({checked: opt_data.auth.roles[roleData115], events: {checkedChanged: opt_data.id + ':handleRoleCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-rolesSwitcher' + roleData115}, null, opt_ijData)) + '<span class="builder-param-label"> ' + soy.$$escapeHtml(roleData115) + '</span></div>';
  }
  output += '</div><div class="builder-section-auth-permissions col-md-6"><p class="api-section-title">Permissions</p>';
  var permissionList127 = opt_data.permissions;
  var permissionListLen127 = permissionList127.length;
  for (var permissionIndex127 = 0; permissionIndex127 < permissionListLen127; permissionIndex127++) {
    var permissionData127 = permissionList127[permissionIndex127];
    output += '<div>' + soy.$$escapeHtml(Templates.Switcher.content({checked: opt_data.auth.permissions[permissionData127], events: {checkedChanged: opt_data.id + ':handlePermissionCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-permissionsSwitcher' + permissionData127}, null, opt_ijData)) + '<span class="builder-param-label"> ' + soy.$$escapeHtml(permissionData127) + '</span></div>';
  }
  output += '</div></div><div class="row"><input type="text" class="form-control" placeholder="Validator" data-oninput="handleAuthValidatorInput_">' + soy.$$escapeHtml(opt_data.auth.validator ? opt_data.auth.validator : '') + '</input></div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.auth.soyTemplateName = 'Templates.ApiBuilder.auth';
}

Templates.ApiBuilder.content.params = ["id"];
Templates.ApiBuilder.title.params = ["data","id","title"];
Templates.ApiBuilder.description.params = ["id","description"];
Templates.ApiBuilder.methods.params = ["id","method"];
Templates.ApiBuilder.path.params = ["host","id","path"];
Templates.ApiBuilder.handler.params = ["id","handler"];
Templates.ApiBuilder.params.params = ["id","parameters"];
Templates.ApiBuilder.param.private = true;
Templates.ApiBuilder.auth.params = ["auth","id","permissions","roles"];
export default Templates.ApiBuilder;
/* jshint ignore:end */
