'use strict';

module.exports = {
  options: {
    trackComments: true,
  },
  type: 'success',
  result: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 1,
      column: 11,
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
          column: 10,
        },
        value: ' Comment',
      },
    ],
  },
};
