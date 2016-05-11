const newline = / *\n */g;

function newlineToSpace(string) {
  return string.replace(newline, '\n');
}

export default function trimAroundNewline(strings, ...values) {
  return values.reduce(
    (acc, value, index) => acc + value + newlineToSpace(strings[index + 1]),
    newlineToSpace(strings[0])
  ).trim();
}
