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
    var roleList146 = opt_data.auth.roles;
    var roleListLen146 = roleList146.length;
    for (var roleIndex146 = 0; roleIndex146 < roleListLen146; roleIndex146++) {
      var roleData146 = roleList146[roleIndex146];
      output += '<span class="label label-primary"><span class="label-icon icon-12-person"></span> ' + soy.$$escapeHtml(roleData146) + '</span>';
    }
  }
  if (opt_data.auth.permissions) {
    var permissionList153 = opt_data.auth.permissions;
    var permissionListLen153 = permissionList153.length;
    for (var permissionIndex153 = 0; permissionIndex153 < permissionListLen153; permissionIndex153++) {
      var permissionData153 = permissionList153[permissionIndex153];
      output += '<span class="label label-success"><span class="label-icon icon-12-check"></span> ' + soy.$$escapeHtml(permissionData153) + '</span>';
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
  var paramList163 = opt_data.parameters;
  var paramListLen163 = paramList163.length;
  for (var paramIndex163 = 0; paramIndex163 < paramListLen163; paramIndex163++) {
    var paramData163 = paramList163[paramIndex163];
    output += '<tr><td>' + soy.$$escapeHtml(paramData163.name) + '</td><td>' + soy.$$escapeHtml(paramData163.description ? paramData163.description : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData163.type ? paramData163.type : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData163.value ? paramData163.value : '') + '</td><td class="text-center">' + ((paramData163.required) ? '<span class="explorer-icon-required icon-16-confirm"></span>' : '') + '</td></tr>';
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
  var paramList183 = opt_data.parameters;
  var paramListLen183 = paramList183.length;
  for (var paramIndex183 = 0; paramIndex183 < paramListLen183; paramIndex183++) {
    var paramData183 = paramList183[paramIndex183];
    output += '<div class="col-md-3"><label for="from">' + soy.$$escapeHtml(paramData183.name) + ' ' + ((paramData183.required) ? '<span class="explorer-icon-required">*</span>' : '') + '</label><input name="' + soy.$$escapeHtmlAttribute(paramData183.name) + '" class="form-control explorer-section-try-param" type="text" autocomplete="off" placeholder="' + soy.$$escapeHtmlAttribute(paramData183.value ? paramData183.value : '') + '" data-index="' + soy.$$escapeHtmlAttribute(paramIndex183) + '" data-oninput="handleParamInput_" ></div>';
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
