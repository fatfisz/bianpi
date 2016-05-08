import dedent from 'lib/util/dedent.js';
import { ParserError } from 'lib/util/errors.js';
import Position from 'lib/util/position.js';

import messageIdTypePragmaMixin from './pragmas/message_id_type.js';
import aliasMixin from './alias_mixin.js';
import blockMixin from './block_mixin.js';
import constMixin from './const_mixin.js';
import declarationMixin from './declaration_mixin.js';
import declarationsMixin from './declarations_mixin.js';
import decoratedDeclarationMixin from './decorated_declaration_mixin.js';
import enumParserMixin from './enum_mixin.js';
import expressionParserMixin from './expression_mixin.js';
import fieldParserMixin from './field_mixin.js';
import identParserMixin from './ident_mixin.js';
import messageParserMixin from './message_mixin.js';
import pragmaParserMixin from './pragma_mixin.js';
import rootParserMixin from './root_mixin.js';
import structParserMixin from './struct_mixin.js';
import structNameParserMixin from './struct_name_mixin.js';
import typeParserMixin from './type_mixin.js';


const noMoreTokens =
  'No more tokens available, please remember to check with this.hasTokens.';

function applyMixin(Class, mixin) {
  return mixin(Class);
}

const parserMixins = [
  messageIdTypePragmaMixin,
  aliasMixin,
  blockMixin,
  declarationMixin,
  declarationsMixin,
  decoratedDeclarationMixin,
  constMixin,
  enumParserMixin,
  expressionParserMixin,
  fieldParserMixin,
  identParserMixin,
  messageParserMixin,
  pragmaParserMixin,
  rootParserMixin,
  structParserMixin,
  structNameParserMixin,
  typeParserMixin,
];

const Parser = parserMixins.reduce(applyMixin, class {
  constructor({ tokens, start, end }) {
    Object.assign(this, {
      tokens,
      start,
      end,
      currentTokenIndex: 0,
      pragmas: new Map(),
    });
  }

  get hasTokens() {
    return this.currentTokenIndex < this.tokens.length;
  }

  peekToken() {
    if (process.env.NODE_ENV !== 'production' && !this.hasTokens) {
      throw new Error(noMoreTokens);
    }

    return this.tokens[this.currentTokenIndex];
  }

  popToken() {
    if (process.env.NODE_ENV !== 'production' && !this.hasTokens) {
      throw new Error(noMoreTokens);
    }

    const token = this.tokens[this.currentTokenIndex];

    this.currentTokenIndex += 1;

    return token;
  }

  expectToken(type, relToken, relationAndToken) {
    if (process.env.NODE_ENV !== 'production' && !relToken.start) {
      throw new Error('The token is malformed.');
    }

    if (!this.hasTokens) {
      const cleanType = type.replace(/^an? /, 'the ');

      throw new ParserError(
        dedent`Unexpected end of file.
               ${cleanType.slice(0, 1).toUpperCase()}${cleanType.slice(1)}
               at ${new Position(relToken.start)}
               should be ${relationAndToken}.`,
        this.end
      );
    }
  }

  getUnexpectedError(expected, token) {
    return new ParserError(
      `Expected ${expected} but found '${token.value}' instead.`,
      token.start
    );
  }
});

export default function parse(lexerResult, options = {}) {
  return new Parser(lexerResult, options).parseRoot();
}
