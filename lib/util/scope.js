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

  getSymbolName(name, type) {
    switch (type) {
      case 'value':
        return `${name}V`;
      case 'type':
        return `${name}T`;
      case 'message':
        return `${name}M`;
      default:
        throw new Error(`Unknown type ${type}.`);
    }
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

  hasOwn(name, type) {
    return this.symbols.has(this.getSymbolName(name, type));
  }

  has(name, type) {
    return this.internalHas(this.getSymbolName(name, type));
  }

  internalHas(name) {
    if (this.symbols.has(name)) {
      return true;
    }

    const { parentScope } = this;

    if (parentScope) {
      return parentScope.internalHas(name);
    }

    return false;
  }

  get(name, type) {
    return this.internalGet(this.getSymbolName(name, type));
  }

  internalGet(name) {
    const { symbols } = this;

    if (symbols.has(name)) {
      return symbols.get(name);
    }

    const { parentScope } = this;

    if (parentScope) {
      return parentScope.internalGet(name);
    }
  }

  set(name, type, props) {
    const symbolName = this.getSymbolName(name, type);
    const id = this.getUniqueId(symbolName);
    let info;

    if (props) {
      info = { type, id, props };
    } else {
      info = { type, id };
    }

    this.symbols.set(symbolName, info);
    this.root.allSymbols.add(id);

    return info;
  }

  exit() {
    for (const { id } of this.symbols.values()) {
      this.root.allSymbols.delete(id);
    }
  }
}
