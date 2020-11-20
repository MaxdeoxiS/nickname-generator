var data = require('./data.js').all;

const defaultParams = {
  // Categories to include. Empty array or null will includes everything
  includes: [],
  // Number of digits at the end of the nickname
  suffixLength: 3,
  // Number of words to combine
  numberOfWords: 2
}

function getRandomElement(array) {
  if (!array || array.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * Math.floor(array.length));
  return array[randomIndex];
}

function getRandomDigit() {
  return Math.floor(Math.random() * Math.floor(10));
}

exports.randomNickname = (params = defaultParams) => {
  const allCategories = Object.keys(data);

  const includeAll = !params.includes || params.includes.length === 0;
  const selectedCategories = includeAll ? allCategories : params.includes;
  const nbOfWords = params.numberOfWords;
  const nbOfDigits = params.suffixLength;

  let availableCategories = allCategories.filter(cat => selectedCategories.includes(cat));

  let combinedWords = '';
  let suffix = '';

  for (i = 0; i < nbOfWords; i++) {
    if (availableCategories.length === 0) {
      break;
    }
    const randomCategory = getRandomElement(availableCategories);
    const randomWord = getRandomElement(data[randomCategory]);
    availableCategories = availableCategories.filter(cat => cat !== randomCategory);

    combinedWords += randomWord;
  }

  for (i = 0; i < nbOfDigits; i++) {
    const randomDigit = getRandomDigit();
    suffix += randomDigit;
  }

  const nickname = combinedWords + suffix;

  return nickname;
}