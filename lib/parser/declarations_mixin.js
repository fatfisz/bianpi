export default function declarationsParserMixin(Parser) {
  return class extends Parser {
    parseDeclarations() {
      const declarations = [];

      while (this.hasTokens) {
        const declaration = this.parseDeclaration();

        if (declaration === null) {
          break;
        }

        if (typeof declaration !== 'undefined') {
          declarations.push(declaration);
        }
      }

      return declarations;
    }
  };
}
