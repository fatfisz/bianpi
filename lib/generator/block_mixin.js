import Scope from 'lib/util/scope.js';


export default function blockGeneratorMixin(Generator) {
  return class extends Generator {
    generateBlock(node, scope) {
      const blockScope = new Scope(scope);
      const result = this.generateDeclarations(node, blockScope);

      blockScope.exit();

      return result;
    }
  };
}
