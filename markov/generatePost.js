//need to get tweets from database
const axios = require('axios')
//twitterName is passed down , a lot!, make this less complex...

const fetchTweets = async twitterName => {
  try {
    const {data} = await axios.get(`/api/tweets/${twitterName}`)
    return data
  } catch (err) {
    console.log(err.message)
  }
}
/**
 * parseTweet
 * params: string : Tweet
 * return parsed tweet
 */
const parseTweet = tweet => {
  let TweetArr = tweet.split(' ')
  let result = TweetArr.map(word => {
    if (word.includes('@') || word.includes('/') || word.includes('&')) {
      word = ''
    } else {
      word = word.toLowerCase().replace(/[)(?!,.]/g, '')
    }
    return word
  })
  return result.filter(word => word !== '')
}
/**
 * parseTweetArray async function that runs fetch tweets
 * returns type: array
 */
const parseTweetArray = async twitterName => {
  try {
    let tweetWordsArray = []
    const tweetArray = await fetchTweets(twitterName)
    tweetArray.forEach(tweet => {
      tweetWordsArray = tweetWordsArray.concat(parseTweet(tweet.content))
    })
    return tweetWordsArray
  } catch (err) {
    console.log(err)
  }
}

/**
 * generateWords: Args : parsed array of tweet words
 * returns: {tweetObj: {}}
 */
let generateWordPairs = async twitterName => {
  let obj = {}
  const array = (await parseTweetArray(twitterName)) || []
  //let array = parseText(string);
  for (let i = 0; i < array.length - 1; i++) {
    let element = array[i]
    if (obj[element]) {
      obj[element].push(array[i + 1])
      if (array[i + 2]) {
        obj[element].push(`${array[i + 1]} ${array[i + 2]}`)
      }
      if (array[i + 3]) {
        obj[element].push(`${array[i + 1]} ${array[i + 2]} ${array[i + 3]}`)
      }
    } else {
      obj[element] = [array[i + 1]]
      if (array[i + 2]) {
        obj[element].push(`${array[i + 1]} ${array[i + 2]}`)
      }
      if (array[i + 3]) {
        obj[element].push(`${array[i + 1]} ${array[i + 2]} ${array[i + 3]}`)
      }
    }
  }
  return obj
}

//generateWordPairs();
// console.log(tweetWordObj)

//create function writeLine that takes a markov Chain (object) and a length of words (n) and returns a line of poetry, it will need a helper function that takes a word and randomly choose a word from its markov chain array. when a word has no entries in it's markov chain the program should choose a new word and continue the line until it meets the word count
function getRandomWord(word, obj) {
  let randomWord = ''
  let keyArray = Object.keys(obj)

  if (typeof obj[word] === 'undefined') {
    let keyLength = keyArray.length
    let randomIndex = Math.floor(Math.random() * keyLength)
    randomWord = `${keyArray[randomIndex]}`
  } else if (obj[word].length > 1) {
    let length = obj[word].length
    let randomIndex = Math.floor(Math.random() * length)
    randomWord = `${obj[word][randomIndex]}`
  } else {
    randomWord = `${obj[word]}`
  }
  return randomWord
}

function formatSentence(text) {
  let textArray = text.split(' ')
  let length = textArray.length
  // if(textArray[length-1] === "the" || textArray[length-1] === "and" || textArray[length-1] === "i"){
  //   textArray.pop();
  //   length = textArray.length;
  // }
  let newSentence = `${text.charAt(0).toUpperCase()}${text.slice(1)}`
  let upperCaseSentence = ''

  if (length === 3) {
    upperCaseSentence = `${newSentence.toUpperCase()}!`
    return upperCaseSentence
  }
  newSentence += '.'
  return newSentence
}

function writeLine(obj, numWords) {
  //n is the number of words
  let keys = Object.keys(obj)
  let keyLength = keys.length
  let sentence = ''
  for (let i = 1; i <= numWords / 2; i++) {
    let randomIndex = Math.floor(Math.random() * keyLength)
    let randomWord = `${keys[randomIndex]}`
    if (sentence === '') {
      sentence = `${sentence}${randomWord} ${getRandomWord(randomWord, obj)}`
    } else {
      sentence = `${sentence} ${randomWord} ${getRandomWord(randomWord, obj)}`
    }
  }
  sentence = formatSentence(sentence)
  return sentence
}

// console.log(writeLine(textArray,10));

async function generatePoem(numLines, twitterName) {
  let poem = ''
  //make obj here with generateWordPairs, but this is an async function
  let object = await generateWordPairs(twitterName)
  for (let i = 1; i <= numLines; i++) {
    let num = 2 + Math.floor(Math.random() * 6)
    poem = `${poem} ${writeLine(object, num)}`
  }
  console.log(poem)
  return poem
}

const post = twitterName => generatePoem(3, twitterName)

module.exports = post
