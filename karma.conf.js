'use strict';

var metalKarmaConfig = require('metal-karma-config');

module.exports = function (config) {
	metalKarmaConfig(config);

	config.files.push(
		'bower_components/codemirror/lib/codemirror.js',
		'bower_components/steel*/src/**/*.js',
		'bower_components/api.js/src/**/!(node)/*.js'
	);
	config.preprocessors['bower_components/steel*/**/*.js'] = ['babel', 'commonjs'];
	config.preprocessors['bower_components/api.js/**/!(node)/*.js'] = ['babel', 'commonjs'];
};
