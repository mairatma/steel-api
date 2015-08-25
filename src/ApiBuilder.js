'use strict';

import dom from 'bower:metal/src/dom/dom';
import ApiBase from './ApiBase';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import './ApiBuilder.soy';

/**
 * Responsible for building HTTP APIs.
 */
class ApiBuilder extends ApiBase {
	/**
	 * @inheritDoc
	 */
	attached() {
		this.delegate('click', '.api-builder-param .close', this.handleRemoveParamClick_.bind(this));
	}

	/**
	 * Handles a `click` event on the button for adding more params.
	 * @param {!Event} event
	 * @protected
	 */
	handleAddParamClick_(event) {
		event.preventDefault();
		var frag = dom.buildFragment(this.renderTemplateByName_('ApiBuilder', 'param', {
			param: {}
		}));
		dom.append(this.getSurfaceElement('params'), frag);
	}

	/**
	 * Handles a `click` event on the button for removing a param.
	 * @param {!Event} event
	 * @protected
	 */
	handleRemoveParamClick_(event) {
		var paramRow = event.delegateTarget.parentNode.parentNode;
		paramRow.parentNode.removeChild(paramRow);
	}
}

/**
 * Default element classes.
 * @type {string}
 * @static
 */
ApiBuilder.ELEMENT_CLASSES = 'api-builder';

ComponentRegistry.register('ApiBuilder', ApiBuilder);

export default ApiBuilder;
