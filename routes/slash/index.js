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
      let rsvpPerson
      let mealTypes
      let faqs
      (async function () {
        const credentials = req.yar.get('credentials')
        const page = require('~/pages/slash/index.marko')
        if (credentials) {
          log.trace('logged in, credentials: %j', credentials)
          user = await userUtil.maintainUser(credentials)
          req.yar.set('user', user)
          rsvp = (await db.query(sql.rsvp.get.by.userId, user.id))[0]
          rsvpPerson = (await db.query(sql.rsvpPerson.get.by.userId, user.id))[0]
          mealTypes = await db.query(sql.rsvpMealType.getAll)
        } else {
          log.trace('not logged in')
        }
        faqs = await  db.query(sql.faq.getAll)
        reply(page.stream(
          {
            user,
            rsvp,
            rsvpPerson,
            faqs,
            mealTypes
          }
        ))
      })()
        .catch(function (err) {
          log.error(err.message)
          log.debug(err.stack)
        })
    }
  }
]