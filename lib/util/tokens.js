const declarationMode = /^(read|write)$/;
const expressionOperatorValue = /^[+\-*/]$/;
const primitiveTokenType = /^(ident|number|string)$/;
const targetListOperator = /^[,)]$/;
const typeParameterListOperator = /^[,>]$/;

export function isToken({ type, value }, expectedType, expectedValue) {
  return type === expectedType && value === expectedValue;
}

export function isDeclarationMode({ type, value }) {
  return type === 'ident' && declarationMode.test(value);
}

export function isExpressionOperator({ type, value }) {
  return type === 'operator' && expressionOperatorValue.test(value);
}

export function isPrimitiveExpressionValue({ type }) {
  return primitiveTokenType.test(type);
}

export function isRestrictedHexNumber({ type, value }, expectedLength = null) {
  if (type !== 'number' || value.slice(0, 2) !== '0x') {
    return false;
  }

  const { length } = value;

  if (expectedLength === null) {
    return length === 4 || length === 6 || length === 10;
  }

  return length - 2 === expectedLength;
}

export function isTargetListOperator({ type, value }) {
  return type === 'operator' && targetListOperator.test(value);
}

export function isTypeParameterListOperator({ type, value }) {
  return type === 'operator' && typeParameterListOperator.test(value);
}
