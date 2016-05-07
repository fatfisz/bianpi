export default function aliasParserMixin(Parser) {
  return class extends Parser {
    parseAlias() {
      const aliasKeyword = this.popToken();

      this.expectToken(
        'the \'alias\' keyword',
        aliasKeyword,
        'followed by a type'
      );
      const type = this.parseType();

      this.expectToken('the type', type, 'followed by an alias name');
      const name = this.parseIdent('an alias name');

      return {
        type: 'alias',
        start: aliasKeyword.start,
        end: name.end,
        props: { type, name },
      };
    }
  };
}
