let id = 0;

export default class Scope {
  constructor(parentScope, isActualScope = false) {
    if (process.env.NODE_ENV !== 'production' &&
        !parentScope && !isActualScope) {
      throw new Error('Root scope has to represent an actual scope.');
    }

    Object.assign(this, {
      id,
      parentScope,
      root: parentScope ? parentScope.root : this,
      symbols: new Map(),
      symbolSet: isActualScope ? new Set() : parentScope.symbolSet,
    });

    id += 1;
  }

  getSymbolName(name, type) {
    return `${name}_${type[0]}`;
  }

  getUniqueId(name) {
    const base = `_${name}_`;
    let current = base;
    let index = 0;

    while (this.symbolSet.has(current)) {
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
      info = { id, type, props };
    } else {
      info = { id, type };
    }

    this.symbols.set(symbolName, info);
    this.symbolSet.add(id);

    return info;
  }
}
