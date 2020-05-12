const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new Sequelize(dbUrl, {logging: false})

async function testConnection(connection) {
  try {
    console.log('before sync')
    await connection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
testConnection(client)

module.exports = client

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => client.close())
}
