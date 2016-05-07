import operatorToLabel from 'lib/util/operator_to_label.js';
import { isToken } from 'lib/util/tokens.js';


export default function fieldParserMixin(Parser) {
  return class extends Parser {
    parseField() {
      const type = this.parseType();
      const props = { type };

      this.expectToken(
        'the field type',
        type,
        'followed by a field name'
      );
      if (isToken(this.peekToken(), 'operator', '[')) {
        const openingBracket = this.popToken();

        this.expectToken(
          operatorToLabel['['],
          openingBracket,
          'followed by an array length expression'
        );
        const count = this.parseExpression();
        props.count = count;

        this.expectToken(
          'the array length expression',
          count,
          `followed by ${operatorToLabel[']']}`
        );
        const closingBracket = this.popToken();
        if (!isToken(closingBracket, 'operator', ']')) {
          throw this.getUnexpectedError(
            `${operatorToLabel[']']} after an array length expression`,
            closingBracket
          );
        }
      }

      this.expectToken(
        'the field type',
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
