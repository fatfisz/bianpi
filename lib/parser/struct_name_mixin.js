import { isToken, isTypeParameterListOperator } from 'lib/util/tokens.js';


export default function structNameParserMixin(Parser) {
  return class extends Parser {
    parseStructName() {
      const name = this.parseIdent('a struct name');
      const props = { name };
      let end = name.end;

      if (this.hasTokens) {
        const next = this.peekToken();

        if (isToken(next, 'operator', '<')) {
          const parameters = this.parseStructNameParameters();

          props.parameters = parameters;
          end = parameters.end;
        }
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
          separator ? 'comma \',\'' : 'opening pointy bracket \'<\'',
          separator || openingPointyBracket,
          'followed by a parameter name'
        );
        parameters.push(this.parseIdent('a parameter name'));

        this.expectToken(
          'struct parameters',
          openingPointyBracket,
          'followed by a closing pointy bracket \'>\''
        );
        separator = this.popToken();
        if (!isTypeParameterListOperator(separator)) {
          throw this.getUnexpectedError(
            'a closing pointy bracket \'>\' for a struct parameter list',
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
