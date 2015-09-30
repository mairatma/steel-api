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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="explorer component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiExplorer.title(opt_data, null, opt_ijData) + Templates.ApiExplorer.description(opt_data, null, opt_ijData) + Templates.ApiExplorer.auth(opt_data, null, opt_ijData) + Templates.ApiExplorer.params(opt_data, null, opt_ijData) + '<p class="api-section-title">Try it out</p><div class="explorer-section-try"><form>' + Templates.ApiExplorer.tryParams(opt_data, null, opt_ijData) + Templates.ApiExplorer.tryIt(opt_data, null, opt_ijData) + Templates.ApiExplorer.trySnippets(opt_data, null, opt_ijData) + Templates.ApiExplorer.tryResponse(opt_data, null, opt_ijData) + '</form></div></div>');
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
    var methodNameList245 = opt_data.method;
    var methodNameListLen245 = methodNameList245.length;
    for (var methodNameIndex245 = 0; methodNameIndex245 < methodNameListLen245; methodNameIndex245++) {
      var methodNameData245 = methodNameList245[methodNameIndex245];
      output += '<span class="explorer-title-label label label-sm http-' + soy.$$escapeHtmlAttribute(methodNameData245) + '-bg">' + soy.$$escapeHtml(methodNameData245) + '</span>';
    }
  }
  var visible__soy252 = opt_data.visibility || ! (opt_data.visibility != null);
  output += '<span class="explorer-title-name">' + soy.$$escapeHtml(opt_data.title ? opt_data.title : opt_data.path) + '</span><span class="explorer-visibility show-tooltip" alt="When your API is marked as \'visible\' it means that it can be requested by anyone, whereas \'invisible\' acts like a firewall where only your server can request it"><span class="explorer-visibility-icon ' + soy.$$escapeHtmlAttribute(visible__soy252 ? 'icon-12-check' : 'icon-12-close-short') + '"></span><span class="explorer-visibility-label">' + soy.$$escapeHtml(visible__soy252 ? 'Visible' : 'Invisible') + '</span></span></p>';
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
      var roleList274 = opt_data.auth.roles;
      var roleListLen274 = roleList274.length;
      for (var roleIndex274 = 0; roleIndex274 < roleListLen274; roleIndex274++) {
        var roleData274 = roleList274[roleIndex274];
        output += '<span class="label label-primary"><span class="label-icon icon-12-person"></span> ' + soy.$$escapeHtml(roleData274) + '</span>';
      }
    }
    if (opt_data.auth.permissions) {
      var permissionList281 = opt_data.auth.permissions;
      var permissionListLen281 = permissionList281.length;
      for (var permissionIndex281 = 0; permissionIndex281 < permissionListLen281; permissionIndex281++) {
        var permissionData281 = permissionList281[permissionIndex281];
        output += '<span class="label label-success"><span class="label-icon icon-12-check"></span> ' + soy.$$escapeHtml(permissionData281) + '</span>';
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
    var paramList293 = opt_data.parameters;
    var paramListLen293 = paramList293.length;
    for (var paramIndex293 = 0; paramIndex293 < paramListLen293; paramIndex293++) {
      var paramData293 = paramList293[paramIndex293];
      output += '<tr><td>' + soy.$$escapeHtml(paramData293.name) + '</td><td>' + soy.$$escapeHtml(paramData293.description ? paramData293.description : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData293.type ? paramData293.type : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData293.value ? paramData293.value : '') + '</td><td class="text-center">' + ((paramData293.required) ? '<span class="explorer-icon-required icon-16-confirm"></span>' : '') + '</td></tr>';
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
    var paramList315 = opt_data.parameters;
    var paramListLen315 = paramList315.length;
    for (var paramIndex315 = 0; paramIndex315 < paramListLen315; paramIndex315++) {
      var paramData315 = paramList315[paramIndex315];
      output += '<div class="col-md-3"><label for="explorer-param-' + soy.$$escapeHtmlAttribute(paramData315.name) + '" class="api-section-label">' + soy.$$escapeHtml(paramData315.name) + ' ' + ((paramData315.required) ? '<span class="explorer-icon-required">*</span>' : '') + '</label><input id="explorer-param-' + soy.$$escapeHtmlAttribute(paramData315.name) + '" name="' + soy.$$escapeHtmlAttribute(paramData315.name) + '" class="form-control explorer-section-try-param" type="text" autocomplete="off" placeholder="' + soy.$$escapeHtmlAttribute(paramData315.value ? paramData315.value : '') + '" data-index="' + soy.$$escapeHtmlAttribute(paramIndex315) + '" data-oninput="handleParamInput_" ></div>';
    }
  }
  output += ((('' + opt_data.path).indexOf('/*') != -1) ? '<div class="col-md-3"><label for="explorer-param-wildcard" class="api-section-label">Wildcard</label><input id="explorer-param-wildcard" name="Wildcard" class="form-control explorer-section-try-param" type="text" autocomplete="off" data-oninput="handleWildcardInput_" ></div>' : '') + '</div>';
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryIt" class="row">';
  var methodItems__soy342 = opt_data.method ? opt_data.method : ['get'];
  var selectedIndex__soy343 = opt_data.methodSelectedIndex ? opt_data.methodSelectedIndex : 0;
  output += '<div class="col-md-12"><div class="input-group">' + ((methodItems__soy342.length > 1) ? '<div class="input-group-btn">' + soy.$$escapeHtml(Templates.Select.content({events: {selectedIndexChanged: opt_data.id + ':handleMethodSelectedIndexChanged_'}, id: opt_data.id + '-methodSelect', label: '', items: methodItems__soy342, buttonClass: 'btn btn-default btn-sm dropdown-select-group-left', hiddenFieldName: 'method', selectedIndex: selectedIndex__soy343}, null, opt_ijData)) + '</div>' : '<div class="input-group-addon explorer-section-try-method">' + soy.$$escapeHtml(methodItems__soy342[0]) + '</div>') + '<div class="input-inner-addon input-inner-addon-left"><button data-clipboard data-target="explorer-section-try-input" class="explorer-section-try-icon btn-transparent icon-16-link" type="button"></button><input id="explorer-section-try-input" class="form-control" type="text" value="' + soy.$$escapeHtmlAttribute(opt_data.host ? opt_data.host : '') + soy.$$escapeHtmlAttribute(opt_data.replacedPath ? opt_data.replacedPath : '') + '" readonly></div><div class="input-group-btn"><button class="btn btn-sm btn-accent explorer-section-try-button" type="button" data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleClickRun_">Run</button></div><div class="input-group-btn">' + Templates.ApiExplorer.tryRealTime({id: opt_data.id, methodName: methodItems__soy342[selectedIndex__soy343], surfaceId: 'tryRealTime'}, null, opt_ijData) + '</div></div></div></div>';
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
Templates.ApiExplorer.tryRealTime = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryRealTime" class="' + soy.$$escapeHtmlAttribute(opt_data.methodName == 'get' ? '' : ' hidden') + '"><p class="api-section-title">Real Time</p>' + soy.$$escapeHtml(Templates.Switcher.content({events: {checkedChanged: opt_data.id + ':handleRealTimeCheckedChanged_'}, id: opt_data.id + '-realTimeSwitcher'}, null, opt_ijData)) + '</span>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.tryRealTime.soyTemplateName = 'Templates.ApiExplorer.tryRealTime';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.trySnippets = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-trySnippets" class="row"><div class="explorer-section-snippets col-md-12"><label class="api-section-label">Snippets</label><div class="explorer-snippets-container"><p class="api-section-title">JavaScript</p><textarea></textarea></div></div></div>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.trySnippets.soyTemplateName = 'Templates.ApiExplorer.trySnippets';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ApiExplorer.tryResponse = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryResponse" class="row">' + ((opt_data.response) ? '<div class="explorer-section-response col-md-12"><label class="api-section-label">Results</label><div class="explorer-status-container"><span class="explorer-status-streaming">Streaming results...</span><span class="explorer-status explorer-status-' + soy.$$escapeHtmlAttribute(Math.floor(opt_data.response.statusCode / 100)) + 'xx">' + soy.$$escapeHtml(opt_data.response.statusCode) + ' ' + soy.$$escapeHtml(opt_data.response.statusText) + '</span></div>' + ((opt_data.response.bodyString) ? '<div class="explorer-code-container"><textarea>' + soy.$$escapeHtmlRcdata(opt_data.response.bodyString) + '</textarea></div>' : '') + '</div>' : '') + '</div>');
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
Templates.ApiExplorer.tryIt.params = ["host","id","method","methodSelectedIndex","replacedPath"];
Templates.ApiExplorer.tryRealTime.params = ["id","methodName"];
Templates.ApiExplorer.trySnippets.params = ["id"];
Templates.ApiExplorer.tryResponse.params = ["id","response"];
export default Templates.ApiExplorer;
/* jshint ignore:end */
