'use strict';

var metalKarmaConfig = require('metal-karma-config/coverage');

module.exports = function (config) {
	metalKarmaConfig(config);

	config.files.push(
		'node_modules/codemirror/lib/codemirror.js',
		'node_modules/steel*/src/**/*.js',
		'node_modules/api.js/src/**/!(node)/!(node).js'
	);
	config.preprocessors['node_modules/steel*/**/*.js'] = ['babel', 'commonjs'];
	config.preprocessors['node_modules/api.js/**/!(node)/*.js'] = ['babel', 'commonjs'];
};
