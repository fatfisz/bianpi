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
        type: 'string',
        start: {
          line: 1,
          column: 1,
        },
        end: {
          line: 1,
          column: 8,
        },
        text: 'string',
      },
      {
        type: 'string',
        start: {
          line: 1,
          column: 9,
        },
        end: {
          line: 1,
          column: 18,
        },
        text: 'string 2',
      },
    ],
  },
};
