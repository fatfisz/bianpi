'use strict';

module.exports = {
  type: 'success',
  result: {
    type: 'root',
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 2,
      column: 1,
    },
    props: {
      declarations: [{
        type: 'message',
        start: {
          line: 1,
          column: 1,
        },
        end: {
          line: 1,
          column: 22,
        },
        props: {
          name: {
            type: 'ident',
            start: {
              line: 1,
              column: 9,
            },
            end: {
              line: 1,
              column: 10,
            },
            value: 'id',
          },
          id: {
            type: 'number',
            start: {
              line: 1,
              column: 14,
            },
            end: {
              line: 1,
              column: 19,
            },
            value: '0x0001',
          },
          fields: [],
        },
      }],
    },
  },
};
