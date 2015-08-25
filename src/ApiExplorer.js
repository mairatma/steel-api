'use strict';

import ApiBase from './ApiBase';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import './ApiExplorer.soy';

/**
 * Responsible for running HTTP APIs.
 */
class ApiExplorer extends ApiBase {

}

/**
 * Default element classes.
 * @type {string}
 * @static
 */
ApiExplorer.ELEMENT_CLASSES = 'api-explorer';

ComponentRegistry.register('ApiExplorer', ApiExplorer);

export default ApiExplorer;
