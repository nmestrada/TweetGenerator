const {expect} = require('chai')
const db = require('../db')
const Tweet = require('./tweets')
//const seed = require('../../seed')

describe('Tweets Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('creates an error if two tweets have the same exact time stamps', async () => {
    try {
      await Promise.all([
        Tweet.create({
          twitterName: 'dog',
          content: 'I went for a walk',
          tweetDate: 'Tue Mar 31 16:04:24 +0000 2020'
        }),
        Tweet.create({
          twitterName: 'dog',
          content: 'begged for a treat',
          tweetDate: 'Tue Mar 31 16:04:24 +0000 2020'
        })
      ])
    } catch (err) {
      expect(err.name).to.equal('SequelizeUniqueConstraintError')
    }
  })
  it('creates rows in database if two tweets are miliseconds apart', async () => {
    try {
      await Promise.all([
        Tweet.create({
          twitterName: 'dog',
          content: 'I went for a walk',
          tweetDate: 'Tue Mar 31 16:04:24 +0000 2020'
        }),
        Tweet.create({
          twitterName: 'dog',
          content: 'begged for a treat',
          tweetDate: 'Tue Mar 31 16:04:56 +0000 2020'
        })
      ])
      throw new Error('created the tweets')
    } catch (err) {
      expect(err.message).to.equal('created the tweets')
    }
  })
})
