const Tweet = require('./tweets')
const TwitterUser = require('./twitterUsers')
const GeneratedTweet = require('./generatedTweets')
const User = require('./users')

/**
 * assosciations
 */

TwitterUser.hasMany(Tweet)
Tweet.belongsTo(TwitterUser)

TwitterUser.hasMany(GeneratedTweet)
GeneratedTweet.belongsTo(TwitterUser)

module.exports = {
  User,
  TwitterUser,
  GeneratedTweet,
  Tweet
}
