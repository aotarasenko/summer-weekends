export function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isArraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
