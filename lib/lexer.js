import {
  isWhitespace,
  isDigit,
  isHexDigit,
  isIDStart,
  isIDContinue,
  isOperator,
} from './util/characters';
import dedent from './util/dedent';
import { LexerError } from './util/errors';
import Position from './util/position';


const STATE_DEFAULT = Symbol();
const STATE_SLASH = Symbol();
const STATE_COMMENT_SINGLE = Symbol();
const STATE_COMMENT_MULTI = Symbol();
const STATE_COMMENT_MULTI_ASTERISK = Symbol();
const STATE_ZERO = Symbol();
const STATE_ZERO_X = Symbol();
const STATE_NUMBER = Symbol();
const STATE_HEX_NUMBER = Symbol();
const STATE_STRING = Symbol();
const STATE_STRING_ESCAPE = Symbol();
const STATE_IDENTIFIER = Symbol();

class Lexer {
  constructor(source, { trackComments = false }) {
    Object.assign(this, {
      source,
      trackComments,
      tokens: [],
      state: STATE_DEFAULT,
      position: new Position(),
      index: 0,
      savedPosition: null,
      savedIndex: null,
    });
  }

  savePosition() {
    const { position, index } = this;

    Object.assign(this, {
      savedPosition: position.clone(),
      savedIndex: index,
    });
  }

  nextPosition(char) {
    this.position.next(char);
    this.index += char.length;
  }

  pushToken(type, textStartOffset = 0, textEndOffset = 0) {
    if (!this.trackComments && type === 'comment') {
      return;
    }

    this.tokens.push({
      type,
      start: this.savedPosition.toObject(),
      end: this.position.clone().toObject(),
      value: this.source.slice(
        this.savedIndex + textStartOffset,
        this.index + textEndOffset
      ),
    });
  }

  pushTokenPrevColumn(type, textStartOffset = 0, textEndOffset = 0) {
    if (!this.trackComments && type === 'comment') {
      return;
    }

    this.tokens.push({
      type,
      start: this.savedPosition.toObject(),
      end: this.position.clone().prevColumn().toObject(),
      value: this.source.slice(
        this.savedIndex + textStartOffset,
        this.index + textEndOffset
      ),
    });
  }

  getPlainUnexpectedCharError(char) {
    return new LexerError(
      `Unexpected character '${char}'.`,
      this.position.toObject()
    );
  }

  getUnexpectedCharError(type, char) {
    return new LexerError(
      dedent`Unexpected character '${char}'.
             ${type} at ${this.savedPosition} is unfinished.`,
      this.position.toObject()
    );
  }

  getUnexpectedEndError(type, char) {
    return new LexerError(
      dedent`Unexpected end of ${char === null ? 'file' : 'line'}.
             ${type} at ${this.savedPosition} is unfinished.`,
      this.position.toObject()
    );
  }

  handleChar(char) {
    switch (this.state) {
      case STATE_DEFAULT:
        if (char === '/') {
          this.state = STATE_SLASH;
          this.savePosition();
        } else if (char === '0') {
          this.state = STATE_ZERO;
          this.savePosition();
        } else if (isDigit(char)) {
          this.state = STATE_NUMBER;
          this.savePosition();
        } else if (char === '\'') {
          this.state = STATE_STRING;
          this.savePosition();
        } else if (isOperator(char)) {
          this.savePosition();
          this.pushToken('operator', 0, 1);
        } else if (isIDStart(char)) {
          this.state = STATE_IDENTIFIER;
          this.savePosition();
        } else if (!isWhitespace(char)) {
          throw this.getPlainUnexpectedCharError(char);
        }
        break;
      case STATE_SLASH:
        switch (char) {
          case '*':
            this.state = STATE_COMMENT_MULTI;
            break;
          case '/':
            this.state = STATE_COMMENT_SINGLE;
            break;
          default:
            this.state = STATE_DEFAULT;
            this.pushTokenPrevColumn('operator');
            this.handleChar(char);
        }
        break;
      case STATE_COMMENT_SINGLE:
        switch (char) {
          case null:
          case '\n':
          case '\r':
            this.state = STATE_DEFAULT;
            this.pushTokenPrevColumn('comment', 2);
        }
        break;
      case STATE_COMMENT_MULTI:
        switch (char) {
          case null:
            throw this.getUnexpectedEndError('Comment', char);
          case '*':
            this.state = STATE_COMMENT_MULTI_ASTERISK;
        }
        break;
      case STATE_COMMENT_MULTI_ASTERISK:
        switch (char) {
          case null:
            throw this.getUnexpectedEndError('Comment', char);
          case '*':
            // Do nothing
            break;
          case '/':
            this.state = STATE_DEFAULT;
            this.pushToken('comment', 2, -1);
            break;
          default:
            this.state = STATE_COMMENT_MULTI;
        }
        break;
      case STATE_ZERO:
        if (char === 'x') {
          this.state = STATE_ZERO_X;
        } else {
          this.state = STATE_NUMBER;
          this.handleChar(char);
        }
        break;
      case STATE_ZERO_X:
        switch (char) {
          case null:
          case '\n':
          case '\r':
            throw this.getUnexpectedEndError('Number', char);
          default:
            if (!isHexDigit(char)) {
              throw this.getUnexpectedCharError('Number', char);
            }
            this.state = STATE_HEX_NUMBER;
            this.handleChar(char);
        }
        break;
      case STATE_NUMBER:
        if (!isDigit(char)) {
          this.state = STATE_DEFAULT;
          this.pushTokenPrevColumn('number');
          this.handleChar(char);
        }
        break;
      case STATE_HEX_NUMBER:
        if (!isHexDigit(char)) {
          this.state = STATE_DEFAULT;
          this.pushTokenPrevColumn('number');
          this.handleChar(char);
        }
        break;
      case STATE_STRING:
        switch (char) {
          case null:
          case '\n':
          case '\r':
            throw this.getUnexpectedEndError('String', char);
          case '\'':
            this.state = STATE_DEFAULT;
            this.pushToken('string', 1);
            break;
          case '\\':
            this.state = STATE_STRING_ESCAPE;
            break;
        }
        break;
      case STATE_STRING_ESCAPE:
        switch (char) {
          case null:
          case '\n':
          case '\r':
            throw this.getUnexpectedEndError('String', char);
        }
        break;
      case STATE_IDENTIFIER:
        if (!isIDContinue(char)) {
          this.state = STATE_DEFAULT;
          this.pushTokenPrevColumn('ident');
          this.handleChar(char);
        }
    }
  }
}

export default function tokenize(rawSource, options = {}) {
  const source = `${rawSource}`;
  const lexer = new Lexer(source, options);

  for (const char of source) {
    lexer.handleChar(char);
    lexer.nextPosition(char);
  }

  // Handle the end of file
  lexer.handleChar(null);

  return {
    start: new Position().toObject(),
    end: lexer.position.toObject(),
    tokens: lexer.tokens,
  };
}
