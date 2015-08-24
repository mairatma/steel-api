'use strict';

import ApiBase from './ApiBase';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import './ApiBuilder.soy';

/**
 * Responsible for building HTTP APIs.
 */
class ApiBuilder extends ApiBase {

}

/**
 * Default element classes.
 * @type {string}
 * @static
 */
ApiBuilder.ELEMENT_CLASSES = 'api-builder';

ComponentRegistry.register('ApiBuilder', ApiBuilder);

export default ApiBuilder;
