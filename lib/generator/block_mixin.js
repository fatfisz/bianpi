export default function blockGeneratorMixin(Generator) {
  return class extends Generator {
    generateBlock(node, scope) {
      const blockScope = scope.createChild();

      return this.generateDeclarations(node, blockScope);
    }
  };
}
