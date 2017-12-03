'use strict'

const db = require('~/lib/db')
const sql = require('~/lib/sql')

const util = {}

util.getUserByFbId = async function (credentials) {
  return (await db.query(sql.user.get.by.fbId, credentials.id))[0]
}

util.maintainUser = function (credentials) {
  return new Promise(function (resolve, reject) {
    let user
    (async function () {
      user = await util.getUserByFbId(credentials)
      if (!user) {
        await  db.query(sql.user.insert, [credentials.first_name, credentials.last_name, credentials.email, credentials.id])
        user = await util.getUserByFbId(credentials)
      }
      return resolve(user)
    })()
      .catch(reject)
  })
}

module.exports = util