export default function indentGeneratorMixin(Generator) {
  return class extends Generator {
    constructor(tree, options) {
      super(tree, options);

      const {
        indentStyle = 'space',
        indentSize = 2,
      } = options;

      this.indent1 = indentStyle === 'tab' ? '\t' : ' '.repeat(indentSize);
      this.indent2 = this.indent1.repeat(2);
    }
  };
}
