'use strict';

module.exports = {
  type: 'success',
  result: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 2,
      column: 1,
    },
    tokens: [
      {
        type: 'comment',
        start: {
          line: 1,
          column: 1,
        },
        end: {
          line: 1,
          column: 8,
        },
        value: ' /* ',
      },
      {
        type: 'operator',
        start: {
          line: 1,
          column: 10,
        },
        end: {
          line: 1,
          column: 10,
        },
        value: '*',
      },
      {
        type: 'operator',
        start: {
          line: 1,
          column: 11,
        },
        end: {
          line: 1,
          column: 11,
        },
        value: '/',
      },
    ],
  },
};
