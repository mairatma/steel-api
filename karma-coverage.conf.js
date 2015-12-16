'use strict';

var metalKarmaConfig = require('metal-karma-config/coverage');

module.exports = function (config) {
	metalKarmaConfig(config);

	config.files.push(
		'bower_components/codemirror/lib/codemirror.js',
		'bower_components/steel*/src/**/*.js',
		'bower_components/api.js/src/**/*.js'
	);
	config.preprocessors['bower_components/steel*/**/*.js'] = ['babel', 'commonjs'];
	config.preprocessors['bower_components/api.js*/**/*.js'] = ['babel', 'commonjs'];
};
