import {
  isToken,
  isDeclarationMode,
  isTargetListOperator,
} from 'lib/util/tokens.js';


export default function decoratedDeclarationParserMixin(Parser) {
  return class extends Parser {
    parseDecoratedDeclaration() {
      const firstDecorator = this.peekToken();
      const decorators = [];
      let decoratorOperator = firstDecorator;

      while (isToken(decoratorOperator, 'operator', '@')) {
        this.popToken();

        this.expectToken(
          'decorator operator \'@\'',
          decoratorOperator,
          'followed by a name (read/write)'
        );
        const name = this.popToken();
        if (!isDeclarationMode(name)) {
          throw this.getUnexpectedError(
            'a decorator name (read/write) after a decorator operator \'@\'',
            name
          );
        }

        this.expectToken(
          'decorator name',
          name,
          'followed by an opening paren \'(\''
        );
        const openingParen = this.popToken();
        if (!isToken(openingParen, 'operator', '(')) {
          throw this.getUnexpectedError(
            'an opening paren \'(\' after a decorator name',
            openingParen
          );
        }

        const targets = [];
        let separator;

        do {
          this.expectToken(
            separator ? 'comma \',\'' : 'opening paren \'(\'',
            separator || openingParen,
            'followed by a target name'
          );
          targets.push(this.parseIdent('a target name'));

          this.expectToken(
            'decorator arguments',
            openingParen,
            'followed by a closing paren \')\''
          );
          separator = this.popToken();
          if (!isTargetListOperator(separator)) {
            throw this.getUnexpectedError(
              'a closing paren \')\' after decorator arguments',
              separator
            );
          }
        } while (separator.value === ',');

        decorators.push({ name, targets });

        this.expectToken(
          'decorators',
          firstDecorator,
          'followed by a declaration'
        );
        decoratorOperator = this.peekToken();
      }

      const declaration = this.parseDeclaration();
      if (declaration === null) {
        throw this.getUnexpectedError(
          'a declaration after decorators',
          decoratorOperator
        );
      }

      return {
        type: 'declarationWithTargets',
        start: firstDecorator.start,
        end: declaration.end,
        props: { decorators, declaration },
      };
    }
  };
}
