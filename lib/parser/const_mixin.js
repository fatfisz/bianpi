import operatorToLabel from 'lib/util/operator_to_label.js';
import { isOperator } from 'lib/util/tokens.js';


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
        'the const name',
        name,
        `followed by ${operatorToLabel['=']}`
      );
      const assignment = this.popToken();
      if (!isOperator(assignment, '=')) {
        throw this.getUnexpectedError(
          `${operatorToLabel['=']} after a const name`,
          assignment
        );
      }

      this.expectToken(
        operatorToLabel['='],
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
