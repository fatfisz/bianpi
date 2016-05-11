import RootScope from 'lib/util/root_scope.js';
import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function rootGeneratorMixin(Generator) {
  return class extends Generator {
    generateRoot() {
      const rootScope = new RootScope();

      this.insertRootTypes(rootScope);

      const result = this.generateDeclarations(this.tree, rootScope);

      const wrappers = [];
      rootScope.symbols.forEach((symbol) => {
        const { props } = symbol;
        if (props && props.wrapper) {
          wrappers.push(trimAroundNewline`
            function ${symbol.id}() {
              ${this.indent1}return ${props.body}();
            }
          `);
        }
      });

      return `${result}\n\n${wrappers.join('\n\n')}`;
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
