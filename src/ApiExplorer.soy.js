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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<p id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-title" class="explorer-title"><span class="explorer-title-label label label-sm http-' + soy.$$escapeHtmlAttribute(opt_data.method[0]) + '-bg">' + soy.$$escapeHtml(opt_data.method[0]) + '</span><span class="explorer-title-name">' + soy.$$escapeHtml(opt_data.path) + '</span>' + ((opt_data.data) ? '<span class="explorer-data"><span class="explorer-data-icon icon-12-check"></span><span class="explorer-data-label">Data</span></span>' : '') + '</p>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<p id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-description" class="explorer-description">' + soy.$$escapeHtml(opt_data.description) + '</p>');
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-auth"><p class="api-section-title">Authentication</p><div class="explorer-section-auth">';
  if (opt_data.auth.roles) {
    var roleList198 = soy.$$getMapKeys(opt_data.auth.roles);
    var roleListLen198 = roleList198.length;
    for (var roleIndex198 = 0; roleIndex198 < roleListLen198; roleIndex198++) {
      var roleData198 = roleList198[roleIndex198];
      output += '<span class="label label-primary"><span class="label-icon icon-12-person"></span> ' + soy.$$escapeHtml(roleData198) + '</span>';
    }
  }
  if (opt_data.auth.permissions) {
    var permissionList205 = soy.$$getMapKeys(opt_data.auth.permissions);
    var permissionListLen205 = permissionList205.length;
    for (var permissionIndex205 = 0; permissionIndex205 < permissionListLen205; permissionIndex205++) {
      var permissionData205 = permissionList205[permissionIndex205];
      output += '<span class="label label-success"><span class="label-icon icon-12-check"></span> ' + soy.$$escapeHtml(permissionData205) + '</span>';
    }
  }
  output += '</div></div>';
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-params"><p class="api-section-title">Parameters</p><div class="explorer-section-params"><table class="table"><thead><tr><th>Name</th><th>Description</th><th class="text-center">Type</th><th class="text-center">Value</th><th class="text-center">Required</th></tr></thead><tbody>';
  var paramList215 = opt_data.parameters;
  var paramListLen215 = paramList215.length;
  for (var paramIndex215 = 0; paramIndex215 < paramListLen215; paramIndex215++) {
    var paramData215 = paramList215[paramIndex215];
    output += '<tr><td>' + soy.$$escapeHtml(paramData215.name) + '</td><td>' + soy.$$escapeHtml(paramData215.description ? paramData215.description : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData215.type ? paramData215.type : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData215.value ? paramData215.value : '') + '</td><td class="text-center">' + ((paramData215.required) ? '<span class="explorer-icon-required icon-16-confirm"></span>' : '') + '</td></tr>';
  }
  output += '</tbody></table></div></div>';
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
  var paramList235 = opt_data.parameters;
  var paramListLen235 = paramList235.length;
  for (var paramIndex235 = 0; paramIndex235 < paramListLen235; paramIndex235++) {
    var paramData235 = paramList235[paramIndex235];
    output += '<div class="col-md-3"><label for="from">' + soy.$$escapeHtml(paramData235.name) + ' ' + ((paramData235.required) ? '<span class="explorer-icon-required">*</span>' : '') + '</label><input name="' + soy.$$escapeHtmlAttribute(paramData235.name) + '" class="form-control explorer-section-try-param" type="text" autocomplete="off" placeholder="' + soy.$$escapeHtmlAttribute(paramData235.value ? paramData235.value : '') + '" data-index="' + soy.$$escapeHtmlAttribute(paramIndex235) + '" data-oninput="handleParamInput_" ></div>';
  }
  output += '</div>';
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryIt" class="row"><div class="col-md-12"><div class="input-group"><div class="input-group-btn">' + soy.$$escapeHtml(Templates.Select.content({id: opt_data.id + '-methodSelect', items: opt_data.method, buttonClass: 'btn btn-default btn-sm dropdown-select-group-left', hiddenFieldName: 'method'}, null, opt_ijData)) + '</div><input class="input-btn-right form-control" type="text" value="' + soy.$$escapeHtmlAttribute(opt_data.host) + soy.$$escapeHtmlAttribute(opt_data.replacedPath) + '" readonly><div class="input-group-btn"><button class="btn btn-sm btn-success explorer-section-try-button" type="button" data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleClickRun_">Try It!</button></div></div></div></div>');
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
Templates.ApiExplorer.title.params = ["data","id","method","path"];
Templates.ApiExplorer.description.params = ["id","description"];
Templates.ApiExplorer.auth.params = ["id","auth"];
Templates.ApiExplorer.params.params = ["id","parameters"];
Templates.ApiExplorer.tryParams.params = ["id","parameters"];
Templates.ApiExplorer.tryIt.params = ["host","id","method","replacedPath"];
Templates.ApiExplorer.tryResponse.params = ["id","response"];
export default Templates.ApiExplorer;
/* jshint ignore:end */
