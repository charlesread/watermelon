'use strict'

const config = require('~/config')
const log = require('~/lib/logger')()

const mysql = require('mysql')

module.exports = {
  query: function (sql, bindVars) {
    log.trace('db.query() called, sql: %j, bindVars: %j', sql, bindVars)
    return new Promise(function (resolve, reject) {
      let conn = mysql.createConnection(config.db)
      conn.connect(function (err) {
        if (err) {
          conn = {}
          log.error('Error creating connection: %s', err.message)
          log.debug(err.stack)
          return reject(err)
        }
        conn.query(sql, bindVars || [], function (error, results, fields) {
          if (err) {
            conn = {}
            log.error('Error running SQL: %s', err.message)
            log.debug(err.stack)
            return reject(err)
          }
          log.trace('Query successful')
          return resolve(results)
        })
      })
    })
  }
}