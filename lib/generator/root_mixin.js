export default function rootGeneratorMixin(Generator) {
  return class extends Generator {
    generateRoot() {
      return this.generateDeclarations(this.tree, this.rootScope);
    }
  };
}
