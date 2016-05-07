import operatorToLabel from 'lib/util/operator_to_label.js';
import { isToken } from 'lib/util/tokens.js';


export default function structParserMixin(Parser) {
  return class extends Parser {
    parseStruct() {
      const structKeyword = this.popToken();

      this.expectToken(
        'the \'struct\' keyword',
        structKeyword,
        'followed by a struct name'
      );
      const name = this.parseStructName();

      this.expectToken(
        'the struct name',
        name,
        `followed by ${operatorToLabel['{']}`
      );
      const openingBrace = this.popToken();
      if (!isToken(openingBrace, 'operator', '{')) {
        throw this.getUnexpectedError(
          `${operatorToLabel['{']} after a struct name`,
          openingBrace
        );
      }

      const fields = [];

      this.expectToken(
        'the struct declaration',
        structKeyword,
        `ending with ${operatorToLabel['}']}`
      );
      let closingBrace = this.peekToken();

      while (!isToken(closingBrace, 'operator', '}')) {
        fields.push(this.parseField());

        this.expectToken(
          'the struct declaration',
          structKeyword,
          `ending with ${operatorToLabel['}']}`
        );
        closingBrace = this.peekToken();
      }

      this.popToken();

      return {
        type: 'struct',
        start: structKeyword.start,
        end: closingBrace.end,
        props: { name, fields },
      };
    }
  };
}
