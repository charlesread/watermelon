'use strict'

const config = require('~/config')
const log = require('~/lib/logger')()

const mysql = require('mysql')
const randomize = require('randomatic')

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
    const sqlId = randomize('Aa', 4)
    log.debug('[%s] db.query() called, sql: %j, bindVars: %j', sqlId, sql, bindVars)
    return new Promise(function (resolve, reject) {
      initPool()
      pool.getConnection(function (err, conn) {
        if (err) {
          conn = {}
          log.error('[%s] Error creating connection: %s', sqlId, err.message)
          log.debug(err.stack)
          return reject(err)
        }
        conn.query(sql, bindVars || [], function (error, results, fields) {
          if (error) {
            try {
              conn.release()
              conn = {}
            } catch (e) {
            }
            log.error('[%s] Error running SQL: %s', sqlId, error.message)
            log.debug(error.stack)
            return reject(error)
          }
          log.debug('[%s] Query successful', sqlId)
          conn.release()
          conn = {}
          return resolve(results)
        })
      })
    })
  }
}