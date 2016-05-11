export default function constGeneratorMixin(Generator) {
  return class extends Generator {
    generateConst({ props: { name, expression } }, scope) {
      if (scope.hasOwn(name.value)) {
        throw new Error(`${name.value} already is in the current scope`);
      }

      const nameId = scope.set(name.value, 'value').id;

      return `const ${nameId} = null; // TODO: put expression here`;
    }
  };
}
