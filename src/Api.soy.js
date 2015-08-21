/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Api.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Api.
 */

if (typeof Templates.Api == 'undefined') { Templates.Api = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Api.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="api component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '"></div>');
};
if (goog.DEBUG) {
  Templates.Api.content.soyTemplateName = 'Templates.Api.content';
}

Templates.Api.content.params = ["id"];
export default Templates.Api;
/* jshint ignore:end */
