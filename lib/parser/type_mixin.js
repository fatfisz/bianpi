import { isToken, isTypeParameterListOperator } from 'lib/util/tokens.js';


export default function typeParserMixin(Parser) {
  return class extends Parser {
    parseType() {
      const name = this.parseIdent('a type name');
      const props = { name };
      let end = name.end;

      if (this.hasTokens) {
        const next = this.peekToken();

        if (isToken(next, 'operator', '<')) {
          const parameters = this.parseTypeParameters();

          props.parameters = parameters;
          end = parameters.end;
        }
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
          separator ? 'comma \',\'' : 'opening pointy bracket \'<\'',
          separator || openingPointyBracket,
          'followed by a type'
        );
        parameters.push(this.parseType());

        this.expectToken(
          'type parameters',
          openingPointyBracket,
          'followed by a closing pointy bracket \'>\''
        );
        separator = this.popToken();
        if (!isTypeParameterListOperator(separator)) {
          throw this.getUnexpectedError(
            'a closing pointy bracket \'>\' for a type parameter list',
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
