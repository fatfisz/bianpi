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
        type: 'ident',
        start: {
          line: 1,
          column: 1,
        },
        end: {
          line: 1,
          column: 2,
        },
        value: 'id',
      },
      {
        type: 'operator',
        start: {
          line: 1,
          column: 3,
        },
        end: {
          line: 1,
          column: 3,
        },
        value: ',',
      },
      {
        type: 'ident',
        start: {
          line: 1,
          column: 4,
        },
        end: {
          line: 1,
          column: 7,
        },
        value: 'id_2',
      },
    ],
  },
};
