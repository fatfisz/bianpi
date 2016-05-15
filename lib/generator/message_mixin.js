import Scope from 'lib/util/scope.js';
import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function messageGeneratorMixin(Generator) {
  return class extends Generator {
    generateMessage({ props: { name, id, fields } }, scope) {
      if (scope.hasOwn(name.value, 'message')) {
        throw new Error(`${name.value} already is in the current scope`);
      }
      scope.set(name.value, 'message');

      const messageScope = new Scope(scope, true);

      const generatedFields = fields.map((field) =>
        this.generateField(field, messageScope)
      );

      const fieldMapping = fields.map(({ name }) =>
        `${name.value}: ${messageScope.get(name.value, 'value').id}`
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
