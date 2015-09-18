/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from ApiExplorer.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.ApiExplorer.
 */

if (typeof Templates.ApiExplorer == 'undefined') { Templates.ApiExplorer = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="explorer component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiExplorer.title(opt_data, null, opt_ijData) + Templates.ApiExplorer.description(opt_data, null, opt_ijData) + Templates.ApiExplorer.auth(opt_data, null, opt_ijData) + Templates.ApiExplorer.params(opt_data, null, opt_ijData) + '<p class="api-section-title">Try it out</p><div class="explorer-section-try"><form>' + Templates.ApiExplorer.tryParams(opt_data, null, opt_ijData) + Templates.ApiExplorer.tryIt(opt_data, null, opt_ijData) + '</form>' + Templates.ApiExplorer.tryResponse(opt_data, null, opt_ijData) + '</div></div>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.content.soyTemplateName = 'Templates.ApiExplorer.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.title = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<p id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-title" class="explorer-title">';
  if (opt_data.method) {
    var methodNameList186 = opt_data.method;
    var methodNameListLen186 = methodNameList186.length;
    for (var methodNameIndex186 = 0; methodNameIndex186 < methodNameListLen186; methodNameIndex186++) {
      var methodNameData186 = methodNameList186[methodNameIndex186];
      output += '<span class="explorer-title-label label label-sm http-' + soy.$$escapeHtmlAttribute(methodNameData186) + '-bg">' + soy.$$escapeHtml(methodNameData186) + '</span>';
    }
  }
  output += '<span class="explorer-title-name">' + soy.$$escapeHtml(opt_data.title ? opt_data.title : opt_data.path) + '</span>' + ((opt_data.visibility || ! (opt_data.visibility != null)) ? '<span class="explorer-visibility"><span class="explorer-visibility-icon icon-12-check"></span><span class="explorer-visibility-label">Visibility</span></span>' : '') + '</p>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiExplorer.title.soyTemplateName = 'Templates.ApiExplorer.title';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.description = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<p id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-description" class="explorer-description">' + soy.$$escapeHtml(opt_data.description ? opt_data.description : '') + '</p>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.description.soyTemplateName = 'Templates.ApiExplorer.description';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.auth = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  if (opt_data.auth && opt_data.auth.roles && opt_data.auth.roles.length) {
    output += '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-auth"><p class="api-section-title">Authentication</p><div class="explorer-section-auth">';
    if (opt_data.auth.roles) {
      var roleList214 = opt_data.auth.roles;
      var roleListLen214 = roleList214.length;
      for (var roleIndex214 = 0; roleIndex214 < roleListLen214; roleIndex214++) {
        var roleData214 = roleList214[roleIndex214];
        output += '<span class="label label-primary"><span class="label-icon icon-12-person"></span> ' + soy.$$escapeHtml(roleData214) + '</span>';
      }
    }
    if (opt_data.auth.permissions) {
      var permissionList221 = opt_data.auth.permissions;
      var permissionListLen221 = permissionList221.length;
      for (var permissionIndex221 = 0; permissionIndex221 < permissionListLen221; permissionIndex221++) {
        var permissionData221 = permissionList221[permissionIndex221];
        output += '<span class="label label-success"><span class="label-icon icon-12-check"></span> ' + soy.$$escapeHtml(permissionData221) + '</span>';
      }
    }
    output += '</div></div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiExplorer.auth.soyTemplateName = 'Templates.ApiExplorer.auth';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  if (opt_data.parameters && opt_data.parameters.length) {
    output += '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-params"><p class="api-section-title">Parameters</p><div class="explorer-section-params"><table class="table"><thead><tr><th>Name</th><th>Description</th><th class="text-center">Type</th><th class="text-center">Value</th><th class="text-center">Required</th></tr></thead><tbody>';
    var paramList233 = opt_data.parameters;
    var paramListLen233 = paramList233.length;
    for (var paramIndex233 = 0; paramIndex233 < paramListLen233; paramIndex233++) {
      var paramData233 = paramList233[paramIndex233];
      output += '<tr><td>' + soy.$$escapeHtml(paramData233.name) + '</td><td>' + soy.$$escapeHtml(paramData233.description ? paramData233.description : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData233.type ? paramData233.type : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData233.value ? paramData233.value : '') + '</td><td class="text-center">' + ((paramData233.required) ? '<span class="explorer-icon-required icon-16-confirm"></span>' : '') + '</td></tr>';
    }
    output += '</tbody></table></div></div>';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiExplorer.params.soyTemplateName = 'Templates.ApiExplorer.params';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.tryParams = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryParams" class="row">';
  if (opt_data.parameters) {
    var paramList255 = opt_data.parameters;
    var paramListLen255 = paramList255.length;
    for (var paramIndex255 = 0; paramIndex255 < paramListLen255; paramIndex255++) {
      var paramData255 = paramList255[paramIndex255];
      output += '<div class="col-md-3"><label for="from">' + soy.$$escapeHtml(paramData255.name) + ' ' + ((paramData255.required) ? '<span class="explorer-icon-required">*</span>' : '') + '</label><input name="' + soy.$$escapeHtmlAttribute(paramData255.name) + '" class="form-control explorer-section-try-param" type="text" autocomplete="off" placeholder="' + soy.$$escapeHtmlAttribute(paramData255.value ? paramData255.value : '') + '" data-index="' + soy.$$escapeHtmlAttribute(paramIndex255) + '" data-oninput="handleParamInput_" ></div>';
    }
  }
  output += ((('' + opt_data.path).indexOf('/*') != -1) ? '<div class="col-md-3"><label for="from">Wildcard <span class="explorer-icon-required">*</span></label><input name="Wildcard" class="form-control explorer-section-try-param" type="text" autocomplete="off" data-oninput="handleWildcardInput_" ></div>' : '') + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiExplorer.tryParams.soyTemplateName = 'Templates.ApiExplorer.tryParams';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.tryIt = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryIt" class="row"><div class="col-md-12"><div class="input-group">' + ((opt_data.method.length > 1) ? '<div class="input-group-btn">' + soy.$$escapeHtml(Templates.Select.content({id: opt_data.id + '-methodSelect', label: '', items: opt_data.method ? opt_data.method : ['get'], buttonClass: 'btn btn-default btn-sm dropdown-select-group-left', hiddenFieldName: 'method'}, null, opt_ijData)) + '</div>' : '<div class="input-group-addon explorer-section-try-method">' + soy.$$escapeHtml(opt_data.method[0]) + '</div>') + '<input class="form-control" type="text" value="' + soy.$$escapeHtmlAttribute(opt_data.host ? opt_data.host : '') + soy.$$escapeHtmlAttribute(opt_data.replacedPath ? opt_data.replacedPath : '') + '" readonly><div class="input-group-btn"><button class="btn btn-sm btn-success explorer-section-try-button" type="button" data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleClickRun_">Try It!</button></div></div></div></div>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.tryIt.soyTemplateName = 'Templates.ApiExplorer.tryIt';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.tryResponse = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryResponse">' + ((opt_data.response) ? '<div class="explorer-section-response"><div class="explorer-status-container"><span class="explorer-status">' + soy.$$escapeHtml(opt_data.response.statusCode) + ' ' + soy.$$escapeHtml(opt_data.response.statusText) + '</span></div>' + ((opt_data.response.bodyString) ? '<div class="explorer-code-container"><textarea>' + soy.$$escapeHtmlRcdata(opt_data.response.bodyString) + '</textarea></div>' : '') + '</div>' : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.tryResponse.soyTemplateName = 'Templates.ApiExplorer.tryResponse';
}

Templates.ApiExplorer.content.params = ["id"];
Templates.ApiExplorer.title.params = ["id","method","path","title","visibility"];
Templates.ApiExplorer.description.params = ["id","description"];
Templates.ApiExplorer.auth.params = ["id","auth"];
Templates.ApiExplorer.params.params = ["id","parameters"];
Templates.ApiExplorer.tryParams.params = ["id","parameters","path"];
Templates.ApiExplorer.tryIt.params = ["host","id","method","replacedPath"];
Templates.ApiExplorer.tryResponse.params = ["id","response"];
export default Templates.ApiExplorer;
/* jshint ignore:end */
