export default function declarationParserMixin(Parser) {
  return class extends Parser {
    parseDeclaration() {
      const { type, value } = this.peekToken();

      if (type === 'ident') {
        switch (value) {
          case 'alias':
            return this.parseAlias();
          case 'const':
            return this.parseConst();
          case 'enum':
            return this.parseEnum();
          case 'message':
            return this.parseMessage();
          case 'struct':
            return this.parseStruct();
        }
      }

      if (type === 'operator') {
        switch (value) {
          case '{':
            return this.parseBlock();
          case '@':
            return this.parseDecoratedDeclaration();
        }
      }

      return null;
    }
  };
}
