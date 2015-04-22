var projectFiles = require('./projectFiles');

module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.initConfig({

    clean: {
      coverage: ['build/coverage'],
      example: ['build/example'],
      templates: ['build/ng-templates']
    },

    concat: {
      options: {
        separator: ';'
      },
      example:{
        src: projectFiles.mergeFilesFor('example').concat('<%= ngtemplates.app.dest %>'),
        dest:'build/example/<%= pkg.name %>.js'
      }
    },

    connect: {
      example: {
        options: {
          port: 3040,
          hostname: '*',
          base: ['build/example']
        }
      }
    },

    copy: {
      templates: {
        files: [
          {
            expand: true,
            src: ['**'],
            cwd: 'app/ng-templates',
            dest: 'build/ng-templates'
          }
        ]
      },
      example: {
        files: [
          {
            expand: true,
            src: ['**'],
            cwd: 'example/',
            dest: 'build/example/'
          }
        ]
      }
    },

    ngtemplates: {
      app: {
        cwd:'build/ng-templates/',
        src:'*.html',
        dest:'build/app.templates.js'
      }
    },

    open: {
      example: {
        path: 'http://localhost:3040/#/no-debounce'
      }
    },

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      example: {
        files: ['app/**/*.*','app/*.*', 'example/**/*.*', 'example/*.*'],
        tasks: [
          'clean:example', 'clean:templates','copy:example',
          'copy:templates', 'highlight', 'ngtemplates:app',
          'concat:example'
        ]
      }
    }
  });

  grunt.registerTask('highlight', function() {
    var done = this.async();
    var files = [
      'no-debounce',
      'debounce',
      'filter',
      'tween',
      'fast-tween'
    ];

    var highlight = require('highlight.js');
    var fs = require('fs');

    for (var i = 0; i < files.length; ++i) {
      var baseFileName = files[i];
      var inputFileName = 'app/js/_' + (i+1) + '.' + baseFileName + '.js';
      var outputFileName = 'build/ng-templates/' + baseFileName + '_code.html';
      var fileContents = fs.readFileSync(inputFileName, 'utf-8');
      var highlighted = highlight.highlight('js', fileContents, false).value;
      highlighted = '<pre><code class="hljs javascript">'+highlighted+'</code></pre>';
      fs.writeFileSync(outputFileName, highlighted);
    }

    done();
  });

  grunt.registerTask('default',[
    'clean:example', 'clean:templates','copy:example',
    'copy:templates', 'highlight', 'ngtemplates:app',
    'concat:example','connect:example',
    'open:example','open:example','watch:example'])

};