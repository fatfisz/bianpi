import operatorToLabel from 'lib/util/operator_to_label.js';
import { isOperator, isTypeParameterListOperator } from 'lib/util/tokens.js';


export default function typeParserMixin(Parser) {
  return class extends Parser {
    parseType() {
      const name = this.parseIdent('a type name');
      const props = { name };
      let end = name.end;

      if (this.hasTokens && isOperator(this.peekToken(), '<')) {
        const parameters = this.parseTypeParameters();

        props.parameters = parameters;
        end = parameters.end;
      }

      while (this.hasTokens && isOperator(this.peekToken(), '[')) {
        const count = this.parseArrayTypeLength();

        if (props.dimensions) {
          props.dimensions.push(count);
        } else {
          props.dimensions = [count];
        }
        end = count.end;
      }

      return {
        type: 'type',
        start: name.start,
        end,
        props,
      };
    }

    parseTypeParameters() {
      const openingPointyBracket = this.popToken();
      const parameters = [];
      let separator;

      do {
        this.expectToken(
          separator ? operatorToLabel[','] : operatorToLabel['<'],
          separator || openingPointyBracket,
          'followed by a type'
        );
        parameters.push(this.parseType());

        this.expectToken(
          'type parameters',
          openingPointyBracket,
          `followed by ${operatorToLabel['>']}`
        );
        separator = this.popToken();
        if (!isTypeParameterListOperator(separator)) {
          throw this.getUnexpectedError(
            `${operatorToLabel['>']} for a type parameter list`,
            separator
          );
        }
      } while (separator.value === ',');

      return {
        type: 'parameters',
        start: openingPointyBracket.start,
        end: separator.end,
        props: { parameters },
      };
    }

    parseArrayTypeLength() {
      const openingBracket = this.popToken();

      this.expectToken(
        operatorToLabel['['],
        openingBracket,
        'followed by an array length expression'
      );
      const expression = this.parseExpression();

      this.expectToken(
        'the array length expression',
        expression,
        `followed by ${operatorToLabel[']']}`
      );
      const closingBracket = this.popToken();
      if (!isOperator(closingBracket, ']')) {
        throw this.getUnexpectedError(
          `${operatorToLabel[']']} after an array length expression`,
          closingBracket
        );
      }

      return {
        type: 'arrayTypeLength',
        start: openingBracket.start,
        end: closingBracket.end,
        props: { expression },
      };
    }
  };
}
