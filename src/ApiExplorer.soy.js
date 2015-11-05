/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
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
    var methodNameList259 = opt_data.method;
    var methodNameListLen259 = methodNameList259.length;
    for (var methodNameIndex259 = 0; methodNameIndex259 < methodNameListLen259; methodNameIndex259++) {
      var methodNameData259 = methodNameList259[methodNameIndex259];
      output += '<span class="explorer-title-label label label-sm http-' + soy.$$escapeHtmlAttribute(methodNameData259) + '-bg">' + soy.$$escapeHtml(methodNameData259) + '</span>';
    }
  }
  var dataEnabled__soy266 = opt_data.data || ! (opt_data.data != null);
  output += '<span class="explorer-data  show-tooltip" alt="When data is enabled your API becomes a RESTful database that can store and sync data in realtime"><span class="explorer-data-icon ' + soy.$$escapeHtmlAttribute(dataEnabled__soy266 ? 'icon-12-check' : 'icon-12-close-short') + '"></span><span class="explorer-data-label">Data</span></span>';
  var visible__soy270 = opt_data.visibility || ! (opt_data.visibility != null);
  output += '<span class="explorer-title-name">' + soy.$$escapeHtml(opt_data.title ? opt_data.title : opt_data.path) + '</span><span class="explorer-visibility show-tooltip" alt="When your API is marked as \'visible\' it means that it can be requested by anyone, whereas \'invisible\' acts like a firewall where only your server can request it"><span class="explorer-visibility-icon ' + soy.$$escapeHtmlAttribute(visible__soy270 ? 'icon-12-check' : 'icon-12-close-short') + '"></span><span class="explorer-visibility-label">' + soy.$$escapeHtml(visible__soy270 ? 'Visible' : 'Invisible') + '</span></span></p>';
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
      var roleList292 = opt_data.auth.roles;
      var roleListLen292 = roleList292.length;
      for (var roleIndex292 = 0; roleIndex292 < roleListLen292; roleIndex292++) {
        var roleData292 = roleList292[roleIndex292];
        output += '<span class="label label-primary"><span class="label-icon icon-12-person"></span> ' + soy.$$escapeHtml(roleData292) + '</span>';
      }
    }
    if (opt_data.auth.permissions) {
      var permissionList299 = opt_data.auth.permissions;
      var permissionListLen299 = permissionList299.length;
      for (var permissionIndex299 = 0; permissionIndex299 < permissionListLen299; permissionIndex299++) {
        var permissionData299 = permissionList299[permissionIndex299];
        output += '<span class="label label-success"><span class="label-icon icon-12-check"></span> ' + soy.$$escapeHtml(permissionData299) + '</span>';
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
    var paramList311 = opt_data.parameters;
    var paramListLen311 = paramList311.length;
    for (var paramIndex311 = 0; paramIndex311 < paramListLen311; paramIndex311++) {
      var paramData311 = paramList311[paramIndex311];
      output += '<tr><td>' + soy.$$escapeHtml(paramData311.name) + '</td><td>' + soy.$$escapeHtml(paramData311.description ? paramData311.description : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData311.type ? paramData311.type : '') + '</td><td class="text-center">' + soy.$$escapeHtml(paramData311.value ? paramData311.value : '') + '</td><td class="text-center">' + ((paramData311.required) ? '<span class="explorer-icon-required icon-16-confirm"></span>' : '') + '</td></tr>';
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
    var paramList333 = opt_data.parameters;
    var paramListLen333 = paramList333.length;
    for (var paramIndex333 = 0; paramIndex333 < paramListLen333; paramIndex333++) {
      var paramData333 = paramList333[paramIndex333];
      output += '<div class="col-md-3"><label for="explorer-param-' + soy.$$escapeHtmlAttribute(paramData333.name) + '" class="api-section-label">' + soy.$$escapeHtml(paramData333.name) + ' ' + ((paramData333.required) ? '<span class="explorer-icon-required">*</span>' : '') + '</label><input id="explorer-param-' + soy.$$escapeHtmlAttribute(paramData333.name) + '" name="' + soy.$$escapeHtmlAttribute(paramData333.name) + '" class="form-control explorer-section-try-param" type="text" autocomplete="off" placeholder="' + soy.$$escapeHtmlAttribute(paramData333.value ? paramData333.value : '') + '" data-index="' + soy.$$escapeHtmlAttribute(paramIndex333) + '" data-oninput="handleParamInput_" ></div>';
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
  var methodItems__soy369 = opt_data.method ? opt_data.method : ['get'];
  var selectedIndex__soy370 = opt_data.methodSelectedIndex ? opt_data.methodSelectedIndex : 0;
  output += '<div class="col-md-12"><div class="input-group">' + ((methodItems__soy369.length > 1) ? '<div class="input-group-btn">' + soy.$$escapeHtml(Templates.Select.content({events: {selectedIndexChanged: opt_data.id + ':handleMethodSelectedIndexChanged_'}, id: opt_data.id + '-methodSelect', label: '', items: methodItems__soy369, buttonClass: 'btn btn-default btn-sm dropdown-select-group-left', hiddenFieldName: 'method', selectedIndex: selectedIndex__soy370}, null, opt_ijData)) + '</div>' : '<div class="input-group-addon explorer-section-try-method">' + soy.$$escapeHtml(methodItems__soy369[0]) + '</div>') + '<div class="input-inner-addon input-inner-addon-left"><button data-clipboard data-target="#explorer-section-try-input" class="explorer-section-try-icon btn-transparent icon-16-link" type="button"></button><input id="explorer-section-try-input" class="form-control" type="text" value="' + soy.$$escapeHtmlAttribute(opt_data.host ? opt_data.host : '') + soy.$$escapeHtmlAttribute(opt_data.replacedPath ? opt_data.replacedPath : '') + '" readonly></div><div class="input-group-btn"><button class="btn btn-sm btn-accent explorer-section-try-button" type="button" data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleClickRun_">Run</button></div></div></div></div>';
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-tryResponse" class="row">';
  var visible__soy423 = opt_data.response && opt_data.response.statusText;
  output += '<div class="explorer-section-response col-md-12' + soy.$$escapeHtmlAttribute(visible__soy423 ? '' : ' hidden') + '"><label class="api-section-label">Response</label><div class="explorer-status-container"><div class="row"><div class="col-md-4"><span class="explorer-status-streaming"><span class="explorer-status-streaming-pulse"></span> Streaming results...</span></div><div class="col-md-4">';
  var statusCode__soy427 = opt_data.response ? opt_data.response.statusCode : 0;
  var statusText__soy428 = opt_data.response ? opt_data.response.statusText : '';
  output += '<span class="explorer-status explorer-status-' + soy.$$escapeHtmlAttribute(Math.floor(statusCode__soy427 / 100)) + 'xx">' + soy.$$escapeHtml(statusCode__soy427) + ' ' + soy.$$escapeHtml(statusText__soy428) + '</span></div>';
  var methodItems__soy436 = opt_data.method ? opt_data.method : ['get'];
  var selectedIndex__soy437 = opt_data.methodSelectedIndex ? opt_data.methodSelectedIndex : 0;
  output += Templates.ApiExplorer.tryRealTime({id: opt_data.id, methodName: methodItems__soy436[selectedIndex__soy437], surfaceId: 'tryRealTime'}, null, opt_ijData) + '</div></div><div class="explorer-code-container">' + soy.$$escapeHtml(Templates.CodeMirror.content({id: opt_data.id + '-responseCodeMirror', visible: visible__soy423}, null, opt_ijData)) + '</div></div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ApiExplorer.tryResponse.soyTemplateName = 'Templates.ApiExplorer.tryResponse';
}

Templates.ApiExplorer.content.params = ["id"];
Templates.ApiExplorer.title.params = ["data","id","method","path","title","visibility"];
Templates.ApiExplorer.description.params = ["id","description"];
Templates.ApiExplorer.auth.params = ["id","auth"];
Templates.ApiExplorer.params.params = ["id","parameters"];
Templates.ApiExplorer.tryParams.params = ["id","parameters","path"];
Templates.ApiExplorer.tryBody.params = ["id"];
Templates.ApiExplorer.tryIt.params = ["host","id","method","methodSelectedIndex","replacedPath"];
Templates.ApiExplorer.tryRealTime.params = ["id","methodName"];
Templates.ApiExplorer.trySnippets.params = ["id"];
Templates.ApiExplorer.tryResponse.params = ["id","method","methodSelectedIndex","response"];

class ApiExplorer extends Component {
  static setImpl(ctor) {
    ComponentRegistry.register(ctor, 'ApiExplorer');
  }
}
ApiExplorer.RENDERER = SoyRenderer;
ApiExplorer.setImpl(ApiExplorer);
SoyAop.registerTemplates('ApiExplorer');
export default ApiExplorer;
/* jshint ignore:end */
