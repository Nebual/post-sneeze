const { Pool } = require('pg')

const pool = new Pool(require('./secrets.json').AUTH_PG)

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}