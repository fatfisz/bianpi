const newline = /\s*\n\s*/g;

function newlineToSpace(str) {
  return str.replace(newline, ' ');
}

export default function dedent(strings, ...values) {
  const mappedStrings = strings.map(newlineToSpace);

  return values.reduce(
    (acc, value, index) => acc + value + mappedStrings[index + 1],
    strings[0]
  ).trim();
}
