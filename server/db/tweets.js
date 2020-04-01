const Sequelize = require('sequelize')
const db = require('./index')
//table of tweets, need to have sn attached to them
//need to create a validation that depends on another field
//different twitter users can have same tweetdates, but not the same user

const Tweet = db.define(
  'tweet',
  {
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
      allowNull: false
    }
  },
  //unique constraint on multple columns need to add test
  {
    indexes: [
      {
        unique: true,
        fields: ['tweetDate', 'twitterName']
      }
    ]
  }
)

module.exports = Tweet
