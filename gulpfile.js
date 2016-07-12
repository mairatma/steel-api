'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'api.css',
	bundleFileName: 'api.js',
	globalName: 'steel',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'steel-api'
});
