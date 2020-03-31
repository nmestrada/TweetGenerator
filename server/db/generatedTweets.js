const Sequelize = require('sequelize')
const db = require('./index')

const GeneratedTweet = db.define('generated-tweet', {
  content: {
    type: Sequelize.TEXT,
    allowNUll: false
  },
  twitterName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = GeneratedTweet
