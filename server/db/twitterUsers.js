const Sequelize = require('sequelize')
const db = require('../db')

const TwitterUser = db.define('twitter-user', {
  twitterName: {
    type: Sequelize.TEXT,
    allowNUll: false,
    ignoreDuplicates: true
  },
  searchCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = TwitterUser
