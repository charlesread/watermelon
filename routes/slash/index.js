'use strict'

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const userUtil = require('~/util/user')
const log = require('~/lib/logger')()

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
          log.trace('Logged in, credentials: %j', credentials)
          user = await userUtil.maintainUser(credentials)
          rsvp = (await db.query(sql.rsvp.get.by.userId, user.id))[0]
          req.yar.set('user', user)
        } else {
          log.trace('Not logged in')
        }
        const faqs = await  db.query(sql.faq.getAll)
        reply(page.stream(
          {
            now: new Date(),
            user,
            rsvp,
            faqs
          }
        ))
      })()
        .catch(function (err) {
          log.error(err.message)
          log.debug(err.trace)
        })
    }
  }
]