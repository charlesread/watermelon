'use strict'

const config = require('~/config')

const mysql = require('mysql')

module.exports = {
  query: function (sql, bindVars) {
    return new Promise(function (resolve, reject) {
      let conn = mysql.createConnection(config.db)
      conn.connect(function (err) {
        if (err) {
          conn = {}
          return reject(err)
        }
        conn.query(sql, bindVars || [], function (error, results, fields) {
          if (err) {
            conn = {}
            return reject(err)
          }
          return resolve(results)
        })
      })
    })
  }
}