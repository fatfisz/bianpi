export class LexerError extends Error {
  constructor(message, position) {
    super(message);

    Object.assign(this, position);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

LexerError.prototype.name = 'LexerError';
LexerError.prototype.message = '';
