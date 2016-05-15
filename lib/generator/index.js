import applyMixin from 'lib/util/apply_mixin.js';

import aliasGeneratorMixin from './alias_mixin.js';
import blockGeneratorMixin from './block_mixin.js';
import constGeneratorMixin from './const_mixin.js';
import declarationGeneratorMixin from './declaration_mixin.js';
import declarationsGeneratorMixin from './declarations_mixin.js';
import decoratedDeclarationGeneratorMixin from './decorated_declaration_mixin.js';
import enumGeneratorMixin from './enum_mixin.js';
import expressionGeneratorMixin from './expression_mixin.js';
import fieldGeneratorMixin from './field_mixin.js';
import indentGeneratorMixin from './indent_mixin.js';
import messageGeneratorMixin from './message_mixin.js';
import rootGeneratorMixin from './root_mixin.js';
import structGeneratorMixin from './struct_mixin.js';
import typeGeneratorMixin from './type_mixin.js';


const generatorMixins = [
  aliasGeneratorMixin,
  blockGeneratorMixin,
  constGeneratorMixin,
  declarationGeneratorMixin,
  declarationsGeneratorMixin,
  decoratedDeclarationGeneratorMixin,
  enumGeneratorMixin,
  expressionGeneratorMixin,
  fieldGeneratorMixin,
  indentGeneratorMixin,
  messageGeneratorMixin,
  rootGeneratorMixin,
  structGeneratorMixin,
  typeGeneratorMixin,
];

const Generator = generatorMixins.reduce(applyMixin, class {
  constructor(tree) {
    this.tree = tree;
  }
});

export default function generate(tree, options = {}) {
  return new Generator(tree, options).generateRoot();
}
