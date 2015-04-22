var projectFiles = require('./projectFiles');

module.exports=function(config){
  var obj = {
    basePath: './',
    frameworks: ['mocha'],
    files:projectFiles.mergeFilesFor('appTest'),
    preprocessors: {},
    coverageReporter: {
      reporters:[
        { type : 'html', dir : 'build/coverage/'},
        { type : 'cobertura', dir: 'build/coverage/', file:'coverage.xml'}
      ]
    },
    ngHtml2JsPreprocessor:{
      stripPrefix:'app/ng-templates/',
      moduleName:'app-templates'
    },
    reporters: ['progress','growl'],
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: false,
    colors: true

  };

  function addPreprocessor(key,value){
    var preprocessors = obj.preprocessors[key] || (obj.preprocessors[key] = []);
    //value = '**/' + value;
    if(preprocessors.indexOf(value) == -1){
      preprocessors.push(value);
    }
  }

  projectFiles.mergeFilesFor('angularTemplates').forEach(function(value){
    addPreprocessor(value,'ng-html2js');
    //addPreprocessor(value,'ng-html2js');
  });


  if(!global.SKIP_COVERAGE){
    obj.reporters.push('coverage');

    projectFiles.mergeFilesFor('appSource').forEach(function(value){
      addPreprocessor(value,'coverage');
    });
  }
  config.set(obj);
};