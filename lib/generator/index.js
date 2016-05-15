import applyMixin from 'lib/util/apply_mixin.js';
import RootScope from 'lib/util/root_scope.js';
import { TYPE } from 'lib/util/scope_types.js';

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
    this.rootScope = new RootScope();
    this.insertRootTypes();
  }

  insertInternalType(name) {
    this.rootScope.set(name, TYPE, { internalType: true });
  }

  insertRootTypes() {
    this.insertInternalType('int8');
    this.insertInternalType('uint8');
    this.insertInternalType('int16');
    this.insertInternalType('uint16');
    this.insertInternalType('int32');
    this.insertInternalType('uint32');
    this.insertInternalType('float32');
    this.insertInternalType('float64');
  }
});

export default function generate(tree, options = {}) {
  const generator = new Generator(tree, options);
  const result = generator.generateRoot();

  return result;
}
