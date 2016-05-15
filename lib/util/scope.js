import dedent from 'lib/util/dedent.js';
import Position from 'lib/util/position.js';
import {
  ENUM,
  ENUM_NAME,
  ENUM_VALUE,
  FIELD,
  MESSAGE,
  MESSAGE_ID,
  TYPE,
  VALUE,
} from 'lib/util/scope_types.js';


function getSymbolSuffix(type) {
  switch (type) {
    case ENUM:
      return 'e';
    case ENUM_NAME:
      return 'en';
    case ENUM_VALUE:
      return 'ev';
    case FIELD:
    case VALUE:
      return 'v';
    case MESSAGE:
      return 'm';
    case MESSAGE_ID:
      return 'i';
    case TYPE:
      return 't';
  }

  if (process.env.NODE_ENV !== 'production') {
    throw new Error(`Unknown symbol type '${type}'.`);
  }
}

function getSymbolName(name, type) {
  return `${name}_${getSymbolSuffix(type)}`;
}

function getSymbolTypeVerboseName(type) {
  switch (type) {
    case ENUM:
      return 'an enum name';
    case ENUM_NAME:
      return 'an enum value name';
    case ENUM_VALUE:
      return 'an enum value';
    case FIELD:
      return 'a field name';
    case MESSAGE:
      return 'a message name';
    case MESSAGE_ID:
      return 'a message id';
    case TYPE:
      return 'a type name';
    case VALUE:
      return 'a value';
  }

  if (process.env.NODE_ENV !== 'production') {
    throw new Error(`Unknown symbol type '${type}'.`);
  }
}

export default class Scope {
  constructor(parentScope, isActualScope = false) {
    Object.assign(this, {
      parentScope,
      root: parentScope ? parentScope.root : this,
      symbols: new Map(),
      symbolSet: isActualScope || !parentScope ?
        new Set() :
        parentScope.symbolSet,
    });
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
    return this.symbols.has(getSymbolName(name, type));
  }

  has(name, type) {
    return this.internalHas(getSymbolName(name, type));
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
    return this.internalGet(getSymbolName(name, type));
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
    const symbolName = getSymbolName(name, type);
    const id = this.getUniqueId(symbolName);
    const info = { id, type };

    if (props) {
      info.props = props;
    }

    this.symbols.set(symbolName, info);
    this.symbolSet.add(id);

    return info;
  }

  expect(name, type, options = {}) {
    if (process.env.NODE_ENV !== 'production' && !this.has(name, type)) {
      const typeVerboseName = getSymbolTypeVerboseName(type);
      const cleanType = typeVerboseName.replace(/^an? /, '');
      const error = new Error(`The '${name}' ${cleanType} is not declared.`);

      if (options.fatal) {
        throw error;
      }

      this.root.addError(error);
    }
  }

  expectAndGet({ value: name }, type, options) {
    this.expect(name, type, options);

    return this.get(name, type);
  }

  setIfNotPresent({ value: name, start },
                  type,
                  props,
                  helperText = 'declared in the current scope') {
    if (process.env.NODE_ENV !== 'production' && this.hasOwn(name, type)) {
      const existingSymbol = this.get(name, type);
      const typeVerboseName = getSymbolTypeVerboseName(type);

      if (existingSymbol.props.internalType) {
        this.root.addError(
          new Error(
            dedent`The '${name}' type is an internal type name and
                   can't be used as ${typeVerboseName} in the current scope.`
          )
        );
      } else {
        const cleanType = typeVerboseName.replace(/^an? /, '');

        this.root.addError(
          new Error(
            dedent`The '${name}' ${cleanType} is already ${helperText}
                   at ${new Position(existingSymbol.props.start)}.`
          )
        );
      }

      return existingSymbol;
    }

    // Not as a default value, because `null` needs to be handled too
    const enhancedProps = props || {};
    if (!enhancedProps.start) {
      enhancedProps.start = start;
    }

    return this.set(name, type, enhancedProps);
  }
}
