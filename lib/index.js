import tokenize from './lexer.js';
import parse from './parser/index.js';


export default function generate(source, options) {
  const lexerResult = tokenize(source, options);
  const tree = parse(lexerResult, options);

  return tree;
}
