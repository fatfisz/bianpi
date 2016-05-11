import IDStart from 'unicode-8.0.0/properties/ID_Start/regex.js';
import IDContinue from 'unicode-8.0.0/properties/ID_Continue/regex.js';


const digit = /^[0-9]$/;
const hexDigit = /^[0-9a-f]$/i;
const IDStartExtra = /^[$_]$/;
const IDContinueExtra = /^[$_\u200c\u200d]$/;
const operator = /^[=+\-*{}()[\]<>@,]$/;
const whiteSpace = /^\s$/;

export function isAnyEnd(char) {
  return char === null || char === '\n' || char === '\r';
}

export function isDigit(char) {
  return char !== null && digit.test(char);
}

export function isHexDigit(char) {
  return char !== null && hexDigit.test(char);
}

export function isIDStart(char) {
  return char !== null && (IDStart.test(char) || IDStartExtra.test(char));
}

export function isIDContinue(char) {
  return char !== null && (IDContinue.test(char) || IDContinueExtra.test(char));
}

export function isOperator(char) {
  return char !== null && operator.test(char);
}

export function isWhitespace(char) {
  return char === null || whiteSpace.test(char);
}
