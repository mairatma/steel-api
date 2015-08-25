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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="api-explorer component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiExplorer.nameAndMethods(opt_data, null, opt_ijData) + Templates.ApiExplorer.description(opt_data, null, opt_ijData) + Templates.ApiExplorer.path(opt_data, null, opt_ijData) + Templates.ApiExplorer.params(opt_data, null, opt_ijData) + '<div class="app-explorer-try-it-header">Try it out:</div>' + Templates.ApiExplorer.runParams(opt_data, null, opt_ijData) + Templates.ApiExplorer.tryIt(opt_data, null, opt_ijData) + Templates.ApiExplorer.response(opt_data, null, opt_ijData) + '</div>');
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
Templates.ApiExplorer.nameAndMethods = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-nameAndMethods">' + soy.$$escapeHtml(opt_data.name);
  var currMethodList128 = opt_data.method;
  var currMethodListLen128 = currMethodList128.length;
  for (var currMethodIndex128 = 0; currMethodIndex128 < currMethodListLen128; currMethodIndex128++) {
    var currMethodData128 = currMethodList128[currMethodIndex128];
    output += ' <span class="label label-default">' + soy.$$escapeHtml(currMethodData128) + '</span>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiExplorer.nameAndMethods.soyTemplateName = 'Templates.ApiExplorer.nameAndMethods';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.description = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-description" class="text-muted">' + soy.$$escapeHtml(opt_data.description) + '</div>');
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
Templates.ApiExplorer.path = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-path">' + soy.$$escapeHtml(opt_data.path) + '</div>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.path.soyTemplateName = 'Templates.ApiExplorer.path';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.params = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-params" class="api-explorer-params row"><div class="col-xs-4"><strong>Name</strong></div><div class="col-xs-4"><strong>Type</strong></div><div class="col-xs-4"><strong>Description</strong></div>';
  var paramList150 = opt_data.parameters;
  var paramListLen150 = paramList150.length;
  for (var paramIndex150 = 0; paramIndex150 < paramListLen150; paramIndex150++) {
    var paramData150 = paramList150[paramIndex150];
    output += '<div class="col-xs-4">' + soy.$$escapeHtml(paramData150.name) + '</div><div class="col-xs-4">' + soy.$$escapeHtml(paramData150.type) + '</div><div class="col-xs-4">' + soy.$$escapeHtml(paramData150.description) + '</div>';
  }
  output += '</div>';
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
Templates.ApiExplorer.runParams = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-runParams" class="form-inline"><div class="form-group">';
  var paramList164 = opt_data.parameters;
  var paramListLen164 = paramList164.length;
  for (var paramIndex164 = 0; paramIndex164 < paramListLen164; paramIndex164++) {
    var paramData164 = paramList164[paramIndex164];
    output += '<span class="app-explorer-try-it-param">';
    var value__soy166 = paramData164.value ? paramData164.value : '';
    output += '<label>' + soy.$$escapeHtml(paramData164.name) + '</label> <input type="text" placeholder="' + soy.$$escapeHtmlAttribute(value__soy166) + '" class="app-explorer-try-it-param-input" /></span>';
  }
  output += '</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiExplorer.runParams.soyTemplateName = 'Templates.ApiExplorer.runParams';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.tryIt = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryIt"><select class="form-control app-explorer-try-it-methods">';
  var currMethodList178 = opt_data.method;
  var currMethodListLen178 = currMethodList178.length;
  for (var currMethodIndex178 = 0; currMethodIndex178 < currMethodListLen178; currMethodIndex178++) {
    var currMethodData178 = currMethodList178[currMethodIndex178];
    output += '<option value="' + soy.$$escapeHtmlAttribute(currMethodData178) + '">' + soy.$$escapeHtml(currMethodData178) + '</option>';
  }
  output += '</select><input type="text" class="form-control app-explorer-try-it-path" value="' + soy.$$escapeHtmlAttribute(opt_data.path) + '" disabled><button type="button" class="btn btn-primary app-explorer-try-it-button" data-onclick="handleClickRun_">Run</button></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
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
Templates.ApiExplorer.response = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-response" class="api-explorer-response">' + ((opt_data.response) ? '<div class="api-explorer-response-status">' + soy.$$escapeHtml(opt_data.response.statusCode) + ' ' + soy.$$escapeHtml(opt_data.response.statusText) + '</div>' + ((opt_data.response.bodyString) ? '<div class="api-explorer-response-body">' + soy.$$escapeHtml(opt_data.response.bodyString) + '</div>' : '') : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.response.soyTemplateName = 'Templates.ApiExplorer.response';
}

Templates.ApiExplorer.content.params = ["id"];
Templates.ApiExplorer.nameAndMethods.params = ["id","method","name"];
Templates.ApiExplorer.description.params = ["id","description"];
Templates.ApiExplorer.path.params = ["id","path"];
Templates.ApiExplorer.params.params = ["id","parameters"];
Templates.ApiExplorer.runParams.params = ["id","parameters"];
Templates.ApiExplorer.tryIt.params = ["id","method","path"];
Templates.ApiExplorer.response.params = ["id","response"];
export default Templates.ApiExplorer;
/* jshint ignore:end */
