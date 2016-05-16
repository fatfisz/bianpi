export default function decoratedDeclarationGeneratorMixin(Generator) {
  return class extends Generator {
    constructor(tree, options) {
      super(tree, options);

      this.target = options.target;
    }

    generateDecoratedDeclaration({ props: { decorators, declaration } }, scope) {
      console.log('generateDecoratedDeclaration');

      const declarationScope = scope.createChild();

      if (this.target) {
        for (const decorator of decorators) {
          // declarationScope.set
        }
      }

      return this.generateDeclaration(declaration, declarationScope);
    }
  };
}
