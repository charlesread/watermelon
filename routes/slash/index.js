'use strict'

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const userUtil = require('~/util/user')

module.exports = [
  {
    method: 'get',
    path: '/',
    handler: function (req, reply) {
      let user
      let rsvp
      (async function () {
        const credentials = req.yar.get('credentials')
        const page = require('~/pages/slash/index.marko')
        if (credentials) {
          console.log('logged in, credentials: %j', credentials)
          user = await userUtil.maintainUser(credentials)
          rsvp = (await db.query(sql.rsvp.get.by.userId, user.id))[0]
          req.yar.set('user', user)
        } else {
          console.log('not logged in')
        }
        reply(page.stream(
          {
            now: new Date(),
            user,
            rsvp
          }
        ))
      })()
        .catch(function (err) {
          console.log(err.stack)
        })
    }
  }
]