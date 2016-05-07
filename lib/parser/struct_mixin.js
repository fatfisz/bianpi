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
        'struct name',
        name,
        'followed by an opening brace \'{\''
      );
      const openingBrace = this.popToken();
      if (!isToken(openingBrace, 'operator', '{')) {
        throw this.getUnexpectedError(
          'an opening brace \'{\' after a struct name',
          openingBrace
        );
      }

      const fields = [];

      this.expectToken(
        'struct declaration',
        structKeyword,
        'ending with a closing brace \'}\''
      );
      let closingBrace = this.peekToken();

      while (!isToken(closingBrace, 'operator', '}')) {
        fields.push(this.parseField());

        this.expectToken(
          'struct declaration',
          structKeyword,
          'ending with a closing brace \'}\''
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
