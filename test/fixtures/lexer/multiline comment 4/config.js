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
      line: 7,
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
          line: 3,
          column: 2,
        },
        value: '*\nComment\n',
      },
      {
        type: 'comment',
        start: {
          line: 4,
          column: 3,
        },
        end: {
          line: 6,
          column: 5,
        },
        value: '\n  Comment 2\n  *',
      },
    ],
  },
};
