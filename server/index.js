const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const db = require('./db.js')
const PORT = process.env.PORT || 1337

/**
 * node vs. nodemon
 * nodemon doesn't make you restart node when you change your server code
 */

if (process.env.NODE_ENV === 'development') {
  require('../secrets') // this will mutate the process.env object with your secrets.
}

app.use(morgan('dev'))

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Any routes or other various middlewares should go here!
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', require('./api'))
//app.use('/auth', require('./auth'))
// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)

//User deserialization / serialization
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end()
  } else {
    next()
  }
})

app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

const port = PORT //3000 for heroku
app.listen(port, err => {
  if (err) throw err
  console.log('\nHTTP server patiently listening on port', port)
  db
    .sync()
    .then(() => {
      console.log(
        '\nOh and btw the postgres server is totally connected, too\n'
      )
    })
    .catch(error => console.log(error.message))
})

app.use(function(err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
