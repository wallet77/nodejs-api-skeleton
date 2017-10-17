'use strict';

module.exports = function (grunt) {
  if (grunt.cli.tasks[0] && grunt.cli.tasks[0].indexOf('release') > -1) {
    grunt.loadNpmTasks('grunt-release-it');
  } else {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      eslint: {
        target: ['src/**/*.js', 'tests/**/*.js'],
        options: {
          configFile: '.eslintrc'
        }
      },
      jsdoc: {
        dist: {
          src: ['./src/**/*.js'],
          jsdoc: './node_modules/.bin/jsdoc',
          options: {
            destination: './docs/jsdoc/',
            configure: './docs/source/conf.json',
            template: './node_modules/ink-docstrap/template'
          }
        }
      },
      apidoc: {
        myapp: {
          src: 'src/',
          dest: 'docs/apidoc/'
        }
      }
    });

    grunt.loadNpmTasks('grunt-eslint');

    grunt.loadNpmTasks('grunt-apidoc');
    grunt.loadNpmTasks('grunt-jsdoc');

    // -----------------------------------------------------------------------------------------
    //                                 Globals tasks
    // -----------------------------------------------------------------------------------------
    grunt.registerTask('default', ['eslint']);

    const taskDev = ['eslint'];
    const taskProd = ['eslint'];

    grunt.registerTask('dev', taskDev);
    grunt.registerTask('prod', taskProd);

    grunt.registerTask('doc', ['jsdoc', 'apidoc']);
    grunt.registerTask('lint', 'eslint');
  }
};
