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
      auth: 'auth0'
    },
    handler: async function (req) {
      try {
        const user = req.yar.get('user')
        const payload = req.payload
        await db.query(sql.rsvpPerson.update, [payload.mealType, payload.considerations, user.id])
        return true
      } catch (err) {
        log.error(err.message)
        log.debug(err.stack)
        return boom.badRequest()
      }
    }
  }
]