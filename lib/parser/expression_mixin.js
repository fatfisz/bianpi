import operatorToLabel from 'lib/util/operator_to_label.js';
import {
  isExpressionOperator,
  isOperator,
  isPrimitiveExpressionValue,
} from 'lib/util/tokens.js';


export default function expressionParserMixin(Parser) {
  return class extends Parser {
    parseExpression() {
      const firstValue = this.parseExpressionValue();
      const elements = [firstValue];

      while (this.hasTokens && isExpressionOperator(this.peekToken())) {
        const operator = this.popToken();
        elements.push(operator);

        this.expectToken(
          operatorToLabel[operator.value],
          operator,
          'followed by a value'
        );
        elements.push(this.parseExpressionValue());
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

      if (isOperator(value, '(')) {
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
        if (!isOperator(closingParen, ')')) {
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
