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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="builder component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiBuilder.title(opt_data, null, opt_ijData) + Templates.ApiBuilder.description(opt_data, null, opt_ijData) + Templates.ApiBuilder.methods(opt_data, null, opt_ijData) + Templates.ApiBuilder.path(opt_data, null, opt_ijData) + Templates.ApiBuilder.body(opt_data, null, opt_ijData) + Templates.ApiBuilder.params(opt_data, null, opt_ijData) + Templates.ApiBuilder.handler(opt_data, null, opt_ijData) + Templates.ApiBuilder.auth(opt_data, null, opt_ijData) + '</div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-title" class="builder-title"><input type="text" class="form-control-borderless" name="title" placeholder="add a title..." value="' + soy.$$escapeHtmlAttribute(opt_data.title ? opt_data.title : '') + '" autocomplete="off" autofocus data-oninput="handleInputTitle_" /><div class="builder-visibility"><span class="builder-visibility-label">Visibility</span><div class="builder-visibility-switcher">' + soy.$$escapeHtml(Templates.Switcher.content({checked: opt_data.visibility != null ? opt_data.visibility : true, events: {checkedChanged: opt_data.id + ':handleVisibilitySwitcherCheckedChanged_'}, id: opt_data.id + '-visibilitySwitcher'}, null, opt_ijData)) + '</div></div></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-methods" class="api-builder-methods"><p class="api-section-title">Method <a class="api-section-title-link" href="#"><span class="icon-12-external"></span></a></p>' + soy.$$escapeHtml(Templates.ButtonGroup.content({buttons: [{label: 'get', cssClass: 'btn btn-default http-get-bg'}, {label: 'head', cssClass: 'btn btn-default http-head-bg'}, {label: 'post', cssClass: 'btn btn-default http-post-bg'}, {label: 'put', cssClass: 'btn btn-default http-put-bg'}, {label: 'patch', cssClass: 'btn btn-default http-patch-bg'}, {label: 'delete', cssClass: 'btn btn-default http-delete-bg'}], events: {selectedChanged: opt_data.id + ':handleMethodsSelectedChanged_'}, id: opt_data.id + '-methodButtonGroup', minSelected: 1, selected: opt_data.method ? opt_data.method : ['get']}, null, opt_ijData)) + '</div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-path"><p class="api-section-title">Endpoint <a class="api-section-title-link" href="#"><span class="icon-12-external"></span></a></p><div class="form-group"><div class="input-group"><div class="input-group-addon">' + soy.$$escapeHtml(opt_data.host ? opt_data.host : '') + '</div><div class="input-inner-addon input-inner-addon-left"><span class="icon-16-info"></span><input type="text" class="input-group-addon-input form-control" name="path" placeholder="/new-api" value="' + soy.$$escapeHtmlAttribute(opt_data.path ? opt_data.path : '') + '" data-oninput="handleInputPath_" /></div></div></div></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-handler" class="form-group"><p class="api-section-title">Handler <a class="api-section-title-link" href="#"><span class="icon-12-external"></span></a></p><div class="builder-section-handler"><textarea class="form-control handler" name="handler" placeholder="function(request, response) { return \'Hello World\'; }" data-oninput="handleInputHandler_">' + soy.$$escapeHtmlRcdata(opt_data.handler ? opt_data.handler : '') + '</textarea></div></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body"><p class="api-section-title">Body <a class="api-section-title-link" href="#"><span class="icon-12-external"></span></a></p><div class="builder-section-body">' + Templates.ApiBuilder.param({id: opt_data.id, index: -1, param: opt_data.body ? opt_data.body : []}, null, opt_ijData) + '</div></div>');
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-params" class="builder-params"><p class="api-section-title">Parameters <a class="api-section-title-link" href="#"><span class="icon-12-external"></span></a></p><div class="builder-section-params">';
  if (opt_data.parameters) {
    var paramList74 = opt_data.parameters;
    var paramListLen74 = paramList74.length;
    for (var paramIndex74 = 0; paramIndex74 < paramListLen74; paramIndex74++) {
      var paramData74 = paramList74[paramIndex74];
      output += Templates.ApiBuilder.param({id: opt_data.id, index: paramIndex74, param: paramData74}, null, opt_ijData);
    }
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
  var output = '';
  var isBody__soy82 = opt_data.index == -1;
  var suffix__soy83 = isBody__soy82 ? 'Body' : opt_data.index;
  output += '<div class="builder-param-item" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '" data-oninput="handleInputParam_"><div class="row builder-param-item-row">' + ((! isBody__soy82) ? '<div class="col-md-4"><input type="text" class="form-control" placeholder="Parameter" value="' + soy.$$escapeHtmlAttribute(opt_data.param.name) + '" data-name="name" /></div>' : '') + '<div class="col-md-4">';
  var typesMap0__soy93 = {'number': 1, 'string': 2, 'boolean': 3, 'array': 4, 'object': 5};
  output += soy.$$escapeHtml(Templates.Select.content({buttonClass: 'btn btn-default form-control dropdown-select', events: {selectedIndexChanged: opt_data.id + ':handleTypeSelectedIndexChanged_'}, id: opt_data.id + '-typeSelect' + suffix__soy83, items: ['Any Type', 'Number', 'String', 'Boolean', 'Array', 'Object'], label: 'Type', selectedIndex: opt_data.param.type ? typesMap0__soy93[opt_data.param.type] : 0}, null, opt_ijData)) + '</div><div class="col-md-3"><span class="builder-param-label">Required</span>' + soy.$$escapeHtml(Templates.Switcher.content({checked: opt_data.param.required ? opt_data.param.required : false, events: {checkedChanged: opt_data.id + ':handleRequiredCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-requiredSwitcher' + suffix__soy83}, null, opt_ijData)) + '</div>' + ((! isBody__soy82) ? '<div class="col-md-1 builder-param-actions">' + soy.$$escapeHtml(Templates.Dropdown.content({body: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleDuplicateParamClick_" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="#">Duplicate</a></li><li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleRemoveParamClick_" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><a href="#">Remove</a></li>'), header: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<button class="builder-param-ellipsis btn-transparent icon-16-ellipsis" type="button" data-onclick="toggle"></button>'), id: opt_data.id + '-menu' + suffix__soy83}, null, opt_ijData)) + '</div>' : '') + '</div><div class="row builder-param-item-row"><div class="col-md-8"><input type="text" class="form-control" placeholder="Description" value="' + soy.$$escapeHtmlAttribute(opt_data.param.description ? opt_data.param.description : '') + '" data-name="description" /></div></div><div class="builder-param-item-advanced"><button class="builder-param-item-advanced-btn btn-transparent" type="button" data-onclick="handleAdvancedSetupClick_">Advanced Setup <span class="builder-param-item-advanced-arrow icon-12-arrow-down-short"></span></button>' + ((! isBody__soy82) ? '<div class="row builder-param-item-row"><div class="col-md-8"><input type="text" class="form-control" placeholder="Value" value="' + soy.$$escapeHtmlAttribute(opt_data.param.value ? opt_data.param.value : '') + '" data-name="value" /></div></div>' : '') + '<div class="row builder-param-item-row"><div class="col-md-8"><input type="text" class="form-control" placeholder="Validator" value="' + soy.$$escapeHtmlAttribute(opt_data.param.validator ? opt_data.param.validator : '') + '" data-name="validator" /></div></div></div></div>';
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-auth" class="form-group"><p class="api-section-title">Authentication <a class="api-section-title-link" href="#"><span class="icon-12-external"></span></a></p><div class="builder-section-auth"><div class="builder-section-auth-row"><div class="builder-section-auth-roles"><p class="api-section-title">Roles</p>';
  if (opt_data.roles) {
    var roleList143 = opt_data.roles;
    var roleListLen143 = roleList143.length;
    for (var roleIndex143 = 0; roleIndex143 < roleListLen143; roleIndex143++) {
      var roleData143 = roleList143[roleIndex143];
      output += '<div class="builder-param-switcher-container">';
      var roleChecked__soy145 = '' + ('' + Templates.ApiBuilder.arrHasItem({array: opt_data.auth.roles, item: roleData143}, null, opt_ijData));
      roleChecked__soy145 = soydata.$$markUnsanitizedTextForInternalBlocks(roleChecked__soy145);
      output += soy.$$escapeHtml(Templates.Switcher.content({checked: ('' + roleChecked__soy145).indexOf('true') != -1, events: {checkedChanged: opt_data.id + ':handleRoleCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-rolesSwitcher' + roleData143}, null, opt_ijData)) + '<span class="builder-param-label"> ' + soy.$$escapeHtml(roleData143) + '</span></div>';
    }
  }
  output += '</div><div class="builder-section-auth-permissions"><p class="api-section-title">Permissions</p>';
  if (opt_data.permissions) {
    var permissionList161 = opt_data.permissions;
    var permissionListLen161 = permissionList161.length;
    for (var permissionIndex161 = 0; permissionIndex161 < permissionListLen161; permissionIndex161++) {
      var permissionData161 = permissionList161[permissionIndex161];
      output += '<div class="builder-param-switcher-container">';
      var permissionChecked__soy163 = '' + ('' + Templates.ApiBuilder.arrHasItem({array: opt_data.auth.permissions, item: permissionData161}, null, opt_ijData));
      permissionChecked__soy163 = soydata.$$markUnsanitizedTextForInternalBlocks(permissionChecked__soy163);
      output += soy.$$escapeHtml(Templates.Switcher.content({checked: ('' + permissionChecked__soy163).indexOf('true') != -1, events: {checkedChanged: opt_data.id + ':handlePermissionCheckedChanged_'}, elementClasses: 'builder-param-switcher', id: opt_data.id + '-permissionsSwitcher' + permissionData161}, null, opt_ijData)) + '<span class="builder-param-label"> ' + soy.$$escapeHtml(permissionData161) + '</span></div>';
    }
  }
  output += '</div></div><input type="text" class="form-control" placeholder="Validator" value="' + soy.$$escapeHtmlAttribute(opt_data.auth.validator ? opt_data.auth.validator : '') + '" data-oninput="handleAuthValidatorInput_" /></div></div>';
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
    var arrItemList182 = opt_data.array;
    var arrItemListLen182 = arrItemList182.length;
    for (var arrItemIndex182 = 0; arrItemIndex182 < arrItemListLen182; arrItemIndex182++) {
      var arrItemData182 = arrItemList182[arrItemIndex182];
      output += (opt_data.item == arrItemData182) ? '\'true\'' : '';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.arrHasItem.soyTemplateName = 'Templates.ApiBuilder.arrHasItem';
}

Templates.ApiBuilder.content.params = ["id"];
Templates.ApiBuilder.title.params = ["id","title","visibility"];
Templates.ApiBuilder.description.params = ["id","description"];
Templates.ApiBuilder.methods.params = ["id","method"];
Templates.ApiBuilder.path.params = ["host","id","path"];
Templates.ApiBuilder.handler.params = ["id","handler"];
Templates.ApiBuilder.body.params = ["id","body"];
Templates.ApiBuilder.params.params = ["id","parameters"];
Templates.ApiBuilder.param.private = true;
Templates.ApiBuilder.auth.params = ["auth","id","permissions","roles"];
Templates.ApiBuilder.arrHasItem.private = true;
export default Templates.ApiBuilder;
/* jshint ignore:end */
