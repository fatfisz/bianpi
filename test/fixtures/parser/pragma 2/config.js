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
      line: 3,
      column: 1,
    },
    props: {
      declarations: [
        {
          type: 'block',
          start: {
            line: 2,
            column: 1,
          },
          end: {
            line: 2,
            column: 2,
          },
          props: {
            declarations: [],
          },
        },
      ],
    },
  },
};
