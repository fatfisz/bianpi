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
          column: 13,
        },
        value: ' Comment ',
      },
      {
        type: 'comment',
        start: {
          line: 1,
          column: 14,
        },
        end: {
          line: 1,
          column: 28,
        },
        value: ' Comment 2 ',
      },
    ],
  },
};
