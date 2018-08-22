'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'get',
    path: '/api/rsvp/by/user/{id}',
    config: {
      auth: 'auth0'
    },
    handler: async function (req) {
      try {
        const user = req.yar.get('user')
        const rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0] || {}
        const rsvpPersons = await db.query(sql.rsvpPerson.get.by.rsvpUserId, [user.id])
        return {
          rsvp,
          rsvpPersons
        }
      } catch (err) {
        log.error(err.message)
        log.debug(err.stack)
        return boom.badRequest()
      }
    }
  },
  {
    method: 'get',
    path: '/api/rsvp/by/user/self',
    config: {
      auth: 'auth0'
    },
    handler: async function (req) {
      try {
        const user = req.yar.get('user')
        const rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0] || {}
        const rsvpPersons = await db.query(sql.rsvpPerson.get.by.rsvpUserId, [user.id])
        return {
          rsvp,
          rsvpPersons
        }
      } catch (err) {
        log.error(err.message)
        log.debug(err.stack)
        return boom.badRequest()
      }
    }
  }
]