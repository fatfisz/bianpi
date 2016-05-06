import dedent from './util/dedent';
import { ParserError } from './util/errors';
import Position from './util/position';
import {
  isToken,
  isDeclarationMode,
  isEnumValue,
  isExpressionOperator,
  isHexadecimalNumber,
  isPrimitiveExpressionValue,
  isTargetListOperator,
  isTypeParameterListOperator,
} from './util/tokens';


const hexLengthToLabel = {
  2: 'an 8-bit',
  4: 'a 16-bit',
  8: 'a 32-bit',
};

class Parser {
  constructor({ tokens, start, end }) {
    Object.assign(this, {
      tokens,
      start,
      end,
      currentTokenIndex: 0,
    });
  }

  get hasTokens() {
    return this.currentTokenIndex < this.tokens.length;
  }

  peekToken() {
    if (process.env.NODE_ENV !== 'production' && !this.hasTokens) {
      throw new Error('No more tokens available, please remember to check with this.hasTokens.');
    }

    return this.tokens[this.currentTokenIndex];
  }

  popToken() {
    if (process.env.NODE_ENV !== 'production' && !this.hasTokens) {
      throw new Error('No more tokens available, please remember to check with this.hasTokens.');
    }

    const token = this.tokens[this.currentTokenIndex];

    this.currentTokenIndex += 1;

    return token;
  }

  expectToken(type, startToken, missing) {
    if (!this.hasTokens) {
      throw new ParserError(
        dedent`Unexpected end of file.
               ${type.slice(0, 1).toUpperCase()}${type.slice(1)}
               (started at ${new Position(startToken.start)})
               is missing ${missing}.`,
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

  parse() {
    const declarations = this.parseDeclarations();

    if (this.hasTokens) {
      throw this.getUnexpectedError('a declaration', this.popToken());
    }

    return {
      type: 'root',
      start: this.start,
      end: this.end,
      props: { declarations },
    };
  }

  parseAlias() {
    const { start } = this.popToken();

    this.expectToken('alias declaration', start, 'a type');
    const type = this.parseType();

    this.expectToken('alias declaration', start, 'a name');
    const name = this.parseIdent('an alias name');

    return {
      type: 'alias',
      start,
      end: name.end,
      props: { type, name },
    };
  }

  parseBlock() {
    const openingBrace = this.popToken();
    const declarations = this.parseDeclarations();

    this.expectToken('block', openingBrace, 'a closing brace \'}\'');
    const closingBrace = this.popToken();
    if (!isToken(closingBrace, 'operator', '}')) {
      throw this.getUnexpectedError('a closing brace \'}\'', closingBrace);
    }

    return {
      type: 'block',
      start: openingBrace.start,
      end: closingBrace.end,
      props: { declarations },
    };
  }

  parseConstDeclaration() {
    const constKeyword = this.popToken();

    this.expectToken('const declaration', constKeyword, 'a name');
    const name = this.parseIdent('a const name');

    this.expectToken('const declaration', constKeyword, 'an assignment operator \'=\'');
    const equality = this.popToken();
    if (!isToken(equality, 'operator', '=')) {
      throw this.getUnexpectedError('an assignment operator \'=\'', equality);
    }

    this.expectToken('const declaration', constKeyword, 'a value');
    const expression = this.parseExpression();

    return {
      type: 'const',
      start: constKeyword.start,
      end: expression.end,
      props: { name, expression },
    };
  }

  parseDeclaration() {
    const { type, value } = this.peekToken();

    if (type === 'ident') {
      switch (value) {
        case 'alias':
          return this.parseAlias();
        case 'const':
          return this.parseConstDeclaration();
        case 'enum':
          return this.parseEnum();
        case 'message':
          return this.parseMessage();
        case 'struct':
          return this.parseStruct();
      }
    }

    if (type === 'operator') {
      switch (value) {
        case '{':
          return this.parseBlock();
        case '@':
          return this.parseDecoratedDeclaration();
      }
    }

    return null;
  }

  parseDeclarations() {
    const declarations = [];

    while (this.hasTokens) {
      const declaration = this.parseDeclaration();

      if (declaration === null) {
        break;
      }

      declarations.push(declaration);
    }

    return declarations;
  }

  parseDecoratedDeclaration() {
    const firstDecorator = this.peekToken();
    const decorators = [];
    let decoratorOperator = firstDecorator;

    while (isToken(decoratorOperator, 'operator', '@')) {
      this.popToken();

      this.expectToken('decorator', decoratorOperator, 'a name (read/write)');
      const name = this.popToken();
      if (!isDeclarationMode(name)) {
        throw this.getUnexpectedError('a decorator name (read/write)', name);
      }

      this.expectToken('decorator', decoratorOperator, 'an opening paren \'(\'');
      const openingParen = this.popToken();
      if (!isToken(openingParen, 'operator', '(')) {
        throw this.getUnexpectedError('an opening paren \'(\'', openingParen);
      }

      const targets = [];
      let separator;

      do {
        this.expectToken('decorator', decoratorOperator, 'a target name argument');
        targets.push(this.parseIdent('a target name'));

        this.expectToken('decorator', decoratorOperator, 'a closing paren \')\'');
        separator = this.popToken();
        if (!isTargetListOperator(separator)) {
          throw this.getUnexpectedError('a closing paren \')\'', separator);
        }
      } while (separator.value === ',');

      decorators.push({ name, targets });

      this.expectToken('decorated declaration', firstDecorator, 'a declaration');
      decoratorOperator = this.peekToken();
    }

    const declaration = this.parseDeclaration();
    if (declaration === null) {
      throw this.getUnexpectedError('a declaration after decorators', decoratorOperator);
    }

    return {
      type: 'declarationWithTargets',
      start: firstDecorator.start,
      end: declaration.end,
      props: { decorators, declaration },
    };
  }

  parseEnum() {
    const enumKeyword = this.popToken();

    this.expectToken('enum declaration', enumKeyword, 'a name');
    const name = this.parseIdent('an enum name');

    this.expectToken('enum declaration', enumKeyword, 'an opening brace \'{\'');
    const openingBrace = this.popToken();
    if (!isToken(openingBrace, 'operator', '{')) {
      throw this.getUnexpectedError('an opening brace \'{\'', openingBrace);
    }

    this.expectToken('enum declaration', enumKeyword, 'values');
    const values = [this.parseEnumValue()];
    const expectedLength = values[0].props.value.value.length - 2;

    this.expectToken('enum declaration', enumKeyword, 'a closing brace \'}\'');
    let closingBrace = this.peekToken();

    while (!isToken(closingBrace, 'operator', '}')) {
      values.push(this.parseEnumValue(expectedLength));

      this.expectToken('enum declaration', enumKeyword, 'a closing brace \'}\'');
      closingBrace = this.peekToken();
    }

    this.popToken();

    return {
      type: 'enum',
      start: enumKeyword.start,
      end: closingBrace.end,
      props: { name, values },
    };
  }

  parseEnumValue(expectedLength = null) {
    const name = this.parseIdent('an enum value name');

    this.expectToken('enum value declaration', name, 'an assignment operator \'=\'');
    const equality = this.popToken();
    if (!isToken(equality, 'operator', '=')) {
      throw this.getUnexpectedError('an assignment operator \'=\'', equality);
    }

    this.expectToken('enum value declaration', name, 'a value');
    const value = this.popToken();
    if (!isHexadecimalNumber(value)) {
      throw this.getUnexpectedError('a hexadecimal number', value);
    }
    if (expectedLength === null) {
      if (!isEnumValue(value)) {
        throw this.getUnexpectedError('an 8-bit, 16-bit, or 32-bit number', value);
      }
    } else if (value.value.length - 2 !== expectedLength) {
      throw this.getUnexpectedError(`${hexLengthToLabel[expectedLength]} number (derived from the previous values)`, value);
    }

    return {
      type: 'enumValue',
      start: name.start,
      end: value.end,
      props: { name, value },
    };
  }

  parseExpression() {
    const firstValue = this.parseExpressionValue();
    const elements = [firstValue];
    let operator;

    if (this.hasTokens) {
      operator = this.peekToken();

      while (isExpressionOperator(operator)) {
        elements.push(this.popToken());

        this.expectToken('expression', firstValue, 'a value');
        elements.push(this.parseExpressionValue());

        if (this.hasTokens) {
          operator = this.peekToken();
        } else {
          break;
        }
      }
    }

    return {
      type: 'expression',
      start: firstValue.start,
      end: elements[elements.length - 1].end,
      props: { elements },
    };
  }

  parseExpressionValue() {
    const value = this.popToken();

    if (isToken(value, 'operator', '(')) {
      this.expectToken('parenthesized expression', value, 'a value');
      const expression = this.parseExpression();

      this.expectToken('parenthesized expression', value, 'a closing paren \')\'');
      const closingParen = this.popToken();

      if (!isToken(closingParen, 'operator', ')')) {
        throw this.getUnexpectedError('a closing paren \')\'', closingParen);
      }

      return {
        type: 'expression',
        start: value.start,
        end: closingParen.end,
        props: {
          elements: [expression],
        },
      };
    }

    if (!isPrimitiveExpressionValue(value)) {
      throw this.getUnexpectedError('an expression value', value);
    }

    return value;
  }

  parseFieldDefinition() {
    const type = this.parseType();
    const props = { type };

    this.expectToken('field definition', type, 'a field name');
    if (isToken(this.peekToken(), 'operator', '[')) {
      const openingBracket = this.popToken();

      this.expectToken('array length expression', openingBracket, 'an expression');
      props.count = this.parseExpression();

      this.expectToken('array length expression', openingBracket, 'a closing bracket \']\'');
      const closingBracket = this.popToken();
      if (!isToken(closingBracket, 'operator', ']')) {
        throw this.getUnexpectedError('a closing bracket \']\'', closingBracket);
      }
    }

    this.expectToken('field definition', type, 'a field name');
    props.name = this.parseIdent('a field name');

    return {
      type: 'fieldDefinition',
      start: type.start,
      end: props.name.end,
      props,
    };
  }

  parseIdent(role) {
    const ident = this.popToken();

    if (ident.type !== 'ident') {
      throw this.getUnexpectedError(role, ident);
    }

    return ident;
  }

  parseMessage() {
    const messageKeyword = this.popToken();

    this.expectToken('message declaration', messageKeyword, 'a name');
    const name = this.parseIdent('a message name');

    this.expectToken('message declaration', messageKeyword, 'an assignment operator \'=\'');
    const equality = this.popToken();
    if (!isToken(equality, 'operator', '=')) {
      throw this.getUnexpectedError('an assignment operator \'=\'', equality);
    }

    this.expectToken('message declaration', messageKeyword, 'something 4');
    const id = this.popToken();
    if (id.type !== 'number') {
      throw this.getUnexpectedError('something 5', id);
    }

    this.expectToken('message declaration', messageKeyword, 'an opening brace \'{\'');
    const openingBrace = this.popToken();
    if (!isToken(openingBrace, 'operator', '{')) {
      throw this.getUnexpectedError('an opening brace \'{\'', openingBrace);
    }

    const fields = [];

    this.expectToken('message declaration', messageKeyword, 'a closing brace \'}\'');
    let closingBrace = this.peekToken();

    while (!isToken(closingBrace, 'operator', '}')) {
      fields.push(this.parseFieldDefinition());

      this.expectToken('message declaration', messageKeyword, 'a closing brace \'}\'');
      closingBrace = this.peekToken();
    }

    this.popToken();

    return {
      type: 'message',
      start: messageKeyword.start,
      end: closingBrace.end,
      props: { name, id, fields },
    };
  }

  parseStruct() {
    const structKeyword = this.popToken();

    this.expectToken('struct declaration', structKeyword, 'a name');
    const name = this.parseStructName();

    this.expectToken('struct declaration', structKeyword, 'an opening brace \'{\'');
    const openingBrace = this.popToken();
    if (!isToken(openingBrace, 'operator', '{')) {
      throw this.getUnexpectedError('an opening brace \'{\'', openingBrace);
    }

    const fields = [];

    this.expectToken('struct declaration', structKeyword, 'a closing brace \'}\'');
    let closingBrace = this.peekToken();

    while (!isToken(closingBrace, 'operator', '}')) {
      fields.push(this.parseFieldDefinition());

      this.expectToken('struct declaration', structKeyword, 'a closing brace \'}\'');
      closingBrace = this.peekToken();
    }

    this.popToken();

    return {
      type: 'struct',
      start: structKeyword.start,
      end: closingBrace.end,
      props: { name, fields },
    };
  }

  parseStructName() {
    const name = this.parseIdent('a struct name');
    const props = { name };
    let end = name.end;

    if (this.hasTokens) {
      const next = this.peekToken();

      if (isToken(next, 'operator', '<')) {
        const parameters = this.parseStructNameParameters();

        props.parameters = parameters;
        end = parameters.end;
      }
    }

    return {
      type: 'structName',
      start: name.start,
      end,
      props,
    };
  }

  parseStructNameParameters() {
    const openingPointyBracket = this.popToken();
    const parameters = [];
    let separator;

    do {
      this.expectToken('struct parameter list', openingPointyBracket, 'a parameter name');
      parameters.push(this.parseIdent('a parameter name'));

      this.expectToken('struct parameter list', openingPointyBracket, 'a closing pointy bracket \'>\'');
      separator = this.popToken();
      if (!isTypeParameterListOperator(separator)) {
        throw this.getUnexpectedError('a closing pointy bracket \'>\'', separator);
      }
    } while (separator.value === ',');

    return {
      type: 'parameters',
      start: openingPointyBracket.start,
      end: separator.end,
      props: { parameters },
    };
  }

  parseType() {
    const name = this.parseIdent('a type name');
    const props = { name };
    let end = name.end;

    if (this.hasTokens) {
      const next = this.peekToken();

      if (isToken(next, 'operator', '<')) {
        const parameters = this.parseTypeParameters();

        props.parameters = parameters;
        end = parameters.end;
      }
    }

    return {
      type: 'type',
      start: name.start,
      end,
      props,
    };
  }

  parseTypeParameters() {
    const openingPointyBracket = this.popToken();
    const parameters = [];
    let separator;

    do {
      this.expectToken('type parameter list', openingPointyBracket, 'a type');
      parameters.push(this.parseType());

      this.expectToken('type parameter list', openingPointyBracket, 'a closing pointy bracket \'>\'');
      separator = this.popToken();
      if (!isTypeParameterListOperator(separator)) {
        throw this.getUnexpectedError('a closing pointy bracket \'>\'', separator);
      }
    } while (separator.value === ',');

    return {
      type: 'parameters',
      start: openingPointyBracket.start,
      end: separator.end,
      props: { parameters },
    };
  }
}

export default function parse(lexerResult) {
  return new Parser(lexerResult).parse();
}
