import operatorToLabel from 'lib/util/operator_to_label.js';
import { isOperator } from 'lib/util/tokens.js';


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
      if (!isOperator(openingBrace, '{')) {
        throw this.getUnexpectedError(
          `${operatorToLabel['{']} after a struct name`,
          openingBrace
        );
      }

      const fields = [];
      let finished = false;

      while (!finished) {
        this.expectToken(
          'the struct declaration',
          structKeyword,
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
        type: 'struct',
        start: structKeyword.start,
        end: closingBrace.end,
        props: Object.assign({ fields }, name.props),
      };
    }
  };
}
