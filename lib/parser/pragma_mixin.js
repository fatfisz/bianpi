import dedent from 'lib/util/dedent.js';
import { ParserError } from 'lib/util/errors.js';


export default function pragmaParserMixin(Parser) {
  return class extends Parser {
    constructor(...args) {
      super(...args);

      this.pragmaForbidden = false;
    }

    checkPragma({ type, value, start }) {
      if (type !== 'ident' || value !== 'pragma') {
        this.pragmaForbidden = true;
      } else if (this.pragmaForbidden) {
        throw new ParserError(
          dedent`Unexpected 'pragma' keyword.
                 Pragma declarations should precede other declarations.`,
          start
        );
      }
    }

    parsePragma() {
      const pragmaKeyword = this.popToken();

      this.expectToken(
        'the \'pragma\' keyword',
        pragmaKeyword,
        'followed by a pragma name'
      );
      const name = this.parseIdent('a pragma name');

      if (!this.pragmas.has(name.value)) {
        throw new ParserError(
          `Unknown pragma name: '${name.value}'.`,
          name.start
        );
      }

      this.expectToken('the pragma name', name, 'followed by a pragma value');
      const value = this.parseIdent('an pragma value');

      if (this.pragmas.get(name.value).call(this, value.value) === false) {
        throw new ParserError(
          `Pragma ${name.value} doesn't accept the '${value.value}' value.`,
          value.start
        );
      }
    }
  };
}
