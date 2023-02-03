export function s4(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString()
    .substring(1);
}
