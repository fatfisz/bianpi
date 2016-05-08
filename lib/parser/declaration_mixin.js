export default function declarationParserMixin(Parser) {
  return class extends Parser {
    parseDeclaration() {
      const token = this.peekToken();
      const { type, value } = token;

      this.checkPragma(token);

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
          case 'pragma':
            return this.parsePragma();
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
