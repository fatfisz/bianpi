export default function constGeneratorMixin(Generator) {
  return class extends Generator {
    generateConst({ props: { name, expression } }, scope) {
      if (scope.hasOwn(name.value, 'value')) {
        throw new Error(`${name.value} already is in the current scope`);
      }
      const nameId = scope.set(name.value, 'value').id;

      const expressionCode = this.generateExpression(expression, scope);

      return `const ${nameId} = ${expressionCode};`;
    }
  };
}
