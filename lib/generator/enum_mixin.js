import trimAroundNewline from 'lib/util/trim_around_newline.js';


export default function enumGeneratorMixin(Generator) {
  return class extends Generator {
    generateEnum({ props: { name, values, type } }, scope) {
      if (scope.hasOwn(name.value, 'type')) {
        throw new Error(`${name.value} already is in the current scope`);
      }
      const nameId = scope.set(name.value, 'type').id;

      const enumName = `${nameId}enum`;
      const valueProps = values
        .map(({ name, value }) => `${name.value}: ${value.value}`);
      const numericTypeId = scope.root.get(type, 'type').id;

      return trimAroundNewline`
        function ${enumName}(value) {
          ${this.indent(1)}this.value = value;
        }
        Object.defineProperty(${enumName}.prototype, 'values', {
          ${this.indent(1)}value: Object.freeze({
            ${this.indent(2)}${valueProps.join(`,\n${this.indent(2)}`)}
          ${this.indent(1)}}),
          ${this.indent(1)}enumerable: true,
        });

        function ${nameId}() {
          ${this.indent(1)}return ${enumName}(${numericTypeId}());
        }
      `;
    }
  };
}
