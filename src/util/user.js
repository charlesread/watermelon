'use strict'

const db = require('~/lib/db')
const sql = require('~/lib/sql')

const util = {}

util.getUserBySub = async function (credentials) {
  return (await db.query(sql.user.get.by.sub, credentials.sub))[0]
}

util.maintainUser = function (credentials) {
  return new Promise(function (resolve, reject) {
    let user
    (async function () {
      user = await util.getUserBySub(credentials)
      if (!user) {
        await  db.query(sql.user.insert, [credentials.first_name || credentials.given_name || credentials.name || credentials.nickname, credentials.last_name || credentials.family_name, credentials.email, credentials.sub])
        user = await util.getUserBySub(credentials)
      }
      user = Object.assign({}, user)
      let roles = (await db.query(sql.role.get.by.userId, user.id)) || []
      roles = roles.map(function (role) {
        return role.role
      })
      user.roles = roles
      return resolve(user)
    })()
      .catch(reject)
  })
}

module.exports = util