'use strict'

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const userUtil = require('~/util/user')
const log = require('~/lib/logger')()
const boom = require('boom')

module.exports = [
  {
    method: 'get',
    path: '/',
    handler: async function (req, h) {
      try {
        let rsvp
        let rsvpPerson
        let mealTypes
        let faqs
        const user = req.yar.get('user')
        const page = require('~/pages/slash/index.marko')
        if (user) {
          log.debug('logged in')
          log.debug('credentials: %j', req.yar.get('credentials'))
          log.debug('user: %j', user)
          rsvp = (await db.query(sql.rsvp.get.by.userId, user.id))[0]
          rsvpPerson = (await db.query(sql.rsvpPerson.get.by.userId, user.id))[0]
          mealTypes = await db.query(sql.rsvpMealType.getAll)
        } else {
          log.trace('not logged in')
        }
        faqs = await db.query(sql.faq.getAll)
        return page.stream(
          {
            user,
            rsvp,
            rsvpPerson,
            faqs,
            mealTypes
          }
        )
      } catch (err) {
        throw err
        log.error(err.message)
        log.debug(err.stack)
        return boom.internal()
      }
    }
  }
]