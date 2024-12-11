const generateColor = (variable: string): string => {
  let hash = 0;
  for (let i = 0; i < variable.length; i++) {
    hash = variable.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 80%, 55%)`;
};

export default generateColor;
