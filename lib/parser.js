import dedent from './util/dedent';
import { ParserError } from './util/errors';
import Position from './util/position';
import {
  isToken,
  isDeclarationMode,
  isExpressionOperator,
  isPrimitiveExpressionValue,
  isRestrictedHexNumber,
  isTargetListOperator,
  isTypeParameterListOperator,
} from './util/tokens';


const noMoreTokens =
  'No more tokens available, please remember to check with this.hasTokens.';

const operatorValueToLabel = {
  '+': 'addiction operator \'+\'',
  '-': 'subtraction operator \'-\'',
  '*': 'multiplication operator \'*\'',
  '/': 'division operator \'/\'',
};

const hexLengthToLabel = {
  null: 'an 8-bit, 16-bit, or 32-bit',
  2: 'an 8-bit',
  4: 'a 16-bit',
  8: 'a 32-bit',
};

const defaultMessageIdLength = 4;


class Parser {
  constructor({ tokens, start, end }) {
    Object.assign(this, {
      tokens,
      start,
      end,
      messageIdLength: defaultMessageIdLength,
      currentTokenIndex: 0,
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

  getEOFError(type, relToken, ending) {
    if (process.env.NODE_ENV !== 'production' && !relToken.start) {
      throw new Error('The token is malformed.');
    }

    return new ParserError(
      dedent`Unexpected end of file.
            ${type.slice(0, 1).toUpperCase()}${type.slice(1)}
            at ${new Position(relToken.start)}
            ${ending}.`,
      this.end
    );
  }

  expectToken(type, relToken, relationAndToken) {
    if (!this.hasTokens) {
      throw new ParserError(
        dedent`Unexpected end of file.
               ${type.slice(0, 1).toUpperCase()}${type.slice(1)}
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
    const aliasKeyword = this.popToken();

    this.expectToken(
      'the \'alias\' keyword',
      aliasKeyword,
      'followed by a type'
    );
    const type = this.parseType();

    this.expectToken('type', type, 'followed by an alias name');
    const name = this.parseIdent('an alias name');

    return {
      type: 'alias',
      start: aliasKeyword.start,
      end: name.end,
      props: { type, name },
    };
  }

  parseBlock() {
    const openingBrace = this.popToken();
    const declarations = this.parseDeclarations();

    this.expectToken(
      'block',
      openingBrace,
      'ending with a closing brace \'}\''
    );
    const closingBrace = this.popToken();
    if (!isToken(closingBrace, 'operator', '}')) {
      throw this.getUnexpectedError(
        'a closing brace \'}\' for a block',
        closingBrace
      );
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

    this.expectToken(
      'the \'const\' keyword',
      constKeyword,
      'followed by a const name'
    );
    const name = this.parseIdent('a const name');

    this.expectToken(
      'const name',
      name,
      'followed by an assignment operator \'=\''
    );
    const assignment = this.popToken();
    if (!isToken(assignment, 'operator', '=')) {
      throw this.getUnexpectedError(
        'an assignment operator \'=\' after a const name',
        assignment
      );
    }

    this.expectToken(
      'an assignment operator \'=\'',
      assignment,
      'followed by an expression'
    );
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

      this.expectToken(
        'decorator operator \'@\'',
        decoratorOperator,
        'followed by a name (read/write)'
      );
      const name = this.popToken();
      if (!isDeclarationMode(name)) {
        throw this.getUnexpectedError(
          'a decorator name (read/write) after a decorator operator \'@\'',
          name
        );
      }

      this.expectToken(
        'decorator name',
        name,
        'followed by an opening paren \'(\''
      );
      const openingParen = this.popToken();
      if (!isToken(openingParen, 'operator', '(')) {
        throw this.getUnexpectedError(
          'an opening paren \'(\' after a decorator name',
          openingParen
        );
      }

      const targets = [];
      let separator;

      do {
        this.expectToken(
          separator ? 'comma \',\'' : 'opening paren \'(\'',
          separator || openingParen,
          'followed by a target name'
        );
        targets.push(this.parseIdent('a target name'));

        this.expectToken(
          'decorator arguments',
          openingParen,
          'followed by a closing paren \')\''
        );
        separator = this.popToken();
        if (!isTargetListOperator(separator)) {
          throw this.getUnexpectedError(
            'a closing paren \')\' after decorator arguments',
            separator
          );
        }
      } while (separator.value === ',');

      decorators.push({ name, targets });

      this.expectToken(
        'decorators',
        firstDecorator,
        'followed by a declaration'
      );
      decoratorOperator = this.peekToken();
    }

    const declaration = this.parseDeclaration();
    if (declaration === null) {
      throw this.getUnexpectedError(
        'a declaration after decorators',
        decoratorOperator
      );
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

    this.expectToken(
      'the \'enum\' keyword',
      enumKeyword,
      'followed by an enum name'
    );
    const name = this.parseIdent('an enum name');

    this.expectToken(
      'enum name',
      name,
      'an opening brace \'{\''
    );
    const openingBrace = this.popToken();
    if (!isToken(openingBrace, 'operator', '{')) {
      throw this.getUnexpectedError(
        'an opening brace \'{\' after an enum name',
        openingBrace
      );
    }

    this.expectToken(
      'an opening brace \'{\'',
      openingBrace,
      'followed by enum values'
    );
    const values = [this.parseEnumValue()];
    const expectedLength = values[0].props.value.value.length - 2;

    this.expectToken(
      'enum declaration',
      enumKeyword,
      'ending with a closing brace \'}\''
    );
    let closingBrace = this.peekToken();

    while (!isToken(closingBrace, 'operator', '}')) {
      values.push(this.parseEnumValue(expectedLength));

      this.expectToken(
        'enum declaration',
        enumKeyword,
        'ending with a closing brace \'}\''
      );
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

    this.expectToken(
      'enum value name',
      name,
      'followed by an assignment operator \'=\''
    );
    const assignment = this.popToken();
    if (!isToken(assignment, 'operator', '=')) {
      throw this.getUnexpectedError(
        'an assignment operator \'=\' after an enum value name',
        assignment
      );
    }

    const derivedInfo = expectedLength === null ?
      '' :
      ' (derived from preceding values)';
    const expectedNumber =
      `${hexLengthToLabel[expectedLength]} hexadecimal number`;

    this.expectToken(
      'assignment operator \'=\'',
      assignment,
      `followed by ${expectedNumber}${derivedInfo}`
    );
    const value = this.popToken();
    if (!isRestrictedHexNumber(value, expectedLength)) {
      throw this.getUnexpectedError(
        `${expectedNumber} for an enum value${derivedInfo}`,
        value
      );
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

        this.expectToken(
          operatorValueToLabel[operator.value],
          operator,
          'followed by a value'
        );
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
      this.expectToken(
        'opening paren \'(\'',
        value,
        'followed by a value'
      );
      const expression = this.parseExpression();

      this.expectToken(
        'expression in parentheses',
        value,
        'ending with a closing paren \')\''
      );
      const closingParen = this.popToken();

      if (!isToken(closingParen, 'operator', ')')) {
        throw this.getUnexpectedError(
          'a closing paren \')\' for an expression in parentheses',
          closingParen
        );
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

    this.expectToken(
      'field type',
      type,
      'followed by a field name'
    );
    if (isToken(this.peekToken(), 'operator', '[')) {
      const openingBracket = this.popToken();

      this.expectToken(
        'opening bracket \'[\'',
        openingBracket,
        'followed by an array length expression'
      );
      const count = this.parseExpression();
      props.count = count;

      this.expectToken(
        'array length expression',
        count,
        'followed by a closing bracket \']\''
      );
      const closingBracket = this.popToken();
      if (!isToken(closingBracket, 'operator', ']')) {
        throw this.getUnexpectedError(
          'a closing bracket \']\' after an array length expression',
          closingBracket
        );
      }
    }

    this.expectToken(
      'field type',
      type,
      'followed by a field name'
    );
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

    this.expectToken(
      'the \'message\' keyword',
      messageKeyword,
      'followed by a message name'
    );
    const name = this.parseIdent('a message name');

    this.expectToken(
      'message name',
      name,
      'followed by an assignment operator \'=\''
    );
    const assignment = this.popToken();
    if (!isToken(assignment, 'operator', '=')) {
      throw this.getUnexpectedError(
        'an assignment operator \'=\' after a message name',
        assignment
      );
    }

    const expectedNumber =
      `${hexLengthToLabel[this.messageIdLength]} hexadecimal number`;

    this.expectToken(
      'an assignment operator \'=\'',
      assignment,
      `followed by ${expectedNumber}`
    );
    const id = this.popToken();
    if (!isRestrictedHexNumber(id, this.messageIdLength)) {
      throw this.getUnexpectedError(`${expectedNumber} for a message id`, id);
    }

    this.expectToken(
      'message id',
      id,
      'followed by an opening brace \'{\''
    );
    const openingBrace = this.popToken();
    if (!isToken(openingBrace, 'operator', '{')) {
      throw this.getUnexpectedError(
        'an opening brace \'{\' after a message id',
        openingBrace
      );
    }

    const fields = [];

    this.expectToken(
      'message declaration',
      messageKeyword,
      'ending with a closing brace \'}\''
    );
    let closingBrace = this.peekToken();

    while (!isToken(closingBrace, 'operator', '}')) {
      fields.push(this.parseFieldDefinition());

      this.expectToken(
        'message declaration',
        messageKeyword,
        'ending with a closing brace \'}\''
      );
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

    this.expectToken(
      'the \'struct\' keyword',
      structKeyword,
      'followed by a struct name'
    );
    const name = this.parseStructName();

    this.expectToken(
      'struct name',
      name,
      'followed by an opening brace \'{\''
    );
    const openingBrace = this.popToken();
    if (!isToken(openingBrace, 'operator', '{')) {
      throw this.getUnexpectedError(
        'an opening brace \'{\' after a struct name',
        openingBrace
      );
    }

    const fields = [];

    this.expectToken(
      'struct declaration',
      structKeyword,
      'ending with a closing brace \'}\''
    );
    let closingBrace = this.peekToken();

    while (!isToken(closingBrace, 'operator', '}')) {
      fields.push(this.parseFieldDefinition());

      this.expectToken(
        'struct declaration',
        structKeyword,
        'ending with a closing brace \'}\''
      );
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
      this.expectToken(
        separator ? 'comma \',\'' : 'opening pointy bracket \'<\'',
        separator || openingPointyBracket,
        'followed by a parameter name'
      );
      parameters.push(this.parseIdent('a parameter name'));

      this.expectToken(
        'struct parameters',
        openingPointyBracket,
        'followed by a closing pointy bracket \'>\''
      );
      separator = this.popToken();
      if (!isTypeParameterListOperator(separator)) {
        throw this.getUnexpectedError(
          'a closing pointy bracket \'>\' for a struct parameter list',
          separator
        );
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
      this.expectToken(
        separator ? 'comma \',\'' : 'opening pointy bracket \'<\'',
        separator || openingPointyBracket,
        'followed by a type'
      );
      parameters.push(this.parseType());

      this.expectToken(
        'type parameters',
        openingPointyBracket,
        'followed by a closing pointy bracket \'>\''
      );
      separator = this.popToken();
      if (!isTypeParameterListOperator(separator)) {
        throw this.getUnexpectedError(
          'a closing pointy bracket \'>\' for a type parameter list',
          separator
        );
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
