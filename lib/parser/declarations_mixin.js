export default function declarationsParserMixin(Parser) {
  return class extends Parser {
    parseDeclarations() {
      const declarations = [];

      while (this.hasTokens) {
        const declaration = this.parseDeclaration();

        if (declaration === null) {
          break;
        }

        declarations.push(declaration);
      }

      return declarations;
    }
  };
}
