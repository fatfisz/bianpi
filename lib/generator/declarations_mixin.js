export default function declarationsGeneratorMixin(Generator) {
  return class extends Generator {
    generateDeclarations({ props: { declarations } }, scope) {
      return declarations
        .map((declaration) => this.generateDeclaration(declaration, scope))
        .join('\n\n');
    }
  };
}
