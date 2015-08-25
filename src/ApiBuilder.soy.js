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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="api component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiBuilder.name(opt_data, null, opt_ijData) + Templates.ApiBuilder.description(opt_data, null, opt_ijData) + Templates.ApiBuilder.methods(opt_data, null, opt_ijData) + Templates.ApiBuilder.path(opt_data, null, opt_ijData) + Templates.ApiBuilder.handler(opt_data, null, opt_ijData) + Templates.ApiBuilder.params(opt_data, null, opt_ijData) + '<div class="form-group"><a href="#" class="text-muted api-builder-param-add" data-onclick="handleAddParamClick_">add param...</a></div><button type="button" class="btn btn-primary">Save</div></div>');
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
Templates.ApiBuilder.name = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-name" class="form-group"><input type="text" class="form-control" name="name" placeholder="Name" value="' + soy.$$escapeHtmlAttribute(opt_data.name) + '" /></div>');
};
if (goog.DEBUG) {
  Templates.ApiBuilder.name.soyTemplateName = 'Templates.ApiBuilder.name';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.description = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-description" class="form-group"><textarea class="form-control" name="description" placeholder="Description">' + soy.$$escapeHtmlRcdata(opt_data.description) + '</textarea></div>');
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-methods" class="api-builder-methods form-group">';
  var supportedMethods__soy31 = ['delete', 'get', 'head', 'patch', 'post', 'put'];
  var currentMethodList32 = supportedMethods__soy31;
  var currentMethodListLen32 = currentMethodList32.length;
  for (var currentMethodIndex32 = 0; currentMethodIndex32 < currentMethodListLen32; currentMethodIndex32++) {
    var currentMethodData32 = currentMethodList32[currentMethodIndex32];
    output += '<label class="checkbox-inline">';
    var methodChecked__soy34 = '' + Templates.ApiBuilder.methodChecked(soy.$$augmentMap(opt_data, {method: currentMethodData32, methods: opt_data.method}), null, opt_ijData);
    methodChecked__soy34 = soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(methodChecked__soy34);
    output += '<input type="checkbox" value="' + soy.$$escapeHtmlAttribute(currentMethodData32) + '"' + soy.$$filterHtmlAttributes(methodChecked__soy34) + '>' + soy.$$escapeHtml(currentMethodData32) + '</label>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
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
Templates.ApiBuilder.methodChecked = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var currentMethodList48 = opt_data.methods;
  var currentMethodListLen48 = currentMethodList48.length;
  for (var currentMethodIndex48 = 0; currentMethodIndex48 < currentMethodListLen48; currentMethodIndex48++) {
    var currentMethodData48 = currentMethodList48[currentMethodIndex48];
    output += (opt_data.method == currentMethodData48) ? 'checked' : '';
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.methodChecked.soyTemplateName = 'Templates.ApiBuilder.methodChecked';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiBuilder.path = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-path" class="form-group"><input type="text" class="form-control" name="path" placeholder="Path" value="' + soy.$$escapeHtmlAttribute(opt_data.path) + '" /></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-handler" class="form-group"><textarea class="form-control" name="handler" placeholder="Handler">' + soy.$$escapeHtmlRcdata(opt_data.handler) + '</textarea></div>');
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-params"><label>Params</label>';
  var paramList69 = opt_data.parameters;
  var paramListLen69 = paramList69.length;
  for (var paramIndex69 = 0; paramIndex69 < paramListLen69; paramIndex69++) {
    var paramData69 = paramList69[paramIndex69];
    output += Templates.ApiBuilder.param({param: paramData69}, null, opt_ijData);
  }
  output += '</div>';
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
  var output = '<div class="row form-group api-builder-param"><div class="col-xs-2"><input type="text" class="form-control" placeholder="Param" value="' + soy.$$escapeHtmlAttribute(opt_data.param.name) + '" /></div><div class="col-xs-2">';
  var types__soy78 = ['number', 'string', 'boolean', 'array', 'object'];
  output += '<select type="text" class="form-control">';
  var typeList80 = types__soy78;
  var typeListLen80 = typeList80.length;
  for (var typeIndex80 = 0; typeIndex80 < typeListLen80; typeIndex80++) {
    var typeData80 = typeList80[typeIndex80];
    output += '<option value="' + soy.$$escapeHtmlAttribute(typeData80) + '"' + soy.$$filterHtmlAttributes(typeData80 == opt_data.param.type ? 'selected' : '') + '>' + soy.$$escapeHtml(typeData80) + '</option>';
  }
  output += '</select></div><div class="col-xs-2">';
  var value__soy90 = opt_data.param.value ? opt_data.param.value : '';
  output += '<input type="text" class="form-control" placeholder="Value" value="' + soy.$$escapeHtmlAttribute(value__soy90) + '" /></div><div class="col-xs-2"><select type="text" class="form-control"><option value="body">Body</option><option value="url"' + soy.$$filterHtmlAttributes(opt_data.param['in'] == 'url' ? 'selected' : '') + '>URL Param</option></select></div><div class="col-xs-2">';
  var description__soy96 = opt_data.param.description ? opt_data.param.description : '';
  output += '<input type="text" class="form-control" placeholder="Description" value="' + soy.$$escapeHtmlAttribute(description__soy96) + '" /></div><div class="col-xs-2"><label><input type="checkbox" ' + soy.$$filterHtmlAttributes(opt_data.param.required ? 'checked' : '') + ' /> Required</label><button type="button" class="close"><span aria-hidden="true">&times;</span></button></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.param.soyTemplateName = 'Templates.ApiBuilder.param';
}

Templates.ApiBuilder.content.params = ["id"];
Templates.ApiBuilder.name.params = ["id","name"];
Templates.ApiBuilder.description.params = ["id","description"];
Templates.ApiBuilder.methods.params = ["id","method"];
Templates.ApiBuilder.methodChecked.private = true;
Templates.ApiBuilder.path.params = ["id","path"];
Templates.ApiBuilder.handler.params = ["id","handler"];
Templates.ApiBuilder.params.params = ["id","parameters"];
Templates.ApiBuilder.param.private = true;
export default Templates.ApiBuilder;
/* jshint ignore:end */
