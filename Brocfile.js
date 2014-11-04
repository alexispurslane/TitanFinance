/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
app.import({
  development: 'bower_components/ember-data/ember-data.js',
  production:  'bower_components/ember-data/ember-data.prod.js'
}, {
  'ember-data': [
    'default'
  ]
});
app.import({
  development: 'bower_components/emberfire/dist/emberfire.js',
  production: 'bower_components/emberfire/dist/emberfire.min.js',
}, {
  'emberfire': [
    'default'
  ]
});
app.import({
  development: 'bower_components/firebase/firebase.js',
  production: 'bower_components/firebase/firebase.js'
}, {
  'firebase': [
    'default'
  ]
});
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var extraAssets = pickFiles('bower_components/bootstrap/dist/fonts',{
    srcDir: '/',
    files: ['**/*'],
    destDir: '/fonts'
});
app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');

module.exports = mergeTrees([app.toTree(), extraAssets]);
