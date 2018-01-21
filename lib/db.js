'use strict'

const config = require('../config')
const log = require('~/lib/logger')()

const mysql = require('mysql')
const randomize = require('randomatic')

let pool

function initPool(sqlId) {
  if (!pool) {
    log.trace('[%s] pool does not exist', sqlId)
    pool = mysql.createPool(config.db)
  } else {
    log.trace('[%s] pool exists', sqlId)
  }
}

module.exports = {
  query: function (sql, bindVars) {
    const sqlId = randomize('Aa', 4)
    log.trace('[%s] db.query() called, sql: %j, bindVars: %j', sqlId, sql, bindVars)
    return new Promise(function (resolve, reject) {
      initPool(sqlId)
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
          log.trace('[%s] Query successful', sqlId)
          conn.release()
          conn = {}
          return resolve(results)
        })
      })
    })
  }
}