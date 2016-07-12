/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from ApiBuilder.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ApiBuilder.
 * @public
 */

goog.module('ApiBuilder.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;

var $templateAlias2 = Soy.getTemplate('ButtonGroup.incrementaldom', 'render');

var $templateAlias4 = Soy.getTemplate('Dropdown.incrementaldom', 'render');

var $templateAlias3 = Soy.getTemplate('Select.incrementaldom', 'render');

var $templateAlias1 = Soy.getTemplate('Switcher.incrementaldom', 'render');


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  var $$temp;
  ie_open('div', null, null,
      'class', 'builder ' + (($$temp = opt_data.elementClasses) == null ? '' : $$temp));
    $title(opt_data, null, opt_ijData);
    $description(opt_data, null, opt_ijData);
    $methods(opt_data, null, opt_ijData);
    $path(opt_data, null, opt_ijData);
    $params(opt_data, null, opt_ijData);
    $body(opt_data, null, opt_ijData);
    $auth(opt_data, null, opt_ijData);
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'ApiBuilder.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $title(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'builder-title');
    ie_open('input', null, null,
        'type', 'text',
        'class', 'form-control-borderless',
        'name', 'title',
        'placeholder', 'add a title...',
        'value', opt_data.title ? opt_data.title : '',
        'autocomplete', 'off',
        'autofocus', '',
        'data-oninput', 'handleInputTitle_');
    ie_close('input');
    ie_open('div', null, null,
        'class', 'builder-data show-tooltip',
        'alt', 'When data is enabled your API becomes a RESTful database that can store and sync data in realtime');
      ie_open('div', null, null,
          'class', 'builder-data-switcher');
        $templateAlias1({checked: opt_data.data != null ? opt_data.data : true, events: {checkedChanged: opt_data.handleDataSwitcherCheckedChanged_}, ref: 'dataSwitcher'}, null, opt_ijData);
      ie_close('div');
      ie_open('span', null, null,
          'class', 'builder-data-label');
        itext('Data');
      ie_close('span');
    ie_close('div');
    ie_open('div', null, null,
        'class', 'builder-visibility show-tooltip',
        'alt', 'When your API is marked as \'visible\' it means that it can be requested by anyone, whereas \'invisible\' acts like a firewall where only your server can request it');
      ie_open('div', null, null,
          'class', 'builder-visibility-switcher');
        $templateAlias1({checked: opt_data.visibility != null ? opt_data.visibility : true, events: {checkedChanged: opt_data.handleVisibilitySwitcherCheckedChanged_}, ref: 'visibilitySwitcher'}, null, opt_ijData);
      ie_close('div');
      ie_open('span', null, null,
          'class', 'builder-visibility-label');
        itext('Visibility');
      ie_close('span');
    ie_close('div');
  ie_close('div');
}
exports.title = $title;
if (goog.DEBUG) {
  $title.soyTemplateName = 'ApiBuilder.title';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $description(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'builder-description');
    ie_open('textarea', null, null,
        'class', 'form-control-borderless',
        'name', 'description',
        'placeholder', 'add a description...',
        'autocomplete', 'off',
        'data-oninput', 'handleInputDescription_');
      itext((goog.asserts.assert((opt_data.description ? opt_data.description : '') != null), opt_data.description ? opt_data.description : ''));
    ie_close('textarea');
  ie_close('div');
}
exports.description = $description;
if (goog.DEBUG) {
  $description.soyTemplateName = 'ApiBuilder.description';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $methods(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'api-builder-methods');
    ie_open('p', null, null,
        'class', 'api-section-title');
      itext('Method ');
      ie_open('a', null, null,
          'class', 'api-section-title-link show-tooltip',
          'alt', 'Learn more',
          'target', '_blank',
          'href', '/docs/js/building-apis.html#1-method');
        ie_void('span', null, null,
            'class', 'icon-12-external');
      ie_close('a');
    ie_close('p');
    $templateAlias2({buttons: [{label: 'get', cssClass: 'btn btn-default http-get-bg', icon: 'btn-group-icon icon-12-check'}, {label: 'post', cssClass: 'btn btn-default http-post-bg', icon: 'btn-group-icon icon-12-check'}, {label: 'put', cssClass: 'btn btn-default http-put-bg', icon: 'btn-group-icon icon-12-check'}, {label: 'patch', cssClass: 'btn btn-default http-patch-bg', icon: 'btn-group-icon icon-12-check'}, {label: 'delete', cssClass: 'btn btn-default http-delete-bg', icon: 'btn-group-icon icon-12-check'}], events: {selectedChanged: opt_data.handleMethodsSelectedChanged_}, ref: 'methodButtonGroup', minSelected: 1, selected: opt_data.method ? opt_data.method : ['get']}, null, opt_ijData);
  ie_close('div');
}
exports.methods = $methods;
if (goog.DEBUG) {
  $methods.soyTemplateName = 'ApiBuilder.methods';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $path(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'builder-path');
    ie_open('p', null, null,
        'class', 'api-section-title');
      itext('Endpoint ');
      ie_open('a', null, null,
          'class', 'api-section-title-link show-tooltip',
          'alt', 'Learn more',
          'target', '_blank',
          'href', '/docs/js/building-apis.html#2-endpoint');
        ie_void('span', null, null,
            'class', 'icon-12-external');
      ie_close('a');
    ie_close('p');
    ie_open('div', null, null,
        'class', 'form-group');
      ie_open('div', null, null,
          'class', 'input-group');
        ie_open('div', null, null,
            'class', 'input-group-addon');
          itext((goog.asserts.assert((opt_data.host ? opt_data.host : '') != null), opt_data.host ? opt_data.host : ''));
        ie_close('div');
        ie_open('div', null, null,
            'class', 'input-inner-addon input-inner-addon-left');
          ie_void('span', null, null,
              'class', 'input-inner-icon-helper icon-16-info show-tooltip',
              'alt', 'The endpoint could provide different capabilities to make your service more flexible. Visit the learn section for more information.');
          ie_open('input', null, null,
              'type', 'text',
              'class', 'input-group-addon-input form-control',
              'name', 'path',
              'placeholder', '/new-api',
              'value', opt_data.path ? opt_data.path : '',
              'data-oninput', 'handleInputPath_');
          ie_close('input');
        ie_close('div');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.path = $path;
if (goog.DEBUG) {
  $path.soyTemplateName = 'ApiBuilder.path';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $body(opt_data, opt_ignored, opt_ijData) {
  ie_open('div');
    ie_open('p', null, null,
        'class', 'api-section-title');
      itext('Body ');
      ie_open('a', null, null,
          'class', 'api-section-title-link show-tooltip',
          'alt', 'Learn more',
          'target', '_blank',
          'href', '/docs/js/building-apis.html#4-body');
        ie_void('span', null, null,
            'class', 'icon-12-external');
      ie_close('a');
    ie_close('p');
    ie_open('div', null, null,
        'class', 'builder-section-body');
      $param({handleDuplicateParamClick_: opt_data.handleDuplicateParamClick_, handleRemoveParamClick_: opt_data.handleRemoveParamClick_, handleRequiredCheckedChanged_: opt_data.handleRequiredCheckedChanged_, handleTypeSelectedIndexChanged_: opt_data.handleTypeSelectedIndexChanged_, index: -1, param: opt_data.body ? opt_data.body : []}, null, opt_ijData);
    ie_close('div');
  ie_close('div');
}
exports.body = $body;
if (goog.DEBUG) {
  $body.soyTemplateName = 'ApiBuilder.body';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $params(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'builder-params');
    ie_open('p', null, null,
        'class', 'api-section-title');
      itext('Parameters ');
      ie_open('a', null, null,
          'class', 'api-section-title-link show-tooltip',
          'alt', 'Learn more',
          'target', '_blank',
          'href', '/docs/js/building-apis.html#3-parameters');
        ie_void('span', null, null,
            'class', 'icon-12-external');
      ie_close('a');
    ie_close('p');
    ie_open('div', null, null,
        'class', 'builder-section-params');
      if (opt_data.parameters) {
        var paramList78 = opt_data.parameters;
        var paramListLen78 = paramList78.length;
        for (var paramIndex78 = 0; paramIndex78 < paramListLen78; paramIndex78++) {
          var paramData78 = paramList78[paramIndex78];
          $param({handleDuplicateParamClick_: opt_data.handleDuplicateParamClick_, handleRemoveParamClick_: opt_data.handleRemoveParamClick_, handleRequiredCheckedChanged_: opt_data.handleRequiredCheckedChanged_, handleTypeSelectedIndexChanged_: opt_data.handleTypeSelectedIndexChanged_, index: paramIndex78, param: paramData78}, null, opt_ijData);
        }
      }
      ie_open('div', null, null,
          'class', 'builder-param-more row');
        ie_open('div', null, null,
            'class', 'col-md-16');
          ie_open('button', null, null,
              'class', 'btn btn-default btn-sm',
              'data-onclick', 'handleClickAddParam_');
            ie_void('span', null, null,
                'class', 'icon-16-plus');
            itext(' Add Parameter');
          ie_close('button');
        ie_close('div');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.params = $params;
if (goog.DEBUG) {
  $params.soyTemplateName = 'ApiBuilder.params';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $param(opt_data, opt_ignored, opt_ijData) {
  var isBody__soy82 = opt_data.index == -1;
  var suffix__soy83 = isBody__soy82 ? 'Body' : opt_data.index;
  ie_open('div', null, null,
      'class', 'builder-param-item',
      'data-index', opt_data.index,
      'data-oninput', 'handleInputParam_');
    ie_open('div', null, null,
        'class', 'row builder-param-item-row');
      if (! isBody__soy82) {
        ie_open('div', null, null,
            'class', 'col-md-6');
          ie_open('label', null, null,
              'class', 'api-section-label',
              'for', 'builder-param-name-' + suffix__soy83);
            itext('Name');
          ie_close('label');
          ie_open('input', null, null,
              'id', 'builder-param-name-' + suffix__soy83,
              'type', 'text',
              'class', 'form-control',
              'placeholder', 'Parameter',
              'value', opt_data.param.name,
              'data-name', 'name');
          ie_close('input');
        ie_close('div');
      }
      ie_open('div', null, null,
          'class', 'col-md-6');
        ie_open('label', null, null,
            'class', 'api-section-label',
            'for', 'builder-param-type-' + suffix__soy83);
          itext('Type');
        ie_close('label');
        var typesMap0__soy99 = {'any': 0, 'array': 1, 'boolean': 2, 'number': 3, 'object': 4, 'string': 5};
        var param104 = function() {
          itext('Type');
        };
        $templateAlias3({ref: 'builder-param-type-' + suffix__soy83, buttonClass: 'btn btn-default form-control dropdown-select', events: {selectedIndexChanged: opt_data.handleTypeSelectedIndexChanged_}, items: ['Any', 'Array', 'Boolean', 'Number', 'Object', 'String'], label: param104, selectedIndex: opt_data.param.type ? typesMap0__soy99[opt_data.param.type] : 0}, null, opt_ijData);
      ie_close('div');
      ie_open('div', null, null,
          'class', 'col-md-3');
        ie_open('span', null, null,
            'class', 'builder-param-label');
          itext('Required');
        ie_close('span');
        $templateAlias1({checked: opt_data.param.required ? opt_data.param.required : false, events: {checkedChanged: opt_data.handleRequiredCheckedChanged_}, elementClasses: 'builder-param-switcher', ref: 'requiredSwitcher' + suffix__soy83}, null, opt_ijData);
      ie_close('div');
      if (! isBody__soy82) {
        ie_open('div', null, null,
            'class', 'col-md-1 builder-param-actions');
          var param118 = function() {
            ie_open('li', null, null,
                'data-onclick', opt_data.handleDuplicateParamClick_,
                'data-index', opt_data.index);
              ie_open('a', null, null,
                  'href', '#');
                itext('Duplicate');
              ie_close('a');
            ie_close('li');
            ie_open('li', null, null,
                'data-onclick', opt_data.handleRemoveParamClick_,
                'data-index', opt_data.index);
              ie_open('a', null, null,
                  'href', '#');
                itext('Remove');
              ie_close('a');
            ie_close('li');
          };
          var param128 = function() {
            ie_void('button', null, null,
                'class', 'builder-param-ellipsis btn-transparent icon-16-ellipsis',
                'type', 'button',
                'data-onclick', 'toggle');
          };
          $templateAlias4({body: param118, header: param128, ref: 'menu' + suffix__soy83}, null, opt_ijData);
        ie_close('div');
      }
    ie_close('div');
    if (! isBody__soy82) {
      ie_open('div', null, null,
          'class', 'row builder-param-item-row');
        ie_open('div', null, null,
            'class', 'col-md-12');
          ie_open('label', null, null,
              'class', 'api-section-label',
              'for', 'builder-param-description-' + suffix__soy83);
            itext('Description');
          ie_close('label');
          ie_open('input', null, null,
              'id', 'builder-param-description-' + suffix__soy83,
              'type', 'text',
              'class', 'form-control',
              'placeholder', 'Type what this parameter does',
              'value', opt_data.param.description ? opt_data.param.description : '',
              'data-name', 'description');
          ie_close('input');
        ie_close('div');
      ie_close('div');
    }
    ie_open('div', null, null,
        'class', 'builder-param-item-advanced',
        'data-index', opt_data.index);
      ie_open('button', null, null,
          'class', 'builder-param-item-advanced-btn btn-transparent',
          'type', 'button',
          'data-onclick', 'handleAdvancedSetupClick_');
        itext('Advanced Setup ');
        ie_void('span', null, null,
            'class', 'builder-param-item-advanced-arrow icon-12-arrow-down-short');
      ie_close('button');
      if (isBody__soy82) {
        ie_open('div', null, null,
            'class', 'row builder-param-item-row');
          ie_open('div', null, null,
              'class', 'col-md-6');
            ie_open('label', null, null,
                'class', 'api-section-label',
                'for', 'builder-param-description-' + suffix__soy83);
              itext('Description');
            ie_close('label');
            ie_open('input', null, null,
                'id', 'builder-param-description-' + suffix__soy83,
                'type', 'text',
                'class', 'form-control',
                'placeholder', 'Type what should be passed to the body',
                'value', opt_data.param.description ? opt_data.param.description : '',
                'data-name', 'description');
            ie_close('input');
          ie_close('div');
        ie_close('div');
      } else {
        ie_open('div', null, null,
            'class', 'row builder-param-item-row');
          ie_open('div', null, null,
              'class', 'col-md-6');
            ie_open('label', null, null,
                'class', 'api-section-label',
                'for', 'builder-param-value-' + suffix__soy83);
              itext('Value');
            ie_close('label');
            ie_open('div', null, null,
                'class', 'input-inner-addon input-inner-addon-left');
              ie_void('span', null, null,
                  'class', 'input-inner-icon-helper icon-16-info show-tooltip',
                  'alt', 'Define a value that will be injected in the received request');
              ie_open('input', null, null,
                  'id', 'builder-param-value-' + suffix__soy83,
                  'type', 'text',
                  'class', 'form-control',
                  'placeholder', 'What is the default value?',
                  'value', opt_data.param.value ? opt_data.param.value : '',
                  'data-name', 'value');
              ie_close('input');
            ie_close('div');
          ie_close('div');
        ie_close('div');
      }
      ie_open('div', null, null,
          'class', 'row builder-param-item-row');
        ie_open('div', null, null,
            'class', 'col-md-6');
          ie_open('label', null, null,
              'class', 'api-section-label',
              'for', 'builder-param-validator-' + suffix__soy83);
            itext('Validator');
          ie_close('label');
          ie_open('div', null, null,
              'class', 'input-inner-addon input-inner-addon-left');
            ie_void('span', null, null,
                'class', 'input-inner-icon-helper icon-16-info show-tooltip',
                'alt', 'Describe any JavaScript expression to authorize the request. There couple variables that you could use here such as $auth, $params, $values');
            ie_open('input', null, null,
                'type', 'text',
                'class', 'form-control',
                'value', opt_data.param.validator ? opt_data.param.validator : '',
                'data-oninput', 'handleInputValidator_',
                'data-type', suffix__soy83,
                'data-name', 'validator');
            ie_close('input');
          ie_close('div');
        ie_close('div');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.param = $param;
if (goog.DEBUG) {
  $param.soyTemplateName = 'ApiBuilder.param';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $auth(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'form-group');
    ie_open('p', null, null,
        'class', 'api-section-title');
      itext('Authentication ');
      ie_open('a', null, null,
          'class', 'api-section-title-link show-tooltip',
          'alt', 'Learn more',
          'target', '_blank',
          'href', '/docs/js/building-apis.html#6-authentication');
        ie_void('span', null, null,
            'class', 'icon-12-external');
      ie_close('a');
    ie_close('p');
    ie_open('div', null, null,
        'class', 'builder-section-auth');
      ie_open('div', null, null,
          'class', 'builder-section-auth-row');
        if (opt_data.roles && opt_data.roles.length) {
          ie_open('div', null, null,
              'class', 'builder-section-auth-roles');
            ie_open('p', null, null,
                'class', 'api-section-title');
              itext('Roles');
            ie_close('p');
            var roleList188 = opt_data.roles;
            var roleListLen188 = roleList188.length;
            for (var roleIndex188 = 0; roleIndex188 < roleListLen188; roleIndex188++) {
              var roleData188 = roleList188[roleIndex188];
              ie_open('div', null, null,
                  'class', 'builder-param-switcher-container');
                var roleChecked__soy176 = '';
                roleChecked__soy176 += $arrHasItem({array: opt_data.auth.roles, item: roleData188}, null, opt_ijData);
                $templateAlias1({checked: ('' + roleChecked__soy176).indexOf('true') != -1, events: {checkedChanged: opt_data.handleRoleCheckedChanged_}, elementClasses: 'builder-param-switcher', ref: 'rolesSwitcher' + roleData188}, null, opt_ijData);
                ie_open('span', null, null,
                    'class', 'builder-param-label');
                  itext(' ');
                  itext((goog.asserts.assert((roleData188) != null), roleData188));
                ie_close('span');
              ie_close('div');
            }
          ie_close('div');
        }
        if (opt_data.permissions && opt_data.permissions.length) {
          ie_open('div', null, null,
              'class', 'builder-section-auth-permissions');
            ie_open('p', null, null,
                'class', 'api-section-title');
              itext('Permissions');
            ie_close('p');
            var permissionList207 = opt_data.permissions;
            var permissionListLen207 = permissionList207.length;
            for (var permissionIndex207 = 0; permissionIndex207 < permissionListLen207; permissionIndex207++) {
              var permissionData207 = permissionList207[permissionIndex207];
              ie_open('div', null, null,
                  'class', 'builder-param-switcher-container');
                var permissionChecked__soy195 = '';
                permissionChecked__soy195 += $arrHasItem({array: opt_data.auth.permissions, item: permissionData207}, null, opt_ijData);
                $templateAlias1({checked: ('' + permissionChecked__soy195).indexOf('true') != -1, events: {checkedChanged: opt_data.handlePermissionCheckedChanged_}, elementClasses: 'builder-param-switcher', ref: 'permissionsSwitcher' + permissionData207}, null, opt_ijData);
                ie_open('span', null, null,
                    'class', 'builder-param-label');
                  itext(' ');
                  itext((goog.asserts.assert((permissionData207) != null), permissionData207));
                ie_close('span');
              ie_close('div');
            }
          ie_close('div');
        }
      ie_close('div');
      ie_open('label', null, null,
          'class', 'api-section-label',
          'for', 'builder-param-auth-validator');
        itext('Validator');
      ie_close('label');
      ie_open('div', null, null,
          'class', 'input-inner-addon input-inner-addon-left');
        ie_void('span', null, null,
            'class', 'input-inner-icon-helper icon-16-info show-tooltip',
            'alt', 'Describe any JavaScript expression to authorize the request. There couple variables that you could use here such as $auth, $params, $values');
        ie_open('input', null, null,
            'type', 'text',
            'class', 'form-control builder-section-auth-validator',
            'placeholder', '$auth !== null',
            'value', opt_data.auth.validator ? opt_data.auth.validator : '',
            'data-oninput', 'handleInputAuthValidator_');
        ie_close('input');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.auth = $auth;
if (goog.DEBUG) {
  $auth.soyTemplateName = 'ApiBuilder.auth';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {string}
 * @suppress {checkTypes}
 */
function $arrHasItem(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  if (opt_data.array) {
    var arrItemList219 = opt_data.array;
    var arrItemListLen219 = arrItemList219.length;
    for (var arrItemIndex219 = 0; arrItemIndex219 < arrItemListLen219; arrItemIndex219++) {
      var arrItemData219 = arrItemList219[arrItemIndex219];
      output += (opt_data.item == arrItemData219) ? '\'true\'' : '';
    }
  }
  return output;
}
exports.arrHasItem = $arrHasItem;
if (goog.DEBUG) {
  $arrHasItem.soyTemplateName = 'ApiBuilder.arrHasItem';
}

exports.render.params = ["elementClasses","handleDataSwitcherCheckedChanged_","handleMethodsSelectedChanged_","handleVisibilitySwitcherCheckedChanged_","handleDuplicateParamClick_","handleRemoveParamClick_","handleRequiredCheckedChanged_","handleTypeSelectedIndexChanged_","handleRoleCheckedChanged_","handlePermissionCheckedChanged_","parameters"];
exports.render.types = {"elementClasses":"any","handleDataSwitcherCheckedChanged_":"any","handleMethodsSelectedChanged_":"any","handleVisibilitySwitcherCheckedChanged_":"any","handleDuplicateParamClick_":"any","handleRemoveParamClick_":"any","handleRequiredCheckedChanged_":"any","handleTypeSelectedIndexChanged_":"any","handleRoleCheckedChanged_":"any","handlePermissionCheckedChanged_":"any","parameters":"any"};
exports.title.params = ["handleDataSwitcherCheckedChanged_","handleVisibilitySwitcherCheckedChanged_","title","visibility","data"];
exports.title.types = {"handleDataSwitcherCheckedChanged_":"any","handleVisibilitySwitcherCheckedChanged_":"any","title":"any","visibility":"any","data":"any"};
exports.description.params = ["description"];
exports.description.types = {"description":"any"};
exports.methods.params = ["handleMethodsSelectedChanged_","method"];
exports.methods.types = {"handleMethodsSelectedChanged_":"any","method":"any"};
exports.path.params = ["host","path"];
exports.path.types = {"host":"any","path":"any"};
exports.body.params = ["body","handleDuplicateParamClick_","handleRemoveParamClick_","handleRequiredCheckedChanged_","handleTypeSelectedIndexChanged_"];
exports.body.types = {"body":"any","handleDuplicateParamClick_":"any","handleRemoveParamClick_":"any","handleRequiredCheckedChanged_":"any","handleTypeSelectedIndexChanged_":"any"};
exports.params.params = ["handleDuplicateParamClick_","handleRemoveParamClick_","handleRequiredCheckedChanged_","handleTypeSelectedIndexChanged_","parameters"];
exports.params.types = {"handleDuplicateParamClick_":"any","handleRemoveParamClick_":"any","handleRequiredCheckedChanged_":"any","handleTypeSelectedIndexChanged_":"any","parameters":"any"};
exports.param.params = ["handleDuplicateParamClick_","handleRemoveParamClick_","handleRequiredCheckedChanged_","handleTypeSelectedIndexChanged_","index","param"];
exports.param.types = {"handleDuplicateParamClick_":"any","handleRemoveParamClick_":"any","handleRequiredCheckedChanged_":"any","handleTypeSelectedIndexChanged_":"any","index":"any","param":"any"};
exports.auth.params = ["auth","permissions","handleRoleCheckedChanged_","handlePermissionCheckedChanged_","roles"];
exports.auth.types = {"auth":"any","permissions":"any","handleRoleCheckedChanged_":"any","handlePermissionCheckedChanged_":"any","roles":"any"};
exports.arrHasItem.params = ["array","item"];
exports.arrHasItem.types = {"array":"any","item":"any"};
templates = exports;
return exports;

});

class ApiBuilder extends Component {}
Soy.register(ApiBuilder, templates);
export { ApiBuilder, templates };
export default templates;
/* jshint ignore:end */
