export default function fieldParserMixin(Parser) {
  return class extends Parser {
    parseField() {
      const type = this.parseType();

      this.expectToken(
        'the field type',
        type,
        'followed by a field name'
      );
      const name = this.parseIdent('a field name');

      return { type, name };
    }
  };
}
