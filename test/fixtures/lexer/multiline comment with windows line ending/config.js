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
      line: 4,
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
        value: '\r\nThis is a multiline comment\r\n',
      },
    ],
  },
};
