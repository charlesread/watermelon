'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'post',
    path: '/api/rsvpPerson',
    config: {
      auth: 'auth0'
    },
    handler: async function (req) {
      try {
        const user = req.yar.get('user')
        const payload = req.payload
        const rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0]
        if (rsvp) {
          await db.query(sql.rsvpPerson.insert, [rsvp.id, payload.firstName, payload.lastName, null, payload.mealType, payload.considerations, payload.eventFriday, payload.eventSaturday, payload.eventSunday])
        }
        return true
      } catch (err) {
        log.error(err.message)
        log.debug(err.stack)
        return boom.badRequest()
      }
    }
  }
]