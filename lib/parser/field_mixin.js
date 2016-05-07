import { isToken } from 'lib/util/tokens.js';


export default function fieldParserMixin(Parser) {
  return class extends Parser {
    parseField() {
      const type = this.parseType();
      const props = { type };

      this.expectToken(
        'field type',
        type,
        'followed by a field name'
      );
      if (isToken(this.peekToken(), 'operator', '[')) {
        const openingBracket = this.popToken();

        this.expectToken(
          'opening bracket \'[\'',
          openingBracket,
          'followed by an array length expression'
        );
        const count = this.parseExpression();
        props.count = count;

        this.expectToken(
          'array length expression',
          count,
          'followed by a closing bracket \']\''
        );
        const closingBracket = this.popToken();
        if (!isToken(closingBracket, 'operator', ']')) {
          throw this.getUnexpectedError(
            'a closing bracket \']\' after an array length expression',
            closingBracket
          );
        }
      }

      this.expectToken(
        'field type',
        type,
        'followed by a field name'
      );
      props.name = this.parseIdent('a field name');

      return {
        type: 'fieldDefinition',
        start: type.start,
        end: props.name.end,
        props,
      };
    }
  };
}
