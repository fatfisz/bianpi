'use strict';

module.exports = {
  type: 'success',
  result: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 3,
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
          column: 23,
        },
        text: ' Comment // Comment 2',
      },
      {
        type: 'comment',
        start: {
          line: 2,
          column: 3,
        },
        end: {
          line: 2,
          column: 30,
        },
        text: ' Comment 3 /* Comment 4 */',
      },
    ],
  },
};
