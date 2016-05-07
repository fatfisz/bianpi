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
  };
}
