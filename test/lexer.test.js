'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const should = require('should');


describe('Lexer', () => {
  const fixturesPath = path.join(__dirname, 'fixtures/lexer');
  const tests = fs.readdirSync(fixturesPath);
  let lexer;

  beforeEach(() => {
    lexer = require('../tmp/lexer');
  });

  tests.forEach((test) => {
    const testPath = path.join(fixturesPath, test);
    const source = fs.readFileSync(path.join(testPath, 'source.ba'));
    const config = require(path.join(testPath, 'config.js'));
    const itFunction =
      config.only ? it.only :
      config.skip ? it.skip :
      it;

    itFunction(`should handle ${test}`, function () {
      if (config.timeout) {
        this.timeout(config.timeout);
      }

      if (config.type === 'success') {
        let result;

        should(() => {
          result = lexer(source, config.options);
        }).not.throw();

        if (!config.ignoreResult) {
          should(result).be.eql(config.result);
        }

        if (config.inspectResult) {
          console.log(util.inspect(result, { colors: true, depth: null }));
        }
      } else {
        should(() => {
          lexer(source, config.options);
        }).throw(config.error);
      }
    });
  });
});
