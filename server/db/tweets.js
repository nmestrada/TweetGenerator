const Sequelize = require('sequelize')
const db = require('./index')
//table of tweets, need to have sn attached to them
//but how to not repeat?
//date -time? created_at field on tweet
const Tweet = db.define('tweet', {
  twitterName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  //date saves timestamp as well, whereas DATEONLY does date, adding unique to see if it get a tweet that is a minute apart?
  tweetDate: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: true
  }
})

module.exports = Tweet
