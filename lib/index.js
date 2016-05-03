import tokenize from './lexer';
import parse from './parser';


export default function generate(source, options) {
  const lexerResult = tokenize(source, options);
  const tree = parse(lexerResult, options);

  return tree;
}
