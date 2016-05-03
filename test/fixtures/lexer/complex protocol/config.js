'use strict';

module.exports = {
  type: 'success',
  result: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 213,
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
          line: 8,
          column: 3,
        },
        value: '*\n * Packet\n *\n * Packet is a unit of data which is used in communication between the server\n * and the client. When a message is received (either on the server or client),\n * it is expected to be a packet. 1 packet consists of 1 or more messages\n * (defined below).\n ',
      },
      {
        type: 'comment',
        start: {
          line: 10,
          column: 1,
        },
        end: {
          line: 16,
          column: 3,
        },
        value: '*\n * Basic types\n *\n * int8, int16, int32 - n-bit signed integers\n * uint8, uint16, uint32 - n-bit unsigned integers\n * float32, float64 - n-bit floats\n ',
      },
      {
        type: 'comment',
        start: {
          line: 18,
          column: 1,
        },
        end: {
          line: 20,
          column: 3,
        },
        value: '*\n * Consts\n ',
      },
      {
        type: 'ident',
        start: {
          line: 22,
          column: 1,
        },
        end: {
          line: 22,
          column: 7,
        },
        value: 'VERSION',
      },
      {
        type: 'operator',
        start: {
          line: 22,
          column: 9,
        },
        end: {
          line: 22,
          column: 9,
        },
        value: '=',
      },
      {
        type: 'string',
        start: {
          line: 22,
          column: 11,
        },
        end: {
          line: 22,
          column: 13,
        },
        value: '3',
      },
      {
        type: 'comment',
        start: {
          line: 24,
          column: 1,
        },
        end: {
          line: 26,
          column: 3,
        },
        value: '*\n * Custom types and structures\n ',
      },
      {
        type: 'ident',
        start: {
          line: 28,
          column: 1,
        },
        end: {
          line: 28,
          column: 5,
        },
        value: 'alias',
      },
      {
        type: 'ident',
        start: {
          line: 28,
          column: 7,
        },
        end: {
          line: 28,
          column: 12,
        },
        value: 'uint32',
      },
      {
        type: 'ident',
        start: {
          line: 28,
          column: 14,
        },
        end: {
          line: 28,
          column: 21,
        },
        value: 'playerId',
      },
      {
        type: 'ident',
        start: {
          line: 29,
          column: 1,
        },
        end: {
          line: 29,
          column: 5,
        },
        value: 'alias',
      },
      {
        type: 'ident',
        start: {
          line: 29,
          column: 7,
        },
        end: {
          line: 29,
          column: 12,
        },
        value: 'uint32',
      },
      {
        type: 'ident',
        start: {
          line: 29,
          column: 14,
        },
        end: {
          line: 29,
          column: 19,
        },
        value: 'itemId',
      },
      {
        type: 'ident',
        start: {
          line: 31,
          column: 1,
        },
        end: {
          line: 31,
          column: 4,
        },
        value: 'enum',
      },
      {
        type: 'ident',
        start: {
          line: 31,
          column: 6,
        },
        end: {
          line: 31,
          column: 9,
        },
        value: 'bool',
      },
      {
        type: 'operator',
        start: {
          line: 31,
          column: 11,
        },
        end: {
          line: 31,
          column: 11,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 32,
          column: 3,
        },
        end: {
          line: 32,
          column: 7,
        },
        value: 'FALSE',
      },
      {
        type: 'operator',
        start: {
          line: 32,
          column: 9,
        },
        end: {
          line: 32,
          column: 9,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 32,
          column: 11,
        },
        end: {
          line: 32,
          column: 14,
        },
        value: '0x00',
      },
      {
        type: 'ident',
        start: {
          line: 33,
          column: 3,
        },
        end: {
          line: 33,
          column: 6,
        },
        value: 'TRUE',
      },
      {
        type: 'operator',
        start: {
          line: 33,
          column: 9,
        },
        end: {
          line: 33,
          column: 9,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 33,
          column: 11,
        },
        end: {
          line: 33,
          column: 14,
        },
        value: '0x01',
      },
      {
        type: 'operator',
        start: {
          line: 34,
          column: 1,
        },
        end: {
          line: 34,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 36,
          column: 1,
        },
        end: {
          line: 36,
          column: 6,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 36,
          column: 8,
        },
        end: {
          line: 36,
          column: 13,
        },
        value: 'string',
      },
      {
        type: 'operator',
        start: {
          line: 36,
          column: 15,
        },
        end: {
          line: 36,
          column: 15,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 37,
          column: 3,
        },
        end: {
          line: 37,
          column: 8,
        },
        value: 'uint16',
      },
      {
        type: 'ident',
        start: {
          line: 37,
          column: 17,
        },
        end: {
          line: 37,
          column: 22,
        },
        value: 'length',
      },
      {
        type: 'ident',
        start: {
          line: 38,
          column: 3,
        },
        end: {
          line: 38,
          column: 7,
        },
        value: 'uint8',
      },
      {
        type: 'operator',
        start: {
          line: 38,
          column: 8,
        },
        end: {
          line: 38,
          column: 8,
        },
        value: '[',
      },
      {
        type: 'ident',
        start: {
          line: 38,
          column: 9,
        },
        end: {
          line: 38,
          column: 14,
        },
        value: 'length',
      },
      {
        type: 'operator',
        start: {
          line: 38,
          column: 15,
        },
        end: {
          line: 38,
          column: 15,
        },
        value: ']',
      },
      {
        type: 'ident',
        start: {
          line: 38,
          column: 17,
        },
        end: {
          line: 38,
          column: 21,
        },
        value: 'chars',
      },
      {
        type: 'operator',
        start: {
          line: 39,
          column: 1,
        },
        end: {
          line: 39,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 41,
          column: 1,
        },
        end: {
          line: 41,
          column: 6,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 41,
          column: 8,
        },
        end: {
          line: 41,
          column: 18,
        },
        value: 'shortString',
      },
      {
        type: 'operator',
        start: {
          line: 41,
          column: 20,
        },
        end: {
          line: 41,
          column: 20,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 42,
          column: 3,
        },
        end: {
          line: 42,
          column: 7,
        },
        value: 'uint8',
      },
      {
        type: 'ident',
        start: {
          line: 42,
          column: 17,
        },
        end: {
          line: 42,
          column: 22,
        },
        value: 'length',
      },
      {
        type: 'ident',
        start: {
          line: 43,
          column: 3,
        },
        end: {
          line: 43,
          column: 7,
        },
        value: 'uint8',
      },
      {
        type: 'operator',
        start: {
          line: 43,
          column: 8,
        },
        end: {
          line: 43,
          column: 8,
        },
        value: '[',
      },
      {
        type: 'ident',
        start: {
          line: 43,
          column: 9,
        },
        end: {
          line: 43,
          column: 14,
        },
        value: 'length',
      },
      {
        type: 'operator',
        start: {
          line: 43,
          column: 15,
        },
        end: {
          line: 43,
          column: 15,
        },
        value: ']',
      },
      {
        type: 'ident',
        start: {
          line: 43,
          column: 17,
        },
        end: {
          line: 43,
          column: 21,
        },
        value: 'chars',
      },
      {
        type: 'operator',
        start: {
          line: 44,
          column: 1,
        },
        end: {
          line: 44,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'comment',
        start: {
          line: 46,
          column: 1,
        },
        end: {
          line: 46,
          column: 77,
        },
        value: ' the upper left corner of the map fragment is (x, y) and it\'s size is n x m',
      },
      {
        type: 'comment',
        start: {
          line: 47,
          column: 1,
        },
        end: {
          line: 47,
          column: 77,
        },
        value: ' textures are passed from the left to the right, from the top to the bottom',
      },
      {
        type: 'ident',
        start: {
          line: 48,
          column: 1,
        },
        end: {
          line: 48,
          column: 6,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 48,
          column: 8,
        },
        end: {
          line: 48,
          column: 18,
        },
        value: 'mapFragment',
      },
      {
        type: 'operator',
        start: {
          line: 48,
          column: 20,
        },
        end: {
          line: 48,
          column: 20,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 49,
          column: 3,
        },
        end: {
          line: 49,
          column: 7,
        },
        value: 'int16',
      },
      {
        type: 'ident',
        start: {
          line: 49,
          column: 17,
        },
        end: {
          line: 49,
          column: 17,
        },
        value: 'x',
      },
      {
        type: 'ident',
        start: {
          line: 50,
          column: 3,
        },
        end: {
          line: 50,
          column: 7,
        },
        value: 'int16',
      },
      {
        type: 'ident',
        start: {
          line: 50,
          column: 17,
        },
        end: {
          line: 50,
          column: 17,
        },
        value: 'y',
      },
      {
        type: 'ident',
        start: {
          line: 51,
          column: 3,
        },
        end: {
          line: 51,
          column: 8,
        },
        value: 'uint16',
      },
      {
        type: 'ident',
        start: {
          line: 51,
          column: 17,
        },
        end: {
          line: 51,
          column: 17,
        },
        value: 'n',
      },
      {
        type: 'ident',
        start: {
          line: 52,
          column: 3,
        },
        end: {
          line: 52,
          column: 8,
        },
        value: 'uint16',
      },
      {
        type: 'ident',
        start: {
          line: 52,
          column: 17,
        },
        end: {
          line: 52,
          column: 17,
        },
        value: 'm',
      },
      {
        type: 'ident',
        start: {
          line: 53,
          column: 3,
        },
        end: {
          line: 53,
          column: 8,
        },
        value: 'uint16',
      },
      {
        type: 'operator',
        start: {
          line: 53,
          column: 9,
        },
        end: {
          line: 53,
          column: 9,
        },
        value: '[',
      },
      {
        type: 'ident',
        start: {
          line: 53,
          column: 10,
        },
        end: {
          line: 53,
          column: 10,
        },
        value: 'n',
      },
      {
        type: 'operator',
        start: {
          line: 53,
          column: 12,
        },
        end: {
          line: 53,
          column: 12,
        },
        value: '*',
      },
      {
        type: 'ident',
        start: {
          line: 53,
          column: 14,
        },
        end: {
          line: 53,
          column: 14,
        },
        value: 'm',
      },
      {
        type: 'operator',
        start: {
          line: 53,
          column: 15,
        },
        end: {
          line: 53,
          column: 15,
        },
        value: ']',
      },
      {
        type: 'ident',
        start: {
          line: 53,
          column: 17,
        },
        end: {
          line: 53,
          column: 24,
        },
        value: 'textures',
      },
      {
        type: 'operator',
        start: {
          line: 54,
          column: 1,
        },
        end: {
          line: 54,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 56,
          column: 1,
        },
        end: {
          line: 56,
          column: 6,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 56,
          column: 8,
        },
        end: {
          line: 56,
          column: 13,
        },
        value: 'player',
      },
      {
        type: 'operator',
        start: {
          line: 56,
          column: 15,
        },
        end: {
          line: 56,
          column: 15,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 57,
          column: 3,
        },
        end: {
          line: 57,
          column: 10,
        },
        value: 'playerId',
      },
      {
        type: 'ident',
        start: {
          line: 57,
          column: 15,
        },
        end: {
          line: 57,
          column: 16,
        },
        value: 'id',
      },
      {
        type: 'ident',
        start: {
          line: 58,
          column: 3,
        },
        end: {
          line: 58,
          column: 13,
        },
        value: 'shortString',
      },
      {
        type: 'ident',
        start: {
          line: 58,
          column: 15,
        },
        end: {
          line: 58,
          column: 18,
        },
        value: 'nick',
      },
      {
        type: 'ident',
        start: {
          line: 59,
          column: 3,
        },
        end: {
          line: 59,
          column: 9,
        },
        value: 'float32',
      },
      {
        type: 'ident',
        start: {
          line: 59,
          column: 15,
        },
        end: {
          line: 59,
          column: 15,
        },
        value: 'x',
      },
      {
        type: 'ident',
        start: {
          line: 60,
          column: 3,
        },
        end: {
          line: 60,
          column: 9,
        },
        value: 'float32',
      },
      {
        type: 'ident',
        start: {
          line: 60,
          column: 15,
        },
        end: {
          line: 60,
          column: 15,
        },
        value: 'y',
      },
      {
        type: 'comment',
        start: {
          line: 62,
          column: 3,
        },
        end: {
          line: 62,
          column: 90,
        },
        value: ' 0 is top, π/2 is right, π is bottom, 3/2π is left; value should be clipped to [0, 2π]',
      },
      {
        type: 'ident',
        start: {
          line: 63,
          column: 3,
        },
        end: {
          line: 63,
          column: 9,
        },
        value: 'float32',
      },
      {
        type: 'ident',
        start: {
          line: 63,
          column: 15,
        },
        end: {
          line: 63,
          column: 19,
        },
        value: 'angle',
      },
      {
        type: 'comment',
        start: {
          line: 65,
          column: 3,
        },
        end: {
          line: 65,
          column: 45,
        },
        value: ' considered valid only if 0 <= hue <= 359',
      },
      {
        type: 'ident',
        start: {
          line: 66,
          column: 3,
        },
        end: {
          line: 66,
          column: 8,
        },
        value: 'uint16',
      },
      {
        type: 'ident',
        start: {
          line: 66,
          column: 15,
        },
        end: {
          line: 66,
          column: 17,
        },
        value: 'hue',
      },
      {
        type: 'operator',
        start: {
          line: 67,
          column: 1,
        },
        end: {
          line: 67,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 69,
          column: 1,
        },
        end: {
          line: 69,
          column: 6,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 69,
          column: 8,
        },
        end: {
          line: 69,
          column: 20,
        },
        value: 'currentPlayer',
      },
      {
        type: 'operator',
        start: {
          line: 69,
          column: 22,
        },
        end: {
          line: 69,
          column: 22,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 70,
          column: 3,
        },
        end: {
          line: 70,
          column: 8,
        },
        value: 'player',
      },
      {
        type: 'ident',
        start: {
          line: 70,
          column: 17,
        },
        end: {
          line: 70,
          column: 22,
        },
        value: 'player',
      },
      {
        type: 'ident',
        start: {
          line: 71,
          column: 3,
        },
        end: {
          line: 71,
          column: 15,
        },
        value: 'itemContainer',
      },
      {
        type: 'ident',
        start: {
          line: 71,
          column: 17,
        },
        end: {
          line: 71,
          column: 25,
        },
        value: 'equipment',
      },
      {
        type: 'operator',
        start: {
          line: 72,
          column: 1,
        },
        end: {
          line: 72,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 74,
          column: 1,
        },
        end: {
          line: 74,
          column: 6,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 74,
          column: 8,
        },
        end: {
          line: 74,
          column: 11,
        },
        value: 'item',
      },
      {
        type: 'operator',
        start: {
          line: 74,
          column: 13,
        },
        end: {
          line: 74,
          column: 13,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 75,
          column: 3,
        },
        end: {
          line: 75,
          column: 8,
        },
        value: 'itemId',
      },
      {
        type: 'ident',
        start: {
          line: 75,
          column: 10,
        },
        end: {
          line: 75,
          column: 11,
        },
        value: 'id',
      },
      {
        type: 'ident',
        start: {
          line: 76,
          column: 3,
        },
        end: {
          line: 76,
          column: 8,
        },
        value: 'uint16',
      },
      {
        type: 'ident',
        start: {
          line: 76,
          column: 10,
        },
        end: {
          line: 76,
          column: 13,
        },
        value: 'type',
      },
      {
        type: 'ident',
        start: {
          line: 77,
          column: 3,
        },
        end: {
          line: 77,
          column: 8,
        },
        value: 'uint16',
      },
      {
        type: 'ident',
        start: {
          line: 77,
          column: 10,
        },
        end: {
          line: 77,
          column: 14,
        },
        value: 'order',
      },
      {
        type: 'operator',
        start: {
          line: 78,
          column: 1,
        },
        end: {
          line: 78,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 80,
          column: 1,
        },
        end: {
          line: 80,
          column: 6,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 80,
          column: 8,
        },
        end: {
          line: 80,
          column: 20,
        },
        value: 'itemContainer',
      },
      {
        type: 'operator',
        start: {
          line: 80,
          column: 22,
        },
        end: {
          line: 80,
          column: 22,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 81,
          column: 3,
        },
        end: {
          line: 81,
          column: 8,
        },
        value: 'itemId',
      },
      {
        type: 'ident',
        start: {
          line: 81,
          column: 14,
        },
        end: {
          line: 81,
          column: 21,
        },
        value: 'capacity',
      },
      {
        type: 'ident',
        start: {
          line: 82,
          column: 3,
        },
        end: {
          line: 82,
          column: 6,
        },
        value: 'list',
      },
      {
        type: 'operator',
        start: {
          line: 82,
          column: 7,
        },
        end: {
          line: 82,
          column: 7,
        },
        value: '<',
      },
      {
        type: 'ident',
        start: {
          line: 82,
          column: 8,
        },
        end: {
          line: 82,
          column: 11,
        },
        value: 'item',
      },
      {
        type: 'operator',
        start: {
          line: 82,
          column: 12,
        },
        end: {
          line: 82,
          column: 12,
        },
        value: '>',
      },
      {
        type: 'ident',
        start: {
          line: 82,
          column: 14,
        },
        end: {
          line: 82,
          column: 18,
        },
        value: 'items',
      },
      {
        type: 'operator',
        start: {
          line: 83,
          column: 1,
        },
        end: {
          line: 83,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 85,
          column: 1,
        },
        end: {
          line: 85,
          column: 6,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 85,
          column: 8,
        },
        end: {
          line: 85,
          column: 11,
        },
        value: 'list',
      },
      {
        type: 'operator',
        start: {
          line: 85,
          column: 12,
        },
        end: {
          line: 85,
          column: 12,
        },
        value: '<',
      },
      {
        type: 'ident',
        start: {
          line: 85,
          column: 13,
        },
        end: {
          line: 85,
          column: 13,
        },
        value: 't',
      },
      {
        type: 'operator',
        start: {
          line: 85,
          column: 14,
        },
        end: {
          line: 85,
          column: 14,
        },
        value: '>',
      },
      {
        type: 'operator',
        start: {
          line: 85,
          column: 16,
        },
        end: {
          line: 85,
          column: 16,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 86,
          column: 3,
        },
        end: {
          line: 86,
          column: 8,
        },
        value: 'uint16',
      },
      {
        type: 'ident',
        start: {
          line: 86,
          column: 13,
        },
        end: {
          line: 86,
          column: 18,
        },
        value: 'length',
      },
      {
        type: 'ident',
        start: {
          line: 87,
          column: 3,
        },
        end: {
          line: 87,
          column: 3,
        },
        value: 't',
      },
      {
        type: 'operator',
        start: {
          line: 87,
          column: 4,
        },
        end: {
          line: 87,
          column: 4,
        },
        value: '[',
      },
      {
        type: 'ident',
        start: {
          line: 87,
          column: 5,
        },
        end: {
          line: 87,
          column: 10,
        },
        value: 'length',
      },
      {
        type: 'operator',
        start: {
          line: 87,
          column: 11,
        },
        end: {
          line: 87,
          column: 11,
        },
        value: ']',
      },
      {
        type: 'ident',
        start: {
          line: 87,
          column: 13,
        },
        end: {
          line: 87,
          column: 20,
        },
        value: 'elements',
      },
      {
        type: 'operator',
        start: {
          line: 88,
          column: 1,
        },
        end: {
          line: 88,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'comment',
        start: {
          line: 90,
          column: 1,
        },
        end: {
          line: 92,
          column: 3,
        },
        value: '*\n * Messages\n ',
      },
      {
        type: 'operator',
        start: {
          line: 94,
          column: 1,
        },
        end: {
          line: 94,
          column: 1,
        },
        value: '[',
      },
      {
        type: 'ident',
        start: {
          line: 94,
          column: 2,
        },
        end: {
          line: 94,
          column: 5,
        },
        value: 'read',
      },
      {
        type: 'operator',
        start: {
          line: 94,
          column: 6,
        },
        end: {
          line: 94,
          column: 6,
        },
        value: '(',
      },
      {
        type: 'ident',
        start: {
          line: 94,
          column: 7,
        },
        end: {
          line: 94,
          column: 12,
        },
        value: 'server',
      },
      {
        type: 'operator',
        start: {
          line: 94,
          column: 13,
        },
        end: {
          line: 94,
          column: 13,
        },
        value: ')',
      },
      {
        type: 'operator',
        start: {
          line: 94,
          column: 14,
        },
        end: {
          line: 94,
          column: 14,
        },
        value: ']',
      },
      {
        type: 'operator',
        start: {
          line: 95,
          column: 1,
        },
        end: {
          line: 95,
          column: 1,
        },
        value: '[',
      },
      {
        type: 'ident',
        start: {
          line: 95,
          column: 2,
        },
        end: {
          line: 95,
          column: 6,
        },
        value: 'write',
      },
      {
        type: 'operator',
        start: {
          line: 95,
          column: 7,
        },
        end: {
          line: 95,
          column: 7,
        },
        value: '(',
      },
      {
        type: 'ident',
        start: {
          line: 95,
          column: 8,
        },
        end: {
          line: 95,
          column: 13,
        },
        value: 'client',
      },
      {
        type: 'operator',
        start: {
          line: 95,
          column: 14,
        },
        end: {
          line: 95,
          column: 14,
        },
        value: ')',
      },
      {
        type: 'operator',
        start: {
          line: 95,
          column: 15,
        },
        end: {
          line: 95,
          column: 15,
        },
        value: ']',
      },
      {
        type: 'operator',
        start: {
          line: 96,
          column: 1,
        },
        end: {
          line: 96,
          column: 1,
        },
        value: '{',
      },
      {
        type: 'comment',
        start: {
          line: 97,
          column: 3,
        },
        end: {
          line: 97,
          column: 42,
        },
        value: ' Reliable client messages, from 0x0000',
      },
      {
        type: 'operator',
        start: {
          line: 98,
          column: 3,
        },
        end: {
          line: 98,
          column: 3,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 99,
          column: 5,
        },
        end: {
          line: 99,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 99,
          column: 13,
        },
        end: {
          line: 99,
          column: 20,
        },
        value: 'register',
      },
      {
        type: 'operator',
        start: {
          line: 99,
          column: 22,
        },
        end: {
          line: 99,
          column: 22,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 99,
          column: 24,
        },
        end: {
          line: 99,
          column: 29,
        },
        value: '0x0001',
      },
      {
        type: 'operator',
        start: {
          line: 99,
          column: 31,
        },
        end: {
          line: 99,
          column: 31,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 100,
          column: 7,
        },
        end: {
          line: 100,
          column: 17,
        },
        value: 'shortString',
      },
      {
        type: 'ident',
        start: {
          line: 100,
          column: 19,
        },
        end: {
          line: 100,
          column: 22,
        },
        value: 'nick',
      },
      {
        type: 'ident',
        start: {
          line: 101,
          column: 7,
        },
        end: {
          line: 101,
          column: 17,
        },
        value: 'shortString',
      },
      {
        type: 'ident',
        start: {
          line: 101,
          column: 19,
        },
        end: {
          line: 101,
          column: 26,
        },
        value: 'password',
      },
      {
        type: 'operator',
        start: {
          line: 102,
          column: 5,
        },
        end: {
          line: 102,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 104,
          column: 5,
        },
        end: {
          line: 104,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 104,
          column: 13,
        },
        end: {
          line: 104,
          column: 25,
        },
        value: 'nickAvailable',
      },
      {
        type: 'operator',
        start: {
          line: 104,
          column: 27,
        },
        end: {
          line: 104,
          column: 27,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 104,
          column: 29,
        },
        end: {
          line: 104,
          column: 34,
        },
        value: '0x0002',
      },
      {
        type: 'operator',
        start: {
          line: 104,
          column: 36,
        },
        end: {
          line: 104,
          column: 36,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 105,
          column: 7,
        },
        end: {
          line: 105,
          column: 17,
        },
        value: 'shortString',
      },
      {
        type: 'ident',
        start: {
          line: 105,
          column: 19,
        },
        end: {
          line: 105,
          column: 22,
        },
        value: 'nick',
      },
      {
        type: 'operator',
        start: {
          line: 106,
          column: 5,
        },
        end: {
          line: 106,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 108,
          column: 5,
        },
        end: {
          line: 108,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 108,
          column: 13,
        },
        end: {
          line: 108,
          column: 17,
        },
        value: 'login',
      },
      {
        type: 'operator',
        start: {
          line: 108,
          column: 19,
        },
        end: {
          line: 108,
          column: 19,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 108,
          column: 21,
        },
        end: {
          line: 108,
          column: 26,
        },
        value: '0x0003',
      },
      {
        type: 'operator',
        start: {
          line: 108,
          column: 28,
        },
        end: {
          line: 108,
          column: 28,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 109,
          column: 7,
        },
        end: {
          line: 109,
          column: 17,
        },
        value: 'shortString',
      },
      {
        type: 'ident',
        start: {
          line: 109,
          column: 19,
        },
        end: {
          line: 109,
          column: 22,
        },
        value: 'nick',
      },
      {
        type: 'ident',
        start: {
          line: 110,
          column: 7,
        },
        end: {
          line: 110,
          column: 17,
        },
        value: 'shortString',
      },
      {
        type: 'ident',
        start: {
          line: 110,
          column: 19,
        },
        end: {
          line: 110,
          column: 26,
        },
        value: 'password',
      },
      {
        type: 'operator',
        start: {
          line: 111,
          column: 5,
        },
        end: {
          line: 111,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 113,
          column: 5,
        },
        end: {
          line: 113,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 113,
          column: 13,
        },
        end: {
          line: 113,
          column: 22,
        },
        value: 'readyState',
      },
      {
        type: 'operator',
        start: {
          line: 113,
          column: 24,
        },
        end: {
          line: 113,
          column: 24,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 113,
          column: 26,
        },
        end: {
          line: 113,
          column: 31,
        },
        value: '0x0004',
      },
      {
        type: 'operator',
        start: {
          line: 113,
          column: 33,
        },
        end: {
          line: 113,
          column: 33,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 114,
          column: 7,
        },
        end: {
          line: 114,
          column: 10,
        },
        value: 'bool',
      },
      {
        type: 'ident',
        start: {
          line: 114,
          column: 12,
        },
        end: {
          line: 114,
          column: 18,
        },
        value: 'isReady',
      },
      {
        type: 'operator',
        start: {
          line: 115,
          column: 5,
        },
        end: {
          line: 115,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 117,
          column: 5,
        },
        end: {
          line: 117,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 117,
          column: 13,
        },
        end: {
          line: 117,
          column: 29,
        },
        value: 'sendGlobalMessage',
      },
      {
        type: 'operator',
        start: {
          line: 117,
          column: 31,
        },
        end: {
          line: 117,
          column: 31,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 117,
          column: 33,
        },
        end: {
          line: 117,
          column: 38,
        },
        value: '0x0100',
      },
      {
        type: 'operator',
        start: {
          line: 117,
          column: 40,
        },
        end: {
          line: 117,
          column: 40,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 118,
          column: 7,
        },
        end: {
          line: 118,
          column: 12,
        },
        value: 'string',
      },
      {
        type: 'ident',
        start: {
          line: 118,
          column: 14,
        },
        end: {
          line: 118,
          column: 17,
        },
        value: 'text',
      },
      {
        type: 'operator',
        start: {
          line: 119,
          column: 5,
        },
        end: {
          line: 119,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 121,
          column: 5,
        },
        end: {
          line: 121,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 121,
          column: 13,
        },
        end: {
          line: 121,
          column: 30,
        },
        value: 'sendPrivateMessage',
      },
      {
        type: 'operator',
        start: {
          line: 121,
          column: 32,
        },
        end: {
          line: 121,
          column: 32,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 121,
          column: 34,
        },
        end: {
          line: 121,
          column: 39,
        },
        value: '0x0101',
      },
      {
        type: 'operator',
        start: {
          line: 121,
          column: 41,
        },
        end: {
          line: 121,
          column: 41,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 122,
          column: 7,
        },
        end: {
          line: 122,
          column: 14,
        },
        value: 'playerId',
      },
      {
        type: 'ident',
        start: {
          line: 122,
          column: 16,
        },
        end: {
          line: 122,
          column: 24,
        },
        value: 'recipient',
      },
      {
        type: 'ident',
        start: {
          line: 123,
          column: 7,
        },
        end: {
          line: 123,
          column: 12,
        },
        value: 'string',
      },
      {
        type: 'ident',
        start: {
          line: 123,
          column: 16,
        },
        end: {
          line: 123,
          column: 19,
        },
        value: 'text',
      },
      {
        type: 'operator',
        start: {
          line: 124,
          column: 5,
        },
        end: {
          line: 124,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'operator',
        start: {
          line: 125,
          column: 3,
        },
        end: {
          line: 125,
          column: 3,
        },
        value: '}',
      },
      {
        type: 'comment',
        start: {
          line: 127,
          column: 3,
        },
        end: {
          line: 127,
          column: 44,
        },
        value: ' Unreliable client messages, from 0x1000',
      },
      {
        type: 'operator',
        start: {
          line: 128,
          column: 3,
        },
        end: {
          line: 128,
          column: 3,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 129,
          column: 5,
        },
        end: {
          line: 129,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 129,
          column: 13,
        },
        end: {
          line: 129,
          column: 23,
        },
        value: 'playerInput',
      },
      {
        type: 'operator',
        start: {
          line: 129,
          column: 25,
        },
        end: {
          line: 129,
          column: 25,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 129,
          column: 27,
        },
        end: {
          line: 129,
          column: 32,
        },
        value: '0x1000',
      },
      {
        type: 'operator',
        start: {
          line: 129,
          column: 34,
        },
        end: {
          line: 129,
          column: 34,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 130,
          column: 7,
        },
        end: {
          line: 130,
          column: 13,
        },
        value: 'float32',
      },
      {
        type: 'ident',
        start: {
          line: 130,
          column: 15,
        },
        end: {
          line: 130,
          column: 19,
        },
        value: 'angle',
      },
      {
        type: 'ident',
        start: {
          line: 131,
          column: 7,
        },
        end: {
          line: 131,
          column: 13,
        },
        value: 'float32',
      },
      {
        type: 'ident',
        start: {
          line: 131,
          column: 15,
        },
        end: {
          line: 131,
          column: 20,
        },
        value: 'scalar',
      },
      {
        type: 'comment',
        start: {
          line: 131,
          column: 22,
        },
        end: {
          line: 131,
          column: 41,
        },
        value: ' clipped to [0, 1]',
      },
      {
        type: 'operator',
        start: {
          line: 132,
          column: 5,
        },
        end: {
          line: 132,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 134,
          column: 5,
        },
        end: {
          line: 134,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 134,
          column: 13,
        },
        end: {
          line: 134,
          column: 26,
        },
        value: 'useItemOnField',
      },
      {
        type: 'operator',
        start: {
          line: 134,
          column: 28,
        },
        end: {
          line: 134,
          column: 28,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 134,
          column: 30,
        },
        end: {
          line: 134,
          column: 35,
        },
        value: '0x1001',
      },
      {
        type: 'operator',
        start: {
          line: 134,
          column: 37,
        },
        end: {
          line: 134,
          column: 37,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 135,
          column: 7,
        },
        end: {
          line: 135,
          column: 12,
        },
        value: 'itemId',
      },
      {
        type: 'ident',
        start: {
          line: 135,
          column: 14,
        },
        end: {
          line: 135,
          column: 15,
        },
        value: 'id',
      },
      {
        type: 'ident',
        start: {
          line: 136,
          column: 7,
        },
        end: {
          line: 136,
          column: 11,
        },
        value: 'int16',
      },
      {
        type: 'ident',
        start: {
          line: 136,
          column: 14,
        },
        end: {
          line: 136,
          column: 14,
        },
        value: 'x',
      },
      {
        type: 'ident',
        start: {
          line: 137,
          column: 7,
        },
        end: {
          line: 137,
          column: 11,
        },
        value: 'int16',
      },
      {
        type: 'ident',
        start: {
          line: 137,
          column: 14,
        },
        end: {
          line: 137,
          column: 14,
        },
        value: 'y',
      },
      {
        type: 'operator',
        start: {
          line: 138,
          column: 5,
        },
        end: {
          line: 138,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'operator',
        start: {
          line: 139,
          column: 3,
        },
        end: {
          line: 139,
          column: 3,
        },
        value: '}',
      },
      {
        type: 'operator',
        start: {
          line: 140,
          column: 1,
        },
        end: {
          line: 140,
          column: 1,
        },
        value: '}',
      },
      {
        type: 'operator',
        start: {
          line: 142,
          column: 1,
        },
        end: {
          line: 142,
          column: 1,
        },
        value: '[',
      },
      {
        type: 'ident',
        start: {
          line: 142,
          column: 2,
        },
        end: {
          line: 142,
          column: 5,
        },
        value: 'read',
      },
      {
        type: 'operator',
        start: {
          line: 142,
          column: 6,
        },
        end: {
          line: 142,
          column: 6,
        },
        value: '(',
      },
      {
        type: 'ident',
        start: {
          line: 142,
          column: 7,
        },
        end: {
          line: 142,
          column: 12,
        },
        value: 'client',
      },
      {
        type: 'operator',
        start: {
          line: 142,
          column: 13,
        },
        end: {
          line: 142,
          column: 13,
        },
        value: ')',
      },
      {
        type: 'operator',
        start: {
          line: 142,
          column: 14,
        },
        end: {
          line: 142,
          column: 14,
        },
        value: ']',
      },
      {
        type: 'operator',
        start: {
          line: 143,
          column: 1,
        },
        end: {
          line: 143,
          column: 1,
        },
        value: '[',
      },
      {
        type: 'ident',
        start: {
          line: 143,
          column: 2,
        },
        end: {
          line: 143,
          column: 6,
        },
        value: 'write',
      },
      {
        type: 'operator',
        start: {
          line: 143,
          column: 7,
        },
        end: {
          line: 143,
          column: 7,
        },
        value: '(',
      },
      {
        type: 'ident',
        start: {
          line: 143,
          column: 8,
        },
        end: {
          line: 143,
          column: 13,
        },
        value: 'server',
      },
      {
        type: 'operator',
        start: {
          line: 143,
          column: 14,
        },
        end: {
          line: 143,
          column: 14,
        },
        value: ')',
      },
      {
        type: 'operator',
        start: {
          line: 143,
          column: 15,
        },
        end: {
          line: 143,
          column: 15,
        },
        value: ']',
      },
      {
        type: 'operator',
        start: {
          line: 144,
          column: 1,
        },
        end: {
          line: 144,
          column: 1,
        },
        value: '{',
      },
      {
        type: 'comment',
        start: {
          line: 145,
          column: 3,
        },
        end: {
          line: 145,
          column: 42,
        },
        value: ' Reliable server messages, from 0x2000',
      },
      {
        type: 'operator',
        start: {
          line: 146,
          column: 3,
        },
        end: {
          line: 146,
          column: 3,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 147,
          column: 5,
        },
        end: {
          line: 147,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 147,
          column: 13,
        },
        end: {
          line: 147,
          column: 17,
        },
        value: 'error',
      },
      {
        type: 'operator',
        start: {
          line: 147,
          column: 19,
        },
        end: {
          line: 147,
          column: 19,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 147,
          column: 21,
        },
        end: {
          line: 147,
          column: 26,
        },
        value: '0x2000',
      },
      {
        type: 'operator',
        start: {
          line: 147,
          column: 28,
        },
        end: {
          line: 147,
          column: 28,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 148,
          column: 7,
        },
        end: {
          line: 148,
          column: 10,
        },
        value: 'enum',
      },
      {
        type: 'operator',
        start: {
          line: 148,
          column: 12,
        },
        end: {
          line: 148,
          column: 12,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 149,
          column: 9,
        },
        end: {
          line: 149,
          column: 28,
        },
        value: 'UNKNOWN_MESSAGE_TYPE',
      },
      {
        type: 'operator',
        start: {
          line: 149,
          column: 30,
        },
        end: {
          line: 149,
          column: 30,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 149,
          column: 32,
        },
        end: {
          line: 149,
          column: 37,
        },
        value: '0x0000',
      },
      {
        type: 'ident',
        start: {
          line: 150,
          column: 9,
        },
        end: {
          line: 150,
          column: 23,
        },
        value: 'INVALID_MESSAGE',
      },
      {
        type: 'operator',
        start: {
          line: 150,
          column: 30,
        },
        end: {
          line: 150,
          column: 30,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 150,
          column: 32,
        },
        end: {
          line: 150,
          column: 37,
        },
        value: '0x0001',
      },
      {
        type: 'ident',
        start: {
          line: 151,
          column: 9,
        },
        end: {
          line: 151,
          column: 20,
        },
        value: 'SERVER_ERROR',
      },
      {
        type: 'operator',
        start: {
          line: 151,
          column: 30,
        },
        end: {
          line: 151,
          column: 30,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 151,
          column: 32,
        },
        end: {
          line: 151,
          column: 37,
        },
        value: '0x0002',
      },
      {
        type: 'operator',
        start: {
          line: 152,
          column: 7,
        },
        end: {
          line: 152,
          column: 7,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 152,
          column: 9,
        },
        end: {
          line: 152,
          column: 17,
        },
        value: 'errorCode',
      },
      {
        type: 'operator',
        start: {
          line: 153,
          column: 5,
        },
        end: {
          line: 153,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 155,
          column: 5,
        },
        end: {
          line: 155,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 155,
          column: 13,
        },
        end: {
          line: 155,
          column: 28,
        },
        value: 'registerResponse',
      },
      {
        type: 'operator',
        start: {
          line: 155,
          column: 30,
        },
        end: {
          line: 155,
          column: 30,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 155,
          column: 32,
        },
        end: {
          line: 155,
          column: 37,
        },
        value: '0x2001',
      },
      {
        type: 'operator',
        start: {
          line: 155,
          column: 39,
        },
        end: {
          line: 155,
          column: 39,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 156,
          column: 7,
        },
        end: {
          line: 156,
          column: 10,
        },
        value: 'enum',
      },
      {
        type: 'operator',
        start: {
          line: 156,
          column: 12,
        },
        end: {
          line: 156,
          column: 12,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 157,
          column: 9,
        },
        end: {
          line: 157,
          column: 10,
        },
        value: 'OK',
      },
      {
        type: 'operator',
        start: {
          line: 157,
          column: 26,
        },
        end: {
          line: 157,
          column: 26,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 157,
          column: 28,
        },
        end: {
          line: 157,
          column: 31,
        },
        value: '0x00',
      },
      {
        type: 'ident',
        start: {
          line: 158,
          column: 9,
        },
        end: {
          line: 158,
          column: 24,
        },
        value: 'NICK_UNAVAILABLE',
      },
      {
        type: 'operator',
        start: {
          line: 158,
          column: 26,
        },
        end: {
          line: 158,
          column: 26,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 158,
          column: 28,
        },
        end: {
          line: 158,
          column: 31,
        },
        value: '0x01',
      },
      {
        type: 'ident',
        start: {
          line: 159,
          column: 9,
        },
        end: {
          line: 159,
          column: 24,
        },
        value: 'INVALID_PASSWORD',
      },
      {
        type: 'operator',
        start: {
          line: 159,
          column: 26,
        },
        end: {
          line: 159,
          column: 26,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 159,
          column: 28,
        },
        end: {
          line: 159,
          column: 31,
        },
        value: '0x02',
      },
      {
        type: 'operator',
        start: {
          line: 160,
          column: 7,
        },
        end: {
          line: 160,
          column: 7,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 160,
          column: 9,
        },
        end: {
          line: 160,
          column: 20,
        },
        value: 'responseCode',
      },
      {
        type: 'operator',
        start: {
          line: 161,
          column: 5,
        },
        end: {
          line: 161,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 163,
          column: 5,
        },
        end: {
          line: 163,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 163,
          column: 13,
        },
        end: {
          line: 163,
          column: 33,
        },
        value: 'nickAvailableResponse',
      },
      {
        type: 'operator',
        start: {
          line: 163,
          column: 35,
        },
        end: {
          line: 163,
          column: 35,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 163,
          column: 37,
        },
        end: {
          line: 163,
          column: 42,
        },
        value: '0x2002',
      },
      {
        type: 'operator',
        start: {
          line: 163,
          column: 44,
        },
        end: {
          line: 163,
          column: 44,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 164,
          column: 7,
        },
        end: {
          line: 164,
          column: 17,
        },
        value: 'shortString',
      },
      {
        type: 'ident',
        start: {
          line: 164,
          column: 19,
        },
        end: {
          line: 164,
          column: 22,
        },
        value: 'nick',
      },
      {
        type: 'ident',
        start: {
          line: 165,
          column: 7,
        },
        end: {
          line: 165,
          column: 10,
        },
        value: 'bool',
      },
      {
        type: 'ident',
        start: {
          line: 165,
          column: 19,
        },
        end: {
          line: 165,
          column: 29,
        },
        value: 'isAvailable',
      },
      {
        type: 'operator',
        start: {
          line: 166,
          column: 5,
        },
        end: {
          line: 166,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 168,
          column: 5,
        },
        end: {
          line: 168,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 168,
          column: 13,
        },
        end: {
          line: 168,
          column: 25,
        },
        value: 'loginResponse',
      },
      {
        type: 'operator',
        start: {
          line: 168,
          column: 27,
        },
        end: {
          line: 168,
          column: 27,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 168,
          column: 29,
        },
        end: {
          line: 168,
          column: 34,
        },
        value: '0x2003',
      },
      {
        type: 'operator',
        start: {
          line: 168,
          column: 36,
        },
        end: {
          line: 168,
          column: 36,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 169,
          column: 7,
        },
        end: {
          line: 169,
          column: 10,
        },
        value: 'enum',
      },
      {
        type: 'operator',
        start: {
          line: 169,
          column: 12,
        },
        end: {
          line: 169,
          column: 12,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 170,
          column: 9,
        },
        end: {
          line: 170,
          column: 10,
        },
        value: 'OK',
      },
      {
        type: 'operator',
        start: {
          line: 170,
          column: 29,
        },
        end: {
          line: 170,
          column: 29,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 170,
          column: 31,
        },
        end: {
          line: 170,
          column: 34,
        },
        value: '0x00',
      },
      {
        type: 'ident',
        start: {
          line: 171,
          column: 9,
        },
        end: {
          line: 171,
          column: 27,
        },
        value: 'INVALID_CREDENTIALS',
      },
      {
        type: 'operator',
        start: {
          line: 171,
          column: 29,
        },
        end: {
          line: 171,
          column: 29,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 171,
          column: 31,
        },
        end: {
          line: 171,
          column: 34,
        },
        value: '0x01',
      },
      {
        type: 'ident',
        start: {
          line: 172,
          column: 9,
        },
        end: {
          line: 172,
          column: 25,
        },
        value: 'ALREADY_LOGGED_IN',
      },
      {
        type: 'operator',
        start: {
          line: 172,
          column: 29,
        },
        end: {
          line: 172,
          column: 29,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 172,
          column: 31,
        },
        end: {
          line: 172,
          column: 34,
        },
        value: '0x02',
      },
      {
        type: 'operator',
        start: {
          line: 173,
          column: 7,
        },
        end: {
          line: 173,
          column: 7,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 173,
          column: 9,
        },
        end: {
          line: 173,
          column: 20,
        },
        value: 'responseCode',
      },
      {
        type: 'operator',
        start: {
          line: 174,
          column: 5,
        },
        end: {
          line: 174,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 176,
          column: 5,
        },
        end: {
          line: 176,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 176,
          column: 13,
        },
        end: {
          line: 176,
          column: 27,
        },
        value: 'messageReceived',
      },
      {
        type: 'operator',
        start: {
          line: 176,
          column: 29,
        },
        end: {
          line: 176,
          column: 29,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 176,
          column: 31,
        },
        end: {
          line: 176,
          column: 36,
        },
        value: '0x2100',
      },
      {
        type: 'operator',
        start: {
          line: 176,
          column: 38,
        },
        end: {
          line: 176,
          column: 38,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 177,
          column: 7,
        },
        end: {
          line: 177,
          column: 10,
        },
        value: 'bool',
      },
      {
        type: 'ident',
        start: {
          line: 177,
          column: 16,
        },
        end: {
          line: 177,
          column: 24,
        },
        value: 'isPrivate',
      },
      {
        type: 'ident',
        start: {
          line: 178,
          column: 7,
        },
        end: {
          line: 178,
          column: 14,
        },
        value: 'playerId',
      },
      {
        type: 'ident',
        start: {
          line: 178,
          column: 16,
        },
        end: {
          line: 178,
          column: 21,
        },
        value: 'sender',
      },
      {
        type: 'ident',
        start: {
          line: 179,
          column: 7,
        },
        end: {
          line: 179,
          column: 12,
        },
        value: 'string',
      },
      {
        type: 'ident',
        start: {
          line: 179,
          column: 16,
        },
        end: {
          line: 179,
          column: 19,
        },
        value: 'text',
      },
      {
        type: 'operator',
        start: {
          line: 180,
          column: 5,
        },
        end: {
          line: 180,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'operator',
        start: {
          line: 181,
          column: 3,
        },
        end: {
          line: 181,
          column: 3,
        },
        value: '}',
      },
      {
        type: 'comment',
        start: {
          line: 183,
          column: 3,
        },
        end: {
          line: 183,
          column: 44,
        },
        value: ' Unreliable server messages, from 0x3000',
      },
      {
        type: 'operator',
        start: {
          line: 184,
          column: 3,
        },
        end: {
          line: 184,
          column: 3,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 185,
          column: 5,
        },
        end: {
          line: 185,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 185,
          column: 13,
        },
        end: {
          line: 185,
          column: 22,
        },
        value: 'worldState',
      },
      {
        type: 'operator',
        start: {
          line: 185,
          column: 24,
        },
        end: {
          line: 185,
          column: 24,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 185,
          column: 26,
        },
        end: {
          line: 185,
          column: 31,
        },
        value: '0x3000',
      },
      {
        type: 'operator',
        start: {
          line: 185,
          column: 33,
        },
        end: {
          line: 185,
          column: 33,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 186,
          column: 7,
        },
        end: {
          line: 186,
          column: 17,
        },
        value: 'mapFragment',
      },
      {
        type: 'ident',
        start: {
          line: 186,
          column: 21,
        },
        end: {
          line: 186,
          column: 31,
        },
        value: 'mapFragment',
      },
      {
        type: 'ident',
        start: {
          line: 187,
          column: 7,
        },
        end: {
          line: 187,
          column: 19,
        },
        value: 'currentPlayer',
      },
      {
        type: 'ident',
        start: {
          line: 187,
          column: 21,
        },
        end: {
          line: 187,
          column: 33,
        },
        value: 'currentPlayer',
      },
      {
        type: 'ident',
        start: {
          line: 188,
          column: 7,
        },
        end: {
          line: 188,
          column: 10,
        },
        value: 'list',
      },
      {
        type: 'operator',
        start: {
          line: 188,
          column: 11,
        },
        end: {
          line: 188,
          column: 11,
        },
        value: '<',
      },
      {
        type: 'ident',
        start: {
          line: 188,
          column: 12,
        },
        end: {
          line: 188,
          column: 17,
        },
        value: 'player',
      },
      {
        type: 'operator',
        start: {
          line: 188,
          column: 18,
        },
        end: {
          line: 188,
          column: 18,
        },
        value: '>',
      },
      {
        type: 'ident',
        start: {
          line: 188,
          column: 21,
        },
        end: {
          line: 188,
          column: 27,
        },
        value: 'players',
      },
      {
        type: 'operator',
        start: {
          line: 189,
          column: 5,
        },
        end: {
          line: 189,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 191,
          column: 5,
        },
        end: {
          line: 191,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 191,
          column: 13,
        },
        end: {
          line: 191,
          column: 21,
        },
        value: 'timestamp',
      },
      {
        type: 'operator',
        start: {
          line: 191,
          column: 23,
        },
        end: {
          line: 191,
          column: 23,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 191,
          column: 25,
        },
        end: {
          line: 191,
          column: 30,
        },
        value: '0x3001',
      },
      {
        type: 'operator',
        start: {
          line: 191,
          column: 32,
        },
        end: {
          line: 191,
          column: 32,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 192,
          column: 7,
        },
        end: {
          line: 192,
          column: 13,
        },
        value: 'float64',
      },
      {
        type: 'ident',
        start: {
          line: 192,
          column: 15,
        },
        end: {
          line: 192,
          column: 18,
        },
        value: 'time',
      },
      {
        type: 'operator',
        start: {
          line: 193,
          column: 5,
        },
        end: {
          line: 193,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'operator',
        start: {
          line: 194,
          column: 3,
        },
        end: {
          line: 194,
          column: 3,
        },
        value: '}',
      },
      {
        type: 'comment',
        start: {
          line: 196,
          column: 3,
        },
        end: {
          line: 196,
          column: 50,
        },
        value: ' Unreliable server debug messages, from 0x7000',
      },
      {
        type: 'operator',
        start: {
          line: 197,
          column: 3,
        },
        end: {
          line: 197,
          column: 3,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 198,
          column: 5,
        },
        end: {
          line: 198,
          column: 10,
        },
        value: 'struct',
      },
      {
        type: 'ident',
        start: {
          line: 198,
          column: 12,
        },
        end: {
          line: 198,
          column: 22,
        },
        value: 'debugMarker',
      },
      {
        type: 'operator',
        start: {
          line: 198,
          column: 24,
        },
        end: {
          line: 198,
          column: 24,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 199,
          column: 7,
        },
        end: {
          line: 199,
          column: 13,
        },
        value: 'float32',
      },
      {
        type: 'ident',
        start: {
          line: 199,
          column: 15,
        },
        end: {
          line: 199,
          column: 15,
        },
        value: 'x',
      },
      {
        type: 'ident',
        start: {
          line: 200,
          column: 7,
        },
        end: {
          line: 200,
          column: 13,
        },
        value: 'float32',
      },
      {
        type: 'ident',
        start: {
          line: 200,
          column: 15,
        },
        end: {
          line: 200,
          column: 15,
        },
        value: 'y',
      },
      {
        type: 'ident',
        start: {
          line: 201,
          column: 7,
        },
        end: {
          line: 201,
          column: 12,
        },
        value: 'uint16',
      },
      {
        type: 'ident',
        start: {
          line: 201,
          column: 15,
        },
        end: {
          line: 201,
          column: 17,
        },
        value: 'hue',
      },
      {
        type: 'operator',
        start: {
          line: 202,
          column: 5,
        },
        end: {
          line: 202,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 204,
          column: 5,
        },
        end: {
          line: 204,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 204,
          column: 13,
        },
        end: {
          line: 204,
          column: 24,
        },
        value: 'debugMarkers',
      },
      {
        type: 'operator',
        start: {
          line: 204,
          column: 26,
        },
        end: {
          line: 204,
          column: 26,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 204,
          column: 28,
        },
        end: {
          line: 204,
          column: 33,
        },
        value: '0x7000',
      },
      {
        type: 'operator',
        start: {
          line: 204,
          column: 35,
        },
        end: {
          line: 204,
          column: 35,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 205,
          column: 7,
        },
        end: {
          line: 205,
          column: 10,
        },
        value: 'list',
      },
      {
        type: 'operator',
        start: {
          line: 205,
          column: 11,
        },
        end: {
          line: 205,
          column: 11,
        },
        value: '<',
      },
      {
        type: 'ident',
        start: {
          line: 205,
          column: 12,
        },
        end: {
          line: 205,
          column: 22,
        },
        value: 'debugMarker',
      },
      {
        type: 'operator',
        start: {
          line: 205,
          column: 23,
        },
        end: {
          line: 205,
          column: 23,
        },
        value: '>',
      },
      {
        type: 'ident',
        start: {
          line: 205,
          column: 25,
        },
        end: {
          line: 205,
          column: 31,
        },
        value: 'markers',
      },
      {
        type: 'operator',
        start: {
          line: 206,
          column: 5,
        },
        end: {
          line: 206,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'ident',
        start: {
          line: 208,
          column: 5,
        },
        end: {
          line: 208,
          column: 11,
        },
        value: 'message',
      },
      {
        type: 'ident',
        start: {
          line: 208,
          column: 13,
        },
        end: {
          line: 208,
          column: 28,
        },
        value: 'debugVarDumpJSON',
      },
      {
        type: 'operator',
        start: {
          line: 208,
          column: 30,
        },
        end: {
          line: 208,
          column: 30,
        },
        value: '=',
      },
      {
        type: 'number',
        start: {
          line: 208,
          column: 32,
        },
        end: {
          line: 208,
          column: 37,
        },
        value: '0x7001',
      },
      {
        type: 'operator',
        start: {
          line: 208,
          column: 39,
        },
        end: {
          line: 208,
          column: 39,
        },
        value: '{',
      },
      {
        type: 'ident',
        start: {
          line: 209,
          column: 7,
        },
        end: {
          line: 209,
          column: 12,
        },
        value: 'string',
      },
      {
        type: 'ident',
        start: {
          line: 209,
          column: 14,
        },
        end: {
          line: 209,
          column: 17,
        },
        value: 'vars',
      },
      {
        type: 'operator',
        start: {
          line: 210,
          column: 5,
        },
        end: {
          line: 210,
          column: 5,
        },
        value: '}',
      },
      {
        type: 'operator',
        start: {
          line: 211,
          column: 3,
        },
        end: {
          line: 211,
          column: 3,
        },
        value: '}',
      },
      {
        type: 'operator',
        start: {
          line: 212,
          column: 1,
        },
        end: {
          line: 212,
          column: 1,
        },
        value: '}',
      },
    ],
  },
};
