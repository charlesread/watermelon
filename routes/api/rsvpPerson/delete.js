'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'delete',
    path: '/api/rsvpPerson/{id}',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      const user = req.yar.get('user')
      !async function () {
        let rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0]
        let rsvpPerson = (await db.query(sql.rsvpPerson.get.by.id, [req.params.id]))[0]
        if (rsvpPerson.rsvp_id === rsvp.id) {
          await db.query(sql.rsvpPerson.delete, [req.params.id])
        }
        reply()
      }()
        .catch(function (err) {
          console.error(err.message)
          reply(boom.badRequest())
        })
    }
  }
]