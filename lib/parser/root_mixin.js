export default function rootParserMixin(Parser) {
  return class extends Parser {
    parseRoot() {
      const declarations = this.parseDeclarations();

      if (this.hasTokens) {
        throw this.getUnexpectedError('a declaration', this.popToken());
      }

      return {
        type: 'root',
        start: this.start,
        end: this.end,
        props: { declarations },
      };
    }
  };
}
