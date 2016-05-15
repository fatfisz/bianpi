import Scope from 'lib/util/scope.js';
import { FIELD, MESSAGE, MESSAGE_ID } from 'lib/util/scope_types.js';
import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function messageGeneratorMixin(Generator) {
  return class extends Generator {
    generateMessage({ props: { name, id, fields } }, scope) {
      scope.root.setIfNotPresent(name, MESSAGE, null, 'used');
      scope.root.setIfNotPresent(id, MESSAGE_ID, null, 'used');

      const messageScope = new Scope(scope, true);

      const generatedFields = fields.map((field) =>
        this.generateField(field, messageScope)
      );

      const fieldMapping = fields.map(({ name }) =>
        `${name.value}: ${messageScope.get(name.value, FIELD).id}`
      );

      return trimAroundNewline`
        register('${name.value}', ${id.value}, () => {
          ${this.indent(1)}${generatedFields.join(`\n${this.indent(1)}`)}
          ${this.indent(1)}return {
            ${this.indent(2)}${fieldMapping.join(`,\n${this.indent(2)}`)}
          ${this.indent(1)}};
        });
      `;
    }
  };
}
