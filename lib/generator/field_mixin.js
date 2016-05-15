export default function fieldGeneratorMixin(Generator) {
  return class extends Generator {
    generateField({ type, name }, scope) {
      if (scope.hasOwn(name.value, 'value')) {
        throw new Error(`${name.value} already is in the current scope`);
      }
      const nameId = scope.set(name.value, 'value').id;

      const typeCode = this.generateType(type, scope);
      let typeCall;

      if (typeCode.startsWith('() => ')) {
        typeCall = typeCode.slice('() => '.length);
      } else {
        typeCall = `${typeCode}()`;
      }

      return `const ${nameId} = ${typeCall};`;
    }
  };
}
