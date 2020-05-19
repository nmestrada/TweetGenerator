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
router.get('/:twitterName', async (req, res, next) => {
  try {
    const response = await TwitterUser.findOne({
      where: {
        twitterName: req.params.twitterName
      }
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  console.log(req.body)
  try {
    //need to add check here to make sure that user entered a valid twitter username
    const response = await TwitterUser.create({
      twitterName: req.body.twitterName
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
