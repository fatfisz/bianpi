import tokenize from './lexer';
import parse from './parser';


export default function generate(source, options) {
  const { start, end, tokens } = tokenize(source, options);
  const tree = parse(tokens, { start, end });

  return tree;
}
