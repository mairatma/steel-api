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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="api-builder component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiBuilder.name(opt_data, null, opt_ijData) + Templates.ApiBuilder.description(opt_data, null, opt_ijData) + Templates.ApiBuilder.methods(opt_data, null, opt_ijData) + Templates.ApiBuilder.path(opt_data, null, opt_ijData) + Templates.ApiBuilder.handler(opt_data, null, opt_ijData) + Templates.ApiBuilder.params(opt_data, null, opt_ijData) + '<div class="form-group"><a href="#" class="text-muted api-builder-param-add" data-onclick="handleClickAddParam_">add param...</a></div></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-name" class="form-group"><input type="text" class="form-control" name="name" placeholder="Name" value="' + soy.$$escapeHtmlAttribute(opt_data.name) + '" data-oninput="handleInputName_" /></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-description" class="form-group"><textarea class="form-control" name="description" placeholder="Description" data-oninput="handleInputDescription_">' + soy.$$escapeHtmlRcdata(opt_data.description) + '</textarea></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-methods" class="api-builder-methods">' + soy.$$escapeHtml(Templates.ButtonGroup.content({buttons: [{label: 'get', cssClass: 'btn btn-default btn-get-bg'}, {label: 'head', cssClass: 'btn btn-default btn-head-bg'}, {label: 'post', cssClass: 'btn btn-default btn-post-bg'}, {label: 'put', cssClass: 'btn btn-default btn-put-bg'}, {label: 'patch', cssClass: 'btn btn-default btn-patch-bg'}, {label: 'delete', cssClass: 'btn btn-default btn-delete-bg'}], events: {selectedChanged: opt_data.id + ':handleMethodsSelectedChanged_'}, id: opt_data.id + '-methodButtonGroup', minSelected: 1, selected: opt_data.method}, null, opt_ijData)) + '</div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-path" class="form-group"><input type="text" class="form-control" name="path" placeholder="Path" value="' + soy.$$escapeHtmlAttribute(opt_data.path) + '" data-oninput="handleInputPath_" /></div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-handler" class="form-group"><textarea class="form-control" name="handler" placeholder="Handler" data-oninput="handleInputHandler_">' + soy.$$escapeHtmlRcdata(opt_data.handler) + '</textarea></div>');
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
  var paramList54 = opt_data.parameters;
  var paramListLen54 = paramList54.length;
  for (var paramIndex54 = 0; paramIndex54 < paramListLen54; paramIndex54++) {
    var paramData54 = paramList54[paramIndex54];
    output += Templates.ApiBuilder.param({index: paramIndex54, param: paramData54}, null, opt_ijData);
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
  var output = '<div class="row form-group api-builder-param" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '" data-onchange="handleChangeParam_" data-oninput="handleInputParam_"><div class="col-xs-2"><input type="text" class="form-control" placeholder="Param" value="' + soy.$$escapeHtmlAttribute(opt_data.param.name) + '" data-name="name" /></div><div class="col-xs-2">';
  var types__soy66 = ['number', 'string', 'boolean', 'array', 'object'];
  output += '<select type="text" class="form-control" data-name="type">';
  var typeList68 = types__soy66;
  var typeListLen68 = typeList68.length;
  for (var typeIndex68 = 0; typeIndex68 < typeListLen68; typeIndex68++) {
    var typeData68 = typeList68[typeIndex68];
    output += '<option value="' + soy.$$escapeHtmlAttribute(typeData68) + '"' + soy.$$filterHtmlAttributes(typeData68 == opt_data.param.type ? 'selected' : '') + '>' + soy.$$escapeHtml(typeData68) + '</option>';
  }
  output += '</select></div><div class="col-xs-2">';
  var value__soy78 = opt_data.param.value ? opt_data.param.value : '';
  output += '<input type="text" class="form-control" placeholder="Value" value="' + soy.$$escapeHtmlAttribute(value__soy78) + '" data-name="value" /></div><div class="col-xs-2"><select type="text" class="form-control" data-name="in"><option value="body">Body</option><option value="url"' + soy.$$filterHtmlAttributes(opt_data.param['in'] == 'url' ? 'selected' : '') + '>URL Param</option></select></div><div class="col-xs-2">';
  var description__soy84 = opt_data.param.description ? opt_data.param.description : '';
  output += '<input type="text" class="form-control" placeholder="Description" value="' + soy.$$escapeHtmlAttribute(description__soy84) + '" data-name="description" /></div><div class="col-xs-2"><label><input type="checkbox" ' + soy.$$filterHtmlAttributes(opt_data.param.required ? 'checked' : '') + ' data-name="required" /> Required</label><button type="button" class="close" data-onclick="handleClickRemoveParam_" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '"><span aria-hidden="true">&times;</span></button></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiBuilder.param.soyTemplateName = 'Templates.ApiBuilder.param';
}

Templates.ApiBuilder.content.params = ["id"];
Templates.ApiBuilder.name.params = ["id","name"];
Templates.ApiBuilder.description.params = ["id","description"];
Templates.ApiBuilder.methods.params = ["id","method"];
Templates.ApiBuilder.path.params = ["id","path"];
Templates.ApiBuilder.handler.params = ["id","handler"];
Templates.ApiBuilder.params.params = ["id","parameters"];
Templates.ApiBuilder.param.private = true;
export default Templates.ApiBuilder;
/* jshint ignore:end */
