import { isToken } from 'lib/util/tokens.js';


export default function constParserMixin(Parser) {
  return class extends Parser {
    parseConst() {
      const constKeyword = this.popToken();

      this.expectToken(
        'the \'const\' keyword',
        constKeyword,
        'followed by a const name'
      );
      const name = this.parseIdent('a const name');

      this.expectToken(
        'const name',
        name,
        'followed by an assignment operator \'=\''
      );
      const assignment = this.popToken();
      if (!isToken(assignment, 'operator', '=')) {
        throw this.getUnexpectedError(
          'an assignment operator \'=\' after a const name',
          assignment
        );
      }

      this.expectToken(
        'an assignment operator \'=\'',
        assignment,
        'followed by an expression'
      );
      const expression = this.parseExpression();

      return {
        type: 'const',
        start: constKeyword.start,
        end: expression.end,
        props: { name, expression },
      };
    }
  };
}
