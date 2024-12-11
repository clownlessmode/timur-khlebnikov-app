function generateWordByCount(
  count: number,
  words: [string, string, string]
): string {
  const [singular, genitiveSingular, genitivePlural] = words;

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `${count} ${singular}`;
  } else if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 10 || lastTwoDigits >= 20)
  ) {
    return `${count} ${genitiveSingular}`;
  } else {
    return `${count} ${genitivePlural}`;
  }
}
export default generateWordByCount;
