'use strict'
const router = require('express').Router()

//mounting routes
router.use('/tweets', require('./tweets'))
router.use('/twitterUsers', require('./twitterUsers'))

//routes 404 handler
router.use(function(req, res, next) {
  const err = new Error('Not found.')
  err.status = 404
  next(err)
})

module.exports = router
