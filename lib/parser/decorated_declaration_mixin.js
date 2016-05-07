import operatorToLabel from 'lib/util/operator_to_label.js';
import {
  isDeclarationMode,
  isOperator,
  isTargetListOperator,
} from 'lib/util/tokens.js';


export default function decoratedDeclarationParserMixin(Parser) {
  return class extends Parser {
    parseDecoratedDeclaration() {
      const firstDecorator = this.peekToken();
      const decorators = [];
      let decoratorOperator = firstDecorator;

      while (isOperator(decoratorOperator, '@')) {
        this.popToken();

        this.expectToken(
          operatorToLabel['@'],
          decoratorOperator,
          'followed by a name (read/write)'
        );
        const name = this.popToken();
        if (!isDeclarationMode(name)) {
          throw this.getUnexpectedError(
            `a decorator name (read/write) after ${operatorToLabel['@']}`,
            name
          );
        }

        this.expectToken(
          'the decorator name',
          name,
          `followed by ${operatorToLabel['(']}`
        );
        const openingParen = this.popToken();
        if (!isOperator(openingParen, '(')) {
          throw this.getUnexpectedError(
            `${operatorToLabel['(']} after a decorator name`,
            openingParen
          );
        }

        const targets = [];
        let separator;

        do {
          this.expectToken(
            separator ? operatorToLabel[','] : operatorToLabel['('],
            separator || openingParen,
            'followed by a target name'
          );
          targets.push(this.parseIdent('a target name'));

          this.expectToken(
            'decorator arguments',
            openingParen,
            `followed by ${operatorToLabel[')']}`
          );
          separator = this.popToken();
          if (!isTargetListOperator(separator)) {
            throw this.getUnexpectedError(
              `${operatorToLabel[')']} after decorator arguments`,
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
