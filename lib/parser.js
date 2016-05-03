class Parser {
  constructor({ tokens, start, end }) {
    const rootNode = {
      type: 'root',
      start,
      end,
      children: [],
    };

    Object.assign(this, {
      tokens,
      root: rootNode,
      currentNode: rootNode,
    });
  }

  parse() {

  }
}

export default function parse(lexerResult) {
  const parser = new Parser(lexerResult);

  parser.parse();

  return parser.root;
}
