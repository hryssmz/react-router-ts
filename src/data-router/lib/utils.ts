// data-router/lib/utils.ts
export function sleep(n = 500) {
  return new Promise(r => setTimeout(r, n));
}
