const trumpData = require('../realdonaldtrump.json')

/**
 * Takes a tweet type: string
 * returns type: string(tweet sentence) of words without links or non-alpha numeric character
 */
const parseText = sentence => {
  let sentenceArr = sentence.split(' ')
  let result = sentenceArr.map(word => {
    if (word.includes('@') || word.includes('/') || word.includes('&')) {
      word = ''
    } else {
      word = word.toLowerCase().replace(/[)(?!,.]/g, '')
    }
    return word
  })
  return result.filter(word => word !== '').join(' ')
}

const parsedTrumpTweets = trumpData.map(tweet => ({
  content: parseText(tweet.full_text),
  tweetDate: tweet.created_at,
  twitterName: 'realDonaldTrump'
}))

module.exports = parsedTrumpTweets
