'use strict';

const loadGruntTasks = require('load-grunt-tasks');
const rollupPluginIncludePaths = require('rollup-plugin-includepaths');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginReplace = require('rollup-plugin-replace');


module.exports = function register(grunt) {
  loadGruntTasks(grunt);

  grunt.initConfig({
    eslint: {
      all: ['lib', 'test'],
    },

    clean: {
      all: ['dist', 'tmp'],
    },

    rollup: {
      options: {
        plugins: [
          rollupPluginReplace({
            include: 'node_modules/unicode-8.0.0/**/*.js',
            values: {
              'module.exports=': 'export default',
            },
          }),
          rollupPluginIncludePaths(),
          rollupPluginNodeResolve(),
        ],
        format: 'cjs',
      },
      dist: {
        files: {
          'dist/index.js': 'lib/index.js',
        },
      },
      test: {
        files: {
          'tmp/lexer.js': 'lib/lexer.js',
          'tmp/parser.js': 'lib/parser.js',
        },
      },
    },

    mochaTest: {
      test: {
        options: {
          timeout: 500,
        },
        src: [
          'test/boot.js',
          'test/**/*.test.js',
        ],
      },
    },
  });

  grunt.registerTask('prepublish', ['eslint', 'clean', 'rollup:dist']);
  grunt.registerTask('test', ['prepublish', 'rollup:test', 'mochaTest']);

  grunt.registerTask('default', ['test']);
};
