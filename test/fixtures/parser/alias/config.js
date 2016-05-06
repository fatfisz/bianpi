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
      declarations: [
        {
          type: 'alias',
          start: {
            line: 1,
            column: 1,
          },
          end: {
            line: 1,
            column: 15,
          },
          props: {
            type: {
              type: 'type',
              start: {
                line: 1,
                column: 7,
              },
              end: {
                line: 1,
                column: 10,
              },
              props: {
                name: {
                  type: 'ident',
                  start: {
                    line: 1,
                    column: 7,
                  },
                  end: {
                    line: 1,
                    column: 10,
                  },
                  value: 'type',
                },
              },
            },
            name: {
              type: 'ident',
              start: {
                line: 1,
                column: 12,
              },
              end: {
                line: 1,
                column: 15,
              },
              value: 'name',
            },
          },
        },
      ],
    },
  },
};
