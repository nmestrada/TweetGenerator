const router = require('express').Router()
//const axios = require('axios')
const {TwitterUser} = require('../db/index')

//api/twitterUsers

router.get('/', async (req, res, next) => {
  try {
    //going to have this set for realDonaldTrump
    const response = await TwitterUser.findAll()
    //const response = { 'hello': 'hello!'}
    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
