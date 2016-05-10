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
        type: 'struct',
        start: {
          line: 1,
          column: 1,
        },
        end: {
          line: 1,
          column: 12,
        },
        props: {
          name: {
            type: 'ident',
            start: {
              line: 1,
              column: 8,
            },
            end: {
              line: 1,
              column: 9,
            },
            value: 'id',
          },
          fields: [],
        },
      }],
    },
  },
};
