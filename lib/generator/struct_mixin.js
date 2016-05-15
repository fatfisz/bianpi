import Scope from 'lib/util/scope.js';
import { FIELD, TYPE } from 'lib/util/scope_types.js';
import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function structGeneratorMixin(Generator) {
  return class extends Generator {
    generateStruct({ props: { name, parameters, fields } }, scope) {
      const {
        id: nameId,
        props,
      } = scope.setIfNotPresent(name, TYPE);

      const structScope = new Scope(scope, true);

      let args;
      if (parameters) {
        args = parameters
          .map((parameter) =>
            structScope.set(parameter.value, TYPE).id
          )
          .join(', ');

        props.length = parameters.length;
      } else {
        args = '';
      }

      const generatedFields = fields.map((field) =>
        this.generateField(field, structScope)
      );

      const fieldMapping = fields.map(({ name }) =>
        `${name.value}: ${structScope.get(name.value, FIELD).id}`
      );

      return trimAroundNewline`
        function ${nameId}(${args}) {
          ${this.indent(1)}${generatedFields.join(`\n${this.indent(1)}`)}
          ${this.indent(1)}return {
            ${this.indent(2)}${fieldMapping.join(`,\n${this.indent(2)}`)}
          ${this.indent(1)}};
        }
      `;
    }
  };
}
