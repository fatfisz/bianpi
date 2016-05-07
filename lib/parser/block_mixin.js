import { isToken } from 'lib/util/tokens.js';


export default function blockParserMixin(Parser) {
  return class extends Parser {
    parseBlock() {
      const openingBrace = this.popToken();
      const declarations = this.parseDeclarations();

      this.expectToken(
        'block',
        openingBrace,
        'ending with a closing brace \'}\''
      );
      const closingBrace = this.popToken();
      if (!isToken(closingBrace, 'operator', '}')) {
        throw this.getUnexpectedError(
          'a closing brace \'}\' for a block',
          closingBrace
        );
      }

      return {
        type: 'block',
        start: openingBrace.start,
        end: closingBrace.end,
        props: { declarations },
      };
    }
  };
}
