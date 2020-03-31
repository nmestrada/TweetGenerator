const router = require('express').Router()
const axios = require('axios')
// matches GET requests to /api/tweets/
//global constants:
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + process.env.BEARER_TOKEN
}
const getReqUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?'

router.get('/', async function(req, res, next) {
  const url =
    'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realdonaldtrump&count=20&trim_user=true&tweet_mode=extended'
  try {
    const {data} = await axios({method: 'get', url, headers})
    res.json(data)
  } catch (err) {
    next(err)
  }
})
// matches POST requests to /api/tweets/
router.post('/', async function(req, res, next) {
  const username = req.body.username
  const {data} = await axios.get(getReqUrl, headers)
  //make twitter api get request
  //get response
  //add to database
})
// matches PUT requests to /api/tweets/:tweets
router.put('/:puppyId', function(req, res, next) {
  /* etc */
})
// matches DELETE requests to /api/tweets/:tweets
router.delete('/:puppyId', function(req, res, next) {
  /* etc */
})

module.exports = router
