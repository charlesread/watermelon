'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'patch',
    path: '/api/rsvpPerson',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      !async function () {
        const user = req.yar.get('user')
        const payload = req.payload
        await db.query(sql.rsvpPerson.update, [payload.mealType, payload.considerations, user.id])
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