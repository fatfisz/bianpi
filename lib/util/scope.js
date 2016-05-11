let id = 0;

export default class Scope {
  constructor(parentScope) {
    Object.assign(this, {
      id,
      parentScope,
      root: parentScope ? parentScope.root : this,
      symbols: new Map(),
    });

    id += 1;
  }

  hasOwn(name) {
    return this.symbols.has(name);
  }

  has(name) {
    const { symbols } = this;

    if (symbols.has(name)) {
      return true;
    }

    const { parentScope } = this;

    if (parentScope) {
      return parentScope.has(name);
    }

    return false;
  }

  get(name) {
    const { symbols } = this;

    if (symbols.has(name)) {
      return symbols.get(name);
    }

    const { parentScope } = this;

    if (parentScope) {
      return parentScope.get(name);
    }
  }

  set(name, type, props) {
    const id = this.getUniqueId(name);
    let info;

    if (props) {
      info = { type, id, props };
    } else {
      info = { type, id };
    }

    this.symbols.set(name, info);
    this.root.allSymbols.add(id);

    return info;
  }

  getUniqueId(name) {
    const base = `_${name}_`;
    let current = base;
    let index = 0;

    while (this.root.allSymbols.has(current)) {
      index += 1;
      current = `${base}$${index}`;
    }

    return current;
  }

  exit() {
    for (const { id } of this.symbols.values()) {
      this.root.allSymbols.delete(id);
    }
  }
}
