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
      auth: 'facebook'
    },
    handler: function (req, reply) {
      !async function () {
        const user = req.yar.get('user')
        const payload = req.payload
        const rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0]
        if (rsvp) {
          await db.query(sql.rsvpPerson.insert, [rsvp.id, payload.firstName, payload.lastName, null, payload.mealType, payload.kiddo, payload.considerations])
        }
        reply()
      }()
        .catch(function (err) {
          log.error(err.message)
          log.debug(err.stack)
          reply(boom.badRequest())
        })
    }
  }
]