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

export function isEnumValue({ value: { length } }) {
  return length === 4 || length === 6 || length === 10;
}

export function isExpressionOperator({ type, value }) {
  return type === 'operator' && expressionOperatorValue.test(value);
}

export function isHexadecimalNumber({ type, value }) {
  return type === 'number' && value.slice(0, 2) === '0x';
}

export function isPrimitiveExpressionValue({ type }) {
  return primitiveTokenType.test(type);
}

export function isTargetListOperator({ type, value }) {
  return type === 'operator' && targetListOperator.test(value);
}

export function isTypeParameterListOperator({ type, value }) {
  return type === 'operator' && typeParameterListOperator.test(value);
}
