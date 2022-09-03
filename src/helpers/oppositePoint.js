/**
 * @param {number} index
 * @return {number}
 */
export default function oppositePointTo(index) {
  if (index === 0) return 2;
  if (index === 1) return 3;
  if (index === 2) return 0;
  if (index === 3) return 1;
  throw Error('invalid point index');
}
