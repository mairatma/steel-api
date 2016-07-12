'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	buildSrc: ['src/ApiBuilder.js', 'src/ApiBuilder.soy.js'],
	bundleCssFileName: 'api.css',
	bundleFileName: 'api.js',
	globalName: 'steel',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'steel-api',
	soySrc: 'src/ApiBuilder.soy',
});
