
require('project-files')(module,exports,{

  dependencies:[
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/firebase/firebase-debug.js',
    'bower_components/angularfire/dist/angularfire.js',
    'bower_components/tween.js/src/Tween.js'
  ],

  testDependencies:[
    'node_modules/sinon/pkg/sinon.js',
    'bower_components/chai/chai.js',
    'node_modules/sinon-chai/lib/sinon-chai.js',
    'bower_components/angular-mocks/angular-mocks.js'
  ],

  angularTemplates:[
    'app/ng-templates/*.html'
  ],

  appSource:[
    'app/js/app-module.js',
    'app/js/!(app-module)*.js'
  ],

  appTestSource:[
    'test/app/*.js',
    'test/app/**/*.js'
  ],

  appTest:[
    '@dependencies',
    '@testDependencies',
    '@angularTemplates',
    '@appSource',
    '@appTestSource'
  ],

  example:[
    '@dependencies',
    '@appSource'
  ]




});