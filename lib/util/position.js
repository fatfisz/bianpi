const privateData = new WeakMap();

export default class Position {
  constructor(position = { line: 1, column: 1 }) {
    privateData.set(this, position);
  }

  toObject() {
    const { line, column } = privateData.get(this);

    return { line, column };
  }

  clone() {
    const clone = new Position();

    Object.assign(privateData.get(clone), this.toObject());

    return clone;
  }

  toString() {
    const { line, column } = privateData.get(this);

    return `${line}:${column}`;
  }

  next(char) {
    const data = privateData.get(this);

    if (char === '\n') {
      data.line += 1;
      data.column = 1;
    } else {
      data.column += 1;
    }
  }

  prevColumn() {
    const data = privateData.get(this);

    data.column -= 1;

    return this;
  }
}
