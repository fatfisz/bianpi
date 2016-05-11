export default function declarationGeneratorMixin(Generator) {
  return class extends Generator {
    generateDeclaration(node, scope) {
      switch (node.type) {
        case 'alias':
          return this.generateAlias(node, scope);
        case 'block':
          return this.generateBlock(node, scope);
        case 'const':
          return this.generateConst(node, scope);
        case 'decoratedDeclaration':
          return this.generateDecoratedDeclaration(node, scope);
        case 'enum':
          return this.generateEnum(node, scope);
        case 'message':
          return this.generateMessage(node, scope);
        case 'struct':
          return this.generateStruct(node, scope);
      }

      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`Unknown declaration type '${node.type}'`);
      }
    }
  };
}
