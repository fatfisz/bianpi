import IDStartRegExp from 'unicode-8.0.0/properties/ID_Start/regex';
import IDContinueRegExp from 'unicode-8.0.0/properties/ID_Continue/regex';


const whiteSpace = /\s/;
const digit = /[0-9]/;
const hexDigit = /[0-9a-f]/i;
const IDStartExtraRegExp = /[$_]/;
const IDContinueExtraRegExp = /[$_\u200c\u200d]/;

export function isWhitespace(char) {
  return char === null || whiteSpace.test(char);
}

export function isDigit(char) {
  return char !== null && digit.test(char);
}

export function isHexDigit(char) {
  return char !== null && hexDigit.test(char);
}

export function isIDStart(char) {
  return char !== null &&
    (IDStartRegExp.test(char) || IDStartExtraRegExp.test(char));
}

export function isIDContinue(char) {
  return char !== null &&
    (IDContinueRegExp.test(char) || IDContinueExtraRegExp.test(char));
}
