'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const should = require('should');


describe('Parser', () => {
  const fixturesPath = path.join(__dirname, 'fixtures/parser');
  const tests = fs.readdirSync(fixturesPath);
  let tokenize;
  let parser;

  beforeEach(() => {
    tokenize = require('../tmp/lexer');
    parser = require('../tmp/parser');
  });

  tests.forEach((test) => {
    const testPath = path.join(fixturesPath, test);
    const source = fs.readFileSync(path.join(testPath, 'source.ba'));
    const config = require(path.join(testPath, 'config.js'));
    const itFunction =
      config.only ? it.only :
      config.skip ? it.skip :
      it;
    let lexerResult;

    itFunction(`should handle ${test}`, function () {
      lexerResult = tokenize(source, config.options);

      if (config.timeout) {
        this.timeout(config.timeout);
      }

      if (config.type === 'success') {
        let result;

        if (config.unwrap) {
          result = parser(lexerResult, config.options);
        } else {
          should(() => {
            result = parser(lexerResult, config.options);
          }).not.throw();
        }

        if (!config.ignoreResult) {
          should(result).be.eql(config.result);
        }

        if (config.inspectResult) {
          // eslint-disable-next-line no-console
          console.log(util.inspect(result, { colors: true, depth: null }));
        }
      } else if (config.unwrap) {
        parser(lexerResult, config.options);
      } else {
        should(() => {
          parser(lexerResult, config.options);
        }).throw(config.error);
      }
    });
  });
});
