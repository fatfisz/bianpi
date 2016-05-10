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
            column: 36,
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
                column: 31,
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
                parameters: [
                  {
                    type: 'type',
                    start: {
                      line: 1,
                      column: 12,
                    },
                    end: {
                      line: 1,
                      column: 23,
                    },
                    props: {
                      name: {
                        type: 'ident',
                        start: {
                          line: 1,
                          column: 12,
                        },
                        end: {
                          line: 1,
                          column: 16,
                        },
                        value: 'type1',
                      },
                      parameters: [
                        {
                          type: 'type',
                          start: {
                            line: 1,
                            column: 18,
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
                                column: 18,
                              },
                              end: {
                                line: 1,
                                column: 22,
                              },
                              value: 'type2',
                            },
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'type',
                    start: {
                      line: 1,
                      column: 26,
                    },
                    end: {
                      line: 1,
                      column: 30,
                    },
                    props: {
                      name: {
                        type: 'ident',
                        start: {
                          line: 1,
                          column: 26,
                        },
                        end: {
                          line: 1,
                          column: 30,
                        },
                        value: 'type3',
                      },
                    },
                  },
                ],
              },
            },
            name: {
              type: 'ident',
              start: {
                line: 1,
                column: 33,
              },
              end: {
                line: 1,
                column: 36,
              },
              value: 'name',
            },
          },
        },
      ],
    },
  },
};
