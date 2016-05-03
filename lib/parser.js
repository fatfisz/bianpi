export default function parse(tokens, options) {
  const { start, end } = options;

  const rootNode = {
    type: 'root',
    start,
    end,
    children: [],
  };

  return rootNode;
}
