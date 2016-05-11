import Scope from 'lib/util/scope.js';
import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function messageGeneratorMixin(Generator) {
  return class extends Generator {
    generateMessage({ props: { name, id, fields } }, scope) {
      if (scope.hasOwn(name.value)) {
        throw new Error(`${name.value} already is in the current scope`);
      }

      scope.set(name.value, 'value');
      const messageScope = new Scope(scope);

      const generatedFields = fields.map((field) =>
        this.generateField(field, messageScope)
      );

      const fieldMapping = fields.map(({ name }) =>
        `${name.value}: ${messageScope.get(name.value).id}`
      );

      messageScope.exit();

      return trimAroundNewline`
        $.register(${id.value}, '${name.value}', () => {
          ${this.indent1}${generatedFields.join(`\n${this.indent1}`)}
          ${this.indent1}return {
          ${this.indent2}${fieldMapping.join(`,\n${this.indent2}`)}
          ${this.indent1}};
        });
      `;
    }
  };
}
