import { VALUE } from 'lib/util/scope_types.js';


export default function expressionGeneratorMixin(Generator) {
  return class extends Generator {
    generateExpression({ type, value, props }, scope) {
      if (type === 'number') {
        return value;
      }

      if (type === 'string') {
        return `'${value}'`;
      }

      if (type === 'ident') {
        scope.expect(value, VALUE);
        return value;
      }

      const generated = props.elements.reduce((acc, element, index) => {
        if (index % 2 === 0) {
          return `${acc} ${this.generateExpression(element, scope)}`;
        }

        return `${acc} ${element.value}`;
      }, '');

      return `(${generated.slice(1)})`;
    }
  };
}
