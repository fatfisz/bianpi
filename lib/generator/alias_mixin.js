export default function aliasGeneratorMixin(Generator) {
  return class extends Generator {
    generateAlias({ props: { name, type } }, scope) {
      if (scope.hasOwn(name.value)) {
        throw new Error(`${name.value} already is in the current scope`);
      }

      const nameId = scope.set(name.value, 'value').id;
      const typeId = this.generateType(type, scope);

      return `const ${nameId} = ${typeId};`;

    }
  };
}
