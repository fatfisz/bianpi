import { VALUE } from 'lib/util/scope_types.js';


export default function constGeneratorMixin(Generator) {
  return class extends Generator {
    generateConst({ props: { name, expression } }, scope) {
      const nameId = scope.setIfNotPresent(name, VALUE).id;
      const expressionCode = this.generateExpression(expression, scope);

      return `const ${nameId} = ${expressionCode};`;
    }
  };
}
