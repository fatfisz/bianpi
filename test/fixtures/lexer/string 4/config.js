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
          column: 10,
        },
        value: 'string 💩',
      },
    ],
  },
};
