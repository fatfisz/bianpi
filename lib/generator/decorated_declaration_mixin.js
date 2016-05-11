import Scope from 'lib/util/scope.js';


export default function decoratedDeclarationGeneratorMixin(Generator) {
  return class extends Generator {
    constructor(tree, options) {
      super(tree, options);

      this.target = options.target;
    }

    generateDecoratedDeclaration({ props: { decorators, declaration } }, scope) {
      console.log('generateDecoratedDeclaration');

      const declarationScope = new Scope(scope);

      if (this.target) {
        for (const decorator of decorators) {
          // declarationScope.set
        }
      }

      const result = this.generateDeclaration(declaration, declarationScope);

      declarationScope.exit();

      return result;
    }
  };
}
