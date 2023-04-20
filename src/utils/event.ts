export const getClientX = (e: TouchEvent | MouseEvent) => {
  if ('clientX' in e) {
    return e.clientX;
  }
  return e.touches[0].clientX;
};
