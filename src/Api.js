'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './Api.soy';

class Api extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

Api.ELEMENT_CLASSES = 'api';

ComponentRegistry.register('Api', Api);

export default Api;
