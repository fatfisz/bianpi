import { TYPE } from 'lib/util/scope_types.js';


export default function aliasGeneratorMixin(Generator) {
  return class extends Generator {
    generateAlias({ props: { name, type } }, scope) {
      const typeCode = this.generateType(type, scope);
      const nameId = scope.setIfNotPresent(name, TYPE).id;

      return `const ${nameId} = ${typeCode};`;

    }
  };
}
