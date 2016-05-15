export default function aliasGeneratorMixin(Generator) {
  return class extends Generator {
    generateAlias({ props: { name, type } }, scope) {
      const typeCode = this.generateType(type, scope);

      if (scope.hasOwn(name.value, 'type')) {
        throw new Error(`${name.value} already is in the current scope`);
      }
      const nameId = scope.set(name.value, 'type').id;

      return `const ${nameId} = ${typeCode};`;

    }
  };
}
