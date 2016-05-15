export default function indentGeneratorMixin(Generator) {
  return class extends Generator {
    constructor(tree, options) {
      super(tree, options);

      const {
        indentStyle = 'space',
        indentSize = 2,
      } = options;

      this.indentChar = indentStyle === 'tab' ? '\t' : ' '.repeat(indentSize);
    }

    indent(count) {
      return this.indentChar.repeat(count);
    }
  };
}
