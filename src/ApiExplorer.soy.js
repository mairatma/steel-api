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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="explorer component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.ApiExplorer.title(opt_data, null, opt_ijData) + Templates.ApiExplorer.description(opt_data, null, opt_ijData) + Templates.ApiExplorer.auth(opt_data, null, opt_ijData) + Templates.ApiExplorer.params(opt_data, null, opt_ijData) + '<p class="api-section-title">Try it out</p><div class="explorer-section-try"><form>' + Templates.ApiExplorer.tryParams(opt_data, null, opt_ijData) + Templates.ApiExplorer.tryBody(opt_data, null, opt_ijData) + Templates.ApiExplorer.tryIt(opt_data, null, opt_ijData) + Templates.ApiExplorer.tryResponse(opt_data, null, opt_ijData) + Templates.ApiExplorer.trySnippets(opt_data, null, opt_ijData) + '</form></div></div>');
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
    var methodNameList249 = opt_data.method;
    var methodNameListLen249 = methodNameList249.length;
    for (var methodNameIndex249 = 0; methodNameIndex249 < methodNameListLen249; methodNameIndex249++) {
      var methodNameData249 = methodNameList249[methodNameIndex249];
      output += '<span class="explorer-title-label label label-sm http-' + soy.$$escapeHtmlAttribute(methodNameData249) + '-bg">' + soy.$$escapeHtml(methodNameData249) + '</span>';
    }
  }
  var visible__soy256 = opt_data.visibility || ! (opt_data.visibility != null);
  output += '<span class="explorer-title-name">' + soy.$$escapeHtml(opt_data.title ? opt_data.title : opt_data.path) + '</span><span class="explorer-visibility show-tooltip" alt="When your API is marked as \'visible\' it means that it can be requested by anyone, whereas \'invisible\' acts like a firewall where only your server can request it"><span class="explorer-visibility-icon ' + soy.$$escapeHtmlAttribute(visible__soy256 ? 'icon-12-check' : 'icon-12-close-short') + '"></span><span class="explorer-visibility-label">' + soy.$$escapeHtml(visible__soy256 ? 'Visible' : 'Invisible') + '</span></span></p>';
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
      var roleList278 = opt_data.auth.roles;
      var roleListLen278 = roleList278.length;
      for (var roleIndex278 = 0; roleIndex278 < roleListLen278; roleIndex278++) {
        var roleData278 = roleList278[roleIndex278];
        output += '<span class="label label-primary"><span class="label-icon icon-12-person"></span> ' + soy.$$escapeHtml(roleData278) + '</span>';
      }
    }
    if (opt_data.auth.permissions) {
      var permissionList285 = opt_data.auth.permissions;
      var permissionListLen285 = permissionList285.length;
      for (var permissionIndex285 = 0; permissionIndex285 < permissionListLen285; permissionIndex285++) {
        var permissionData285 = permissionList285[permissionIndex285];
        output += '<span class="label label-success"><span class="label-icon icon-12-check"></span> ' + soy.$$escapeHtml(permissionData285) + '</span>';
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
    var paramList297 = opt_data.parameters;
    var paramListLen297 = paramList297.length;
    for (var paramIndex297 = 0; paramIndex297 < paramListLen297; paramIndex297++) {
      var paramData297 = paramList297[paramIndex297];
      output += '<tr><td>' + soy.$$escapeHtml(paramData297.name) + '</td><td>' + soy.$$escapeHtml(paramData297.description ? paramData297.description : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData297.type ? paramData297.type : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData297.value ? paramData297.value : '') + '</td><td class="text-center">' + ((paramData297.required) ? '<span class="explorer-icon-required icon-16-confirm"></span>' : '') + '</td></tr>';
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
    var paramList319 = opt_data.parameters;
    var paramListLen319 = paramList319.length;
    for (var paramIndex319 = 0; paramIndex319 < paramListLen319; paramIndex319++) {
      var paramData319 = paramList319[paramIndex319];
      output += '<div class="col-md-3"><label for="explorer-param-' + soy.$$escapeHtmlAttribute(paramData319.name) + '" class="api-section-label">' + soy.$$escapeHtml(paramData319.name) + ' ' + ((paramData319.required) ? '<span class="explorer-icon-required">*</span>' : '') + '</label><input id="explorer-param-' + soy.$$escapeHtmlAttribute(paramData319.name) + '" name="' + soy.$$escapeHtmlAttribute(paramData319.name) + '" class="form-control explorer-section-try-param" type="text" autocomplete="off" placeholder="' + soy.$$escapeHtmlAttribute(paramData319.value ? paramData319.value : '') + '" data-index="' + soy.$$escapeHtmlAttribute(paramIndex319) + '" data-oninput="handleParamInput_" ></div>';
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
Templates.ApiExplorer.tryBody = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryBody" class="form-group explorer-section-body-container"><button class="explorer-section-body-toggler btn-transparent" type="button" data-onclick="handleBodyTogglerClick_">Set Body <span class="explorer-section-body-toggler-arrow icon-12-arrow-down-short"></span></button><div class="explorer-section-body">' + soy.$$escapeHtml(Templates.CodeMirror.content({config: {lineNumbers: true, mode: 'javascript'}, id: opt_data.id + '-bodyCodeMirror', visible: false}, null, opt_ijData)) + '</div></div>');
};
if (goog.DEBUG) {
  Templates.ApiExplorer.tryBody.soyTemplateName = 'Templates.ApiExplorer.tryBody';
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
  var methodItems__soy355 = opt_data.method ? opt_data.method : ['get'];
  var selectedIndex__soy356 = opt_data.methodSelectedIndex ? opt_data.methodSelectedIndex : 0;
  output += '<div class="col-md-12"><div class="input-group">' + ((methodItems__soy355.length > 1) ? '<div class="input-group-btn">' + soy.$$escapeHtml(Templates.Select.content({events: {selectedIndexChanged: opt_data.id + ':handleMethodSelectedIndexChanged_'}, id: opt_data.id + '-methodSelect', label: '', items: methodItems__soy355, buttonClass: 'btn btn-default btn-sm dropdown-select-group-left', hiddenFieldName: 'method', selectedIndex: selectedIndex__soy356}, null, opt_ijData)) + '</div>' : '<div class="input-group-addon explorer-section-try-method">' + soy.$$escapeHtml(methodItems__soy355[0]) + '</div>') + '<div class="input-inner-addon input-inner-addon-left"><button data-clipboard data-target="#explorer-section-try-input" class="explorer-section-try-icon btn-transparent icon-16-link" type="button"></button><input id="explorer-section-try-input" class="form-control" type="text" value="' + soy.$$escapeHtmlAttribute(opt_data.host ? opt_data.host : '') + soy.$$escapeHtmlAttribute(opt_data.replacedPath ? opt_data.replacedPath : '') + '" readonly></div><div class="input-group-btn"><button class="btn btn-sm btn-accent explorer-section-try-button" type="button" data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleClickRun_">Run</button></div></div></div></div>';
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryRealTime" class="explorer-real-time-container col-md-4 ' + soy.$$escapeHtmlAttribute(opt_data.methodName == 'get' ? '' : ' hidden') + '"><span class="explorer-real-time-label">Real Time</span>' + soy.$$escapeHtml(Templates.Switcher.content({events: {checkedChanged: opt_data.id + ':handleRealTimeCheckedChanged_'}, id: opt_data.id + '-realTimeSwitcher'}, null, opt_ijData)) + '</div>');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-trySnippets" class="row' + soy.$$escapeHtmlAttribute(opt_data.response && opt_data.response.statusText ? '' : ' hidden') + '"><div class="explorer-section-snippets col-md-12"><label class="api-section-label">Snippets</label>' + soy.$$escapeHtml(Templates.CodeMirrorTabs.content({config: {readOnly: true}, events: {selectedTabIndexChanged: opt_data.id + ':updateSnippet_'}, extraHeaderContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<button class="explorer-section-snippets-copy btn btn-default" type="button">Copy</button>'), id: opt_data.id + '-snippetsCodeMirror', tabs: ['JavaScript', 'Java', 'cURL'], visible: false}, null, opt_ijData)) + '</div></div>');
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryResponse" class="row"><div class="explorer-section-response col-md-12' + soy.$$escapeHtmlAttribute(opt_data.response && opt_data.response.statusText ? '' : ' hidden') + '"><label class="api-section-label">Response</label><div class="explorer-status-container"><div class="row"><div class="col-md-4"><span class="explorer-status-streaming"><span class="explorer-status-streaming-pulse"></span> Streaming results...</span></div><div class="col-md-4">';
  var statusCode__soy411 = opt_data.response ? opt_data.response.statusCode : 0;
  var statusText__soy412 = opt_data.response ? opt_data.response.statusText : '';
  output += '<span class="explorer-status explorer-status-' + soy.$$escapeHtmlAttribute(Math.floor(statusCode__soy411 / 100)) + 'xx">' + soy.$$escapeHtml(statusCode__soy411) + ' ' + soy.$$escapeHtml(statusText__soy412) + '</span></div>';
  var methodItems__soy420 = opt_data.method ? opt_data.method : ['get'];
  var selectedIndex__soy421 = opt_data.methodSelectedIndex ? opt_data.methodSelectedIndex : 0;
  output += Templates.ApiExplorer.tryRealTime({id: opt_data.id, methodName: methodItems__soy420[selectedIndex__soy421], surfaceId: 'tryRealTime'}, null, opt_ijData) + '</div></div><div class="explorer-code-container">' + soy.$$escapeHtml(Templates.CodeMirror.content({id: opt_data.id + '-responseCodeMirror', visible: false}, null, opt_ijData)) + '</div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
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
Templates.ApiExplorer.tryBody.params = ["id"];
Templates.ApiExplorer.tryIt.params = ["host","id","method","methodSelectedIndex","replacedPath"];
Templates.ApiExplorer.tryRealTime.params = ["id","methodName"];
Templates.ApiExplorer.trySnippets.params = ["id"];
Templates.ApiExplorer.tryResponse.params = ["id","method","methodSelectedIndex","response"];
export default Templates.ApiExplorer;
/* jshint ignore:end */
