import operatorToLabel from 'lib/util/operator_to_label.js';
import { isOperator, isTypeParameterListOperator } from 'lib/util/tokens.js';


export default function structNameParserMixin(Parser) {
  return class extends Parser {
    parseStructName() {
      const name = this.parseIdent('a struct name');
      const props = { name };
      let end = name.end;

      if (this.hasTokens && isOperator(this.peekToken(), '<')) {
        const parameters = this.parseStructNameParameters();

        props.parameters = parameters.props.parameters;
        end = parameters.end;
      }

      return {
        type: 'structName',
        start: name.start,
        end,
        props,
      };
    }

    parseStructNameParameters() {
      const openingPointyBracket = this.popToken();
      const parameters = [];
      let separator;

      do {
        this.expectToken(
          separator ? operatorToLabel[','] : operatorToLabel['<'],
          separator || openingPointyBracket,
          'followed by a parameter name'
        );
        parameters.push(this.parseIdent('a parameter name'));

        this.expectToken(
          'struct parameters',
          openingPointyBracket,
          `followed by ${operatorToLabel['>']}`
        );
        separator = this.popToken();
        if (!isTypeParameterListOperator(separator)) {
          throw this.getUnexpectedError(
            `${operatorToLabel['>']} for a struct parameter list`,
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
