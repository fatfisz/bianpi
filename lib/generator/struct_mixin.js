import Scope from 'lib/util/scope.js';
import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function structGeneratorMixin(Generator) {
  return class extends Generator {
    generateStruct({ props: { name, parameters, fields } }, scope) {
      if (scope.hasOwn(name.value, 'type')) {
        throw new Error(`${name.value} already is in the current scope`);
      }
      const props = {};
      const nameId = scope.set(name.value, 'type', props).id;

      const structScope = new Scope(scope, true);

      let args;
      if (parameters) {
        args = parameters
          .map((parameter) => structScope.set(parameter.value, 'type').id)
          .join(', ');

        props.length = parameters.length;
      } else {
        args = '';
      }

      const generatedFields = fields.map((field) =>
        this.generateField(field, structScope)
      );

      const fieldMapping = fields.map(({ name }) =>
        `${name.value}: ${structScope.get(name.value, 'value').id}`
      );

      return trimAroundNewline`
        function ${nameId}(${args}) {
          ${this.indent1}${generatedFields.join(`\n${this.indent1}`)}
          ${this.indent1}return {
            ${this.indent2}${fieldMapping.join(`,\n${this.indent2}`)}
          ${this.indent1}};
        }
      `;
    }
  };
}
