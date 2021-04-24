export default function labelFormat(number: number) {
  if (number < 1) {
    return `${(number * 1000).toFixed()} m`;
  }
  return `${number.toFixed(2)} km`;
}
