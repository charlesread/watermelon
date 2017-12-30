'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')

module.exports = [
  {
    method: 'get',
    path: '/api/rsvp/by/user/{id}',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      const user = req.yar.get('user')
      !async function () {
        const rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0] || {}
        const rsvpPersons = await db.query(sql.rsvpPerson.get.by.rsvpUserId, [user.id])
        reply({
          rsvp,
          rsvpPersons
        })
      }()
        .catch(function (err) {
          console.error(err.message)
          reply(boom.badRequest())
        })
    }
  },
  {
    method: 'get',
    path: '/api/rsvp/by/user/self',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      const user = req.yar.get('user')
      !async function () {
        const rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0] || {}
        const rsvpPersons = await db.query(sql.rsvpPerson.get.by.rsvpUserId, [user.id])
        reply({
          rsvp,
          rsvpPersons
        })
      }()
        .catch(function (err) {
          console.error(err.message)
          reply(boom.badRequest())
        })
    }
  }
]