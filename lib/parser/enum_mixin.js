import hexLengthToLabel from 'lib/util/hex_length_to_label.js';
import operatorToLabel from 'lib/util/operator_to_label.js';
import { isToken, isRestrictedHexNumber } from 'lib/util/tokens.js';


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
      if (!isToken(openingBrace, 'operator', '{')) {
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
      const expectedLength = values[0].props.value.value.length - 2;

      this.expectToken(
        'the enum declaration',
        enumKeyword,
        `ending with ${operatorToLabel['}']}`
      );
      let closingBrace = this.peekToken();

      while (!isToken(closingBrace, 'operator', '}')) {
        values.push(this.parseEnumValue(expectedLength));

        this.expectToken(
          'the enum declaration',
          enumKeyword,
          `ending with ${operatorToLabel['}']}`
        );
        closingBrace = this.peekToken();
      }

      this.popToken();

      return {
        type: 'enum',
        start: enumKeyword.start,
        end: closingBrace.end,
        props: { name, values },
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
      if (!isToken(assignment, 'operator', '=')) {
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

      return {
        type: 'enumValue',
        start: name.start,
        end: value.end,
        props: { name, value },
      };
    }
  };
}
