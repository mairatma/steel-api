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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="api-explorer component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiExplorer.nameAndMethods(opt_data, null, opt_ijData) + Templates.ApiExplorer.description(opt_data, null, opt_ijData) + Templates.ApiExplorer.path(opt_data, null, opt_ijData) + Templates.ApiExplorer.params(opt_data, null, opt_ijData) + '<div class="app-explorer-try-it-header">Try it out:</div>' + Templates.ApiExplorer.runParams(opt_data, null, opt_ijData) + Templates.ApiExplorer.tryIt(opt_data, null, opt_ijData) + '</div>');
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
  var currMethodList127 = opt_data.method;
  var currMethodListLen127 = currMethodList127.length;
  for (var currMethodIndex127 = 0; currMethodIndex127 < currMethodListLen127; currMethodIndex127++) {
    var currMethodData127 = currMethodList127[currMethodIndex127];
    output += ' <span class="label label-default">' + soy.$$escapeHtml(currMethodData127) + '</span>';
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
  var paramList149 = opt_data.parameters;
  var paramListLen149 = paramList149.length;
  for (var paramIndex149 = 0; paramIndex149 < paramListLen149; paramIndex149++) {
    var paramData149 = paramList149[paramIndex149];
    output += '<div class="col-xs-4">' + soy.$$escapeHtml(paramData149.name) + '</div><div class="col-xs-4">' + soy.$$escapeHtml(paramData149.type) + '</div><div class="col-xs-4">' + soy.$$escapeHtml(paramData149.description) + '</div>';
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
  var paramList163 = opt_data.parameters;
  var paramListLen163 = paramList163.length;
  for (var paramIndex163 = 0; paramIndex163 < paramListLen163; paramIndex163++) {
    var paramData163 = paramList163[paramIndex163];
    output += '<span class="app-explorer-try-it-param">';
    var value__soy165 = paramData163.value ? paramData163.value : '';
    output += '<label>' + soy.$$escapeHtml(paramData163.name) + '</label> <input type="text" placeholder="' + soy.$$escapeHtmlAttribute(value__soy165) + '" /></span>';
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
  var currMethodList177 = opt_data.method;
  var currMethodListLen177 = currMethodList177.length;
  for (var currMethodIndex177 = 0; currMethodIndex177 < currMethodListLen177; currMethodIndex177++) {
    var currMethodData177 = currMethodList177[currMethodIndex177];
    output += '<option>' + soy.$$escapeHtml(currMethodData177) + '</option>';
  }
  output += '</select><input type="text" class="form-control app-explorer-try-it-path" value="' + soy.$$escapeHtmlAttribute(opt_data.path) + '" disabled><button type="button" class="btn btn-primary app-explorer-try-it-button">Run</button></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiExplorer.tryIt.soyTemplateName = 'Templates.ApiExplorer.tryIt';
}

Templates.ApiExplorer.content.params = ["id"];
Templates.ApiExplorer.nameAndMethods.params = ["id","method","name"];
Templates.ApiExplorer.description.params = ["id","description"];
Templates.ApiExplorer.path.params = ["id","path"];
Templates.ApiExplorer.params.params = ["id","parameters"];
Templates.ApiExplorer.runParams.params = ["id","parameters"];
Templates.ApiExplorer.tryIt.params = ["id","method","path"];
export default Templates.ApiExplorer;
/* jshint ignore:end */
