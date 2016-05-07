import hexLengthToLabel from 'lib/util/hex_length_to_label.js';
import { isToken, isRestrictedHexNumber } from 'lib/util/tokens.js';


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
        'message name',
        name,
        'followed by an assignment operator \'=\''
      );
      const assignment = this.popToken();
      if (!isToken(assignment, 'operator', '=')) {
        throw this.getUnexpectedError(
          'an assignment operator \'=\' after a message name',
          assignment
        );
      }

      const expectedNumber =
        `${hexLengthToLabel[this.messageIdLength]} hexadecimal number`;

      this.expectToken(
        'an assignment operator \'=\'',
        assignment,
        `followed by ${expectedNumber}`
      );
      const id = this.popToken();
      if (!isRestrictedHexNumber(id, this.messageIdLength)) {
        throw this.getUnexpectedError(`${expectedNumber} for a message id`, id);
      }

      this.expectToken(
        'message id',
        id,
        'followed by an opening brace \'{\''
      );
      const openingBrace = this.popToken();
      if (!isToken(openingBrace, 'operator', '{')) {
        throw this.getUnexpectedError(
          'an opening brace \'{\' after a message id',
          openingBrace
        );
      }

      const fields = [];

      this.expectToken(
        'message declaration',
        messageKeyword,
        'ending with a closing brace \'}\''
      );
      let closingBrace = this.peekToken();

      while (!isToken(closingBrace, 'operator', '}')) {
        fields.push(this.parseField());

        this.expectToken(
          'message declaration',
          messageKeyword,
          'ending with a closing brace \'}\''
        );
        closingBrace = this.peekToken();
      }

      this.popToken();

      return {
        type: 'message',
        start: messageKeyword.start,
        end: closingBrace.end,
        props: { name, id, fields },
      };
    }
  };
}
