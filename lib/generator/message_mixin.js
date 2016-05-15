import Scope from 'lib/util/scope.js';
import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function messageGeneratorMixin(Generator) {
  return class extends Generator {
    generateMessage({ props: { name, id, fields } }, scope) {
      if (scope.root.hasOwn(name.value, 'message')) {
        throw new Error(
          `A message with the name '${name.value}' was already declared.`
        );
      }
      scope.root.set(name.value, 'message');

      if (scope.root.hasOwn(id.value, 'messageId')) {
        throw new Error(
          `A message with the id ${id.value} was already declared.`
        );
      }
      scope.root.set(id.value, 'messageId');

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
