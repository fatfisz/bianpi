import hexLengthToLabel from 'lib/util/hex_length_to_label.js';
import operatorToLabel from 'lib/util/operator_to_label.js';
import { isOperator, isRestrictedHexNumber } from 'lib/util/tokens.js';


export default function messageParserMixin(Parser) {
  return class extends Parser {
    parseMessage() {
      const messageKeyword = this.popToken();

      this.expectToken(
        'the \'message\' keyword',
        messageKeyword,
        'followed by a message name'
      );
      const name = this.parseIdent('a message name');

      this.expectToken(
        'the message name',
        name,
        `followed by ${operatorToLabel['=']}`
      );
      const assignment = this.popToken();
      if (!isOperator(assignment, '=')) {
        throw this.getUnexpectedError(
          `${operatorToLabel['=']} after a message name`,
          assignment
        );
      }

      const expectedNumber =
        `${hexLengthToLabel[this.messageIdLength]} hexadecimal number`;

      this.expectToken(
        operatorToLabel['='],
        assignment,
        `followed by ${expectedNumber}`
      );
      const id = this.popToken();
      if (!isRestrictedHexNumber(id, this.messageIdLength)) {
        throw this.getUnexpectedError(`${expectedNumber} for a message id`, id);
      }

      this.expectToken(
        'the message id',
        id,
        `followed by ${operatorToLabel['{']}`
      );
      const openingBrace = this.popToken();
      if (!isOperator(openingBrace, '{')) {
        throw this.getUnexpectedError(
          `${operatorToLabel['{']} after a message id`,
          openingBrace
        );
      }

      const fields = [];
      let finished = false;

      while (!finished) {
        this.expectToken(
          'the message declaration',
          messageKeyword,
          `ending with ${operatorToLabel['}']}`
        );
        const closingBrace = this.peekToken();

        if (isOperator(closingBrace, '}')) {
          finished = true;
        } else {
          fields.push(this.parseField());
        }
      }

      const closingBrace = this.popToken();

      return {
        type: 'message',
        start: messageKeyword.start,
        end: closingBrace.end,
        props: { name, id, fields },
      };
    }
  };
}
