const newline = /\s*\n\s*/g;

function newlineToSpace(str) {
  return str.replace(newline, ' ');
}

export default function dedent(strings, ...values) {
  return values.reduce(
    (acc, value, index) => acc + value + newlineToSpace(strings[index + 1]),
    newlineToSpace(strings[0])
  ).trim();
}
