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
  var currMethodList113 = opt_data.method;
  var currMethodListLen113 = currMethodList113.length;
  for (var currMethodIndex113 = 0; currMethodIndex113 < currMethodListLen113; currMethodIndex113++) {
    var currMethodData113 = currMethodList113[currMethodIndex113];
    output += ' <span class="label label-default">' + soy.$$escapeHtml(currMethodData113) + '</span>';
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
  var paramList135 = opt_data.parameters;
  var paramListLen135 = paramList135.length;
  for (var paramIndex135 = 0; paramIndex135 < paramListLen135; paramIndex135++) {
    var paramData135 = paramList135[paramIndex135];
    output += '<div class="col-xs-4">' + soy.$$escapeHtml(paramData135.name) + '</div><div class="col-xs-4">' + soy.$$escapeHtml(paramData135.type) + '</div><div class="col-xs-4">' + soy.$$escapeHtml(paramData135.description) + '</div>';
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
  var paramList149 = opt_data.parameters;
  var paramListLen149 = paramList149.length;
  for (var paramIndex149 = 0; paramIndex149 < paramListLen149; paramIndex149++) {
    var paramData149 = paramList149[paramIndex149];
    output += '<span class="app-explorer-try-it-param">';
    var value__soy151 = paramData149.value ? paramData149.value : '';
    output += '<label>' + soy.$$escapeHtml(paramData149.name) + '</label> <input type="text" placeholder="' + soy.$$escapeHtmlAttribute(value__soy151) + '" class="app-explorer-try-it-param-input" /></span>';
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
  var currMethodList163 = opt_data.method;
  var currMethodListLen163 = currMethodList163.length;
  for (var currMethodIndex163 = 0; currMethodIndex163 < currMethodListLen163; currMethodIndex163++) {
    var currMethodData163 = currMethodList163[currMethodIndex163];
    output += '<option value="' + soy.$$escapeHtmlAttribute(currMethodData163) + '">' + soy.$$escapeHtml(currMethodData163) + '</option>';
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
