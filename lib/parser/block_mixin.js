import operatorToLabel from 'lib/util/operator_to_label.js';
import { isToken } from 'lib/util/tokens.js';


export default function blockParserMixin(Parser) {
  return class extends Parser {
    parseBlock() {
      const openingBrace = this.popToken();
      const declarations = this.parseDeclarations();

      this.expectToken(
        'the block',
        openingBrace,
        `ending with ${operatorToLabel['}']}`
      );
      const closingBrace = this.popToken();
      if (!isToken(closingBrace, 'operator', '}')) {
        throw this.getUnexpectedError(
          `${operatorToLabel['}']} for a block`,
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
