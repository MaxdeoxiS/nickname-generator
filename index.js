const constants = require('./constants.js');
const utils = require('./utils');

const defaultConfig = {
  // Categories to include. Empty array or null will includes everything
  includes: [],
  // Number of digits at the end of the nickname
  suffixLength: 2,
  // Number of words to combine
  numberOfWords: 2,
  // The language to use for the words. Only supports English ('en') and French ('fr')
  locale: constants.locales.en
}

/**
 * Create a random nickname.
 * @param config Parameters for the nickname generation.
 * @param config.includes The categories of words to include. Null or empty will include everything.
 * @param config.suffixLength The number of digits appended at the end.
 * @param config.numberOfWords The number of words to combine.
 * @return {string} A randomly generated nickname.
 */
exports.randomNickname = (config = defaultConfig) => {

  if (!Object.values(constants.locales).includes(config.locale)) {
    throw new Error("Locale not supported. Supported locales are: " + Object.values(constants.locales).map(String));
  }

  var data = require(constants.dataPath + config.locale + '.js').all;
  const allCategories = Object.keys(data);

  if (config.numberOfWords > allCategories) {
    throw new Error("Wrong config parameter 'numberOfWords' provided. Must be < " + allCategories.length + 1);
  }

  const includeAll = !config.includes || config.includes.length === 0;
  const selectedCategories = includeAll ? allCategories : config.includes;
  const nbOfWords = config.numberOfWords ? config.numberOfWords : defaultConfig.numberOfWords;
  const nbOfDigits = config.suffixLength ? config.suffixLength : defaultConfig.suffixLength;

  let availableCategories = allCategories.filter(cat => selectedCategories.includes(cat));

  let combinedWords = '';
  let suffix = '';

  // Generate words combination
  for (i = 0; i < nbOfWords; i++) {
    if (availableCategories.length === 0) {
      break;
    }
    const randomCategory = utils.getRandomElement(availableCategories);
    const randomWord = utils.getRandomElement(data[randomCategory]);
    // Remove current word's category for next iterations
    availableCategories = availableCategories.filter(cat => cat !== randomCategory);

    combinedWords += randomWord;
  }

  // Generate random number
  for (i = 0; i < nbOfDigits; i++) {
    const randomDigit = utils.getRandomDigit();
    suffix += randomDigit;
  }

  const nickname = combinedWords + suffix;

  console.log(nickname);
  return nickname;
}

require('./index.js').randomNickname({ locale: 'fr' })

