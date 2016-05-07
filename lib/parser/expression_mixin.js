import operatorToLabel from 'lib/util/operator_to_label.js';
import {
  isToken,
  isExpressionOperator,
  isPrimitiveExpressionValue,
} from 'lib/util/tokens.js';


export default function expressionParserMixin(Parser) {
  return class extends Parser {
    parseExpression() {
      const firstValue = this.parseExpressionValue();
      const elements = [firstValue];
      let operator;

      if (this.hasTokens) {
        operator = this.peekToken();

        while (isExpressionOperator(operator)) {
          elements.push(this.popToken());

          this.expectToken(
            operatorToLabel[operator.value],
            operator,
            'followed by a value'
          );
          elements.push(this.parseExpressionValue());

          if (this.hasTokens) {
            operator = this.peekToken();
          } else {
            break;
          }
        }
      }

      return {
        type: 'expression',
        start: firstValue.start,
        end: elements[elements.length - 1].end,
        props: { elements },
      };
    }

    parseExpressionValue() {
      const value = this.popToken();

      if (isToken(value, 'operator', '(')) {
        this.expectToken(
          operatorToLabel['('],
          value,
          'followed by a value'
        );
        const expression = this.parseExpression();

        this.expectToken(
          'the expression in parentheses',
          value,
          `ending with ${operatorToLabel[')']}`
        );
        const closingParen = this.popToken();

        if (!isToken(closingParen, 'operator', ')')) {
          throw this.getUnexpectedError(
            `${operatorToLabel[')']} for an expression in parentheses`,
            closingParen
          );
        }

        return {
          type: 'expression',
          start: value.start,
          end: closingParen.end,
          props: {
            elements: [expression],
          },
        };
      }

      if (!isPrimitiveExpressionValue(value)) {
        throw this.getUnexpectedError('an expression value', value);
      }

      return value;
    }
  };
}
