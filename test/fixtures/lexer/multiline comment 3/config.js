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
          column: 13,
        },
        text: ' Comment ',
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
        text: ' Comment 2 ',
      },
    ],
  },
};
