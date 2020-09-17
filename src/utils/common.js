export function checkType(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
