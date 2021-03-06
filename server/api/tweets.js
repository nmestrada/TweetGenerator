const router = require('express').Router()
const axios = require('axios')
const {Tweet, TwitterUser} = require('../db/index')

// matches GET requests to /api/tweets/
//global constants:
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + process.env.BEARER_TOKEN
}
const getReqUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?'

router.get('/', async function(req, res, next) {
  try {
    //going to have this set for realDonaldTrump
    const response = await Tweet.findAll()
    //const response = { 'hello': 'hello!'}
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:twitterName', async function(req, res, next) {
  try {
    const response = await Tweet.findAll({
      where: {
        twitterName: req.params.twitterName
      }
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

// matches POST requests to /api/tweets/
router.post('/', async function(req, res, next) {
  const username = req.body.username
  try {
    //get req twitter api
    const {data} = await axios({
      method: 'get',
      url: `${getReqUrl}screen_name=${username}&count=10trim_user=true&tweet_mode=extended`,
      headers
    })
    //console.log('after post request', data)
    const rows = await Promise.all(
      data.map(tweet =>
        Tweet.create({
          twitterName: tweet.user.screen_name,
          content: tweet.full_text,
          tweetDate: tweet.created_at
        })
      )
    )
    console.log(`${rows.length} created`)
    //also going to make a twitter user rows with association, need to check if there was a proper response from twitter
    if (rows.length) {
      const twitterUser = await TwitterUser.findOrCreate({
        where: {twitterName: username}
      })
      console.log('in post request', twitterUser[0])
      await Promise.all(rows.map(row => row.setTwitterUser(twitterUser[0])))
    } else {
      console.log('data', data)
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
  //make twitter api get request
  //get response
  //add to database
})

module.exports = router
