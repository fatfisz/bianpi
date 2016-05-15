import RootScope from 'lib/util/root_scope.js';


export default function rootGeneratorMixin(Generator) {
  return class extends Generator {
    generateRoot() {
      const rootScope = new RootScope();

      this.insertRootTypes(rootScope);

      return this.generateDeclarations(this.tree, rootScope);
    }

    insertRootTypes(scope) {
      scope.set('int8', 'type');
      scope.set('uint8', 'type');
      scope.set('int16', 'type');
      scope.set('uint16', 'type');
      scope.set('int32', 'type');
      scope.set('uint32', 'type');
      scope.set('float32', 'type');
      scope.set('float64', 'type');
    }
  };
}
