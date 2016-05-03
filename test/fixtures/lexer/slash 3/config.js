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
        type: 'operator',
        start: {
          line: 1,
          column: 1,
        },
        end: {
          line: 1,
          column: 1,
        },
        value: '/',
      },
      {
        type: 'ident',
        start: {
          line: 1,
          column: 2,
        },
        end: {
          line: 1,
          column: 3,
        },
        value: 'id',
      },
    ],
  },
};
