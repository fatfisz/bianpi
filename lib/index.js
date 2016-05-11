import generate from './generator/index.js';
import tokenize from './lexer.js';
import parse from './parser/index.js';


export default function generateFromSource(source, options) {
  const lexerResult = tokenize(source, options);
  const tree = parse(lexerResult, options);
  return generate(tree, options);
}
