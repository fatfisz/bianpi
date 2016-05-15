import { FIELD } from 'lib/util/scope_types.js';


export default function fieldGeneratorMixin(Generator) {
  return class extends Generator {
    generateField({ type, name }, scope) {
      const typeCode = this.generateType(type, scope);
      const nameId = scope.setIfNotPresent(name, FIELD).id;
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
