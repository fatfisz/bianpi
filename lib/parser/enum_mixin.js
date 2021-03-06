import hexLengthToLabel from 'lib/util/hex_length_to_label.js';
import operatorToLabel from 'lib/util/operator_to_label.js';
import { isOperator, isRestrictedHexNumber } from 'lib/util/tokens.js';


export default function enumParserMixin(Parser) {
  return class extends Parser {
    parseEnum() {
      const enumKeyword = this.popToken();

      this.expectToken(
        'the \'enum\' keyword',
        enumKeyword,
        'followed by an enum name'
      );
      const name = this.parseIdent('an enum name');

      this.expectToken(
        'the enum name',
        name,
        `followed by ${operatorToLabel['{']}`
      );
      const openingBrace = this.popToken();
      if (!isOperator(openingBrace, '{')) {
        throw this.getUnexpectedError(
          `${operatorToLabel['{']} after an enum name`,
          openingBrace
        );
      }

      this.expectToken(
        operatorToLabel['{'],
        openingBrace,
        'followed by enum values'
      );
      const values = [this.parseEnumValue()];
      const expectedLength = values[0].value.value.length - 2;
      let finished = false;

      while (!finished) {
        this.expectToken(
          'the enum declaration',
          enumKeyword,
          `ending with ${operatorToLabel['}']}`
        );
        const closingBrace = this.peekToken();

        if (isOperator(closingBrace, '}')) {
          finished = true;
        } else {
          values.push(this.parseEnumValue(expectedLength));
        }
      }

      const closingBrace = this.popToken();

      return {
        type: 'enum',
        start: enumKeyword.start,
        end: closingBrace.end,
        props: {
          name,
          values,
          length: expectedLength,
          type: `uint${expectedLength * 8}`,
        },
      };
    }

    parseEnumValue(expectedLength = null) {
      const name = this.parseIdent('an enum value name');

      this.expectToken(
        'the enum value name',
        name,
        `followed by ${operatorToLabel['=']}`
      );
      const assignment = this.popToken();
      if (!isOperator(assignment, '=')) {
        throw this.getUnexpectedError(
          `${operatorToLabel['=']} after an enum value name`,
          assignment
        );
      }

      const derivedInfo = expectedLength === null ?
        '' :
        ' (derived from preceding values)';
      const expectedNumber =
        `${hexLengthToLabel[expectedLength]} hexadecimal number`;

      this.expectToken(
        operatorToLabel['='],
        assignment,
        `followed by ${expectedNumber}${derivedInfo}`
      );
      const value = this.popToken();
      if (!isRestrictedHexNumber(value, expectedLength)) {
        throw this.getUnexpectedError(
          `${expectedNumber} for an enum value${derivedInfo}`,
          value
        );
      }

      return { name, value };
    }
  };
}
