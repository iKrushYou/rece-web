export const nameToInitials = (name: string) => {
  return name
    .toUpperCase()
    .split(' ')
    .map((part) => part.substr(0, 1))
    .join('');
};

export const indexArray = (length: number) => new Array(length).fill(0).map((_, index) => index);

export const setify = <T>(array: T[]): T[] => [...new Set(array)];

export const calcPercent = (numerator: number, denominator: number, toFixed = 2) => {
  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return 0;
  return ((numerator / denominator) * 100.0).toFixed(toFixed);
};
