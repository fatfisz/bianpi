export default function identParserMixin(Parser) {
  return class extends Parser {
    parseIdent(role) {
      const ident = this.popToken();

      if (ident.type !== 'ident') {
        throw this.getUnexpectedError(role, ident);
      }

      return ident;
    }
  };
}
