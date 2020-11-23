var data = require('./data.js').all;

const defaultParams = {
  // Categories to include. Empty array or null will includes everything
  includes: [],
  // Number of digits at the end of the nickname
  suffixLength: 2,
  // Number of words to combine
  numberOfWords: 2
}


/**
 * Create a random nickname.
 * @param params Parameters for the nickname generation.
 * @param params.includes The categories of words to include. Null or empty will include everything.
 * @param params.suffixLength The number of digits appended at the end.
 * @param params.numberOfWords The number of words to combine.
 * @return {string} A randomly generated nickname.
 */
exports.randomNickname = (params = defaultParams) => {
  const allCategories = Object.keys(data);

  const includeAll = !params.includes || params.includes.length === 0;
  const selectedCategories = includeAll ? allCategories : params.includes;
  const nbOfWords = params.numberOfWords;
  const nbOfDigits = params.suffixLength;

  let availableCategories = allCategories.filter(cat => selectedCategories.includes(cat));

  let combinedWords = '';
  let suffix = '';

  // Generate words combination
  for (i = 0; i < nbOfWords; i++) {
    if (availableCategories.length === 0) {
      break;
    }
    const randomCategory = getRandomElement(availableCategories);
    const randomWord = getRandomElement(data[randomCategory]);
    // Remove current word's category for next iterations
    availableCategories = availableCategories.filter(cat => cat !== randomCategory);

    combinedWords += randomWord;
  }

  // Generate random number
  for (i = 0; i < nbOfDigits; i++) {
    const randomDigit = getRandomDigit();
    suffix += randomDigit;
  }

  const nickname = combinedWords + suffix;

  return nickname;
}

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