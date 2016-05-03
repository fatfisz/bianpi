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
        type: 'number',
        start: {
          line: 1,
          column: 1,
        },
        end: {
          line: 1,
          column: 10,
        },
        value: '1234567890',
      },
      {
        type: 'number',
        start: {
          line: 1,
          column: 12,
        },
        end: {
          line: 1,
          column: 21,
        },
        value: '0123456789',
      },
    ],
  },
};
