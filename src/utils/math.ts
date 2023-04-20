export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const percent = (value: number, total: number) => (value / total) * 100;
