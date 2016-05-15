import Scope from 'lib/util/scope.js';
import { ENUM, ENUM_NAME, ENUM_VALUE, TYPE } from 'lib/util/scope_types.js';
import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function enumGeneratorMixin(Generator) {
  return class extends Generator {
    generateEnum({ props: { name, values, type } }, scope) {
      const nameId = scope.setIfNotPresent(name, TYPE).id;
      scope.root.setIfNotPresent(name, ENUM);

      const enumPseudoScope = new Scope(scope);

      const valueProps = values
        .map(({ name, value }) => {
          enumPseudoScope.setIfNotPresent(name, ENUM_NAME, null, 'used');
          enumPseudoScope.setIfNotPresent(value, ENUM_VALUE, null, 'used');

          return `${name.value}: ${value.value}`;
        });
      const numericTypeId = scope.root.get(type, TYPE).id;

      return trimAroundNewline`
        registerEnum('${name.value}', {
          ${this.indent(1)}${valueProps.join(`,\n${this.indent(1)}`)}
        });

        const ${nameId} = ${numericTypeId};
      `;
    }
  };
}
