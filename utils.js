
/**
 * Pick a random element from an array.
 * @template T
 * @param {Array.<T>} array - An array of anything.
 * @return {T} A random element from array.
 */
function getRandomElement(array) {
  if (!array || array.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * Math.floor(array.length));
  return array[randomIndex];
}

/** Generate a random digit */
function getRandomDigit() {
  return Math.floor(Math.random() * Math.floor(10));
}

module.exports = {
    getRandomElement,
    getRandomDigit
}
