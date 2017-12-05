'use strict'

const config = require('~/config')
const log = require('~/lib/logger')()

const mysql = require('mysql')

let pool

function initPool() {
  if (!pool) {
    log.trace('pool does not exist')
    pool = mysql.createPool(config.db)
  }
  log.trace('pool exists')
}

module.exports = {
  query: function (sql, bindVars) {
    log.trace('db.query() called, sql: %j, bindVars: %j', sql, bindVars)
    return new Promise(function (resolve, reject) {
      initPool()
      pool.getConnection(function (err, conn) {
        if (err) {
          conn.release()
          conn = {}
          log.error('Error creating connection: %s', err.message)
          log.debug(err.stack)
          return reject(err)
        }
        conn.query(sql, bindVars || [], function (error, results, fields) {
          if (err) {
            conn.release()
            conn = {}
            log.error('Error running SQL: %s', err.message)
            log.debug(err.stack)
            return reject(err)
          }
          log.trace('Query successful')
          conn.release()
          conn = {}
          return resolve(results)
        })
      })
    })
  }
}