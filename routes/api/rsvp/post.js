'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'post',
    path: '/api/rsvp',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      let res
      const user = req.yar.get('user')
      !async function () {
        const payload = req.payload
        let rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0]
        if (rsvp) {
          res = await db.query(sql.rsvp.update, [payload.attend, user.id, rsvp.id])
        } else {
          res = await db.query(sql.rsvp.insert, [user.id, payload.attend])
        }
        let userRsvpPerson = (await db.query(sql.rsvpPerson.get.by.userId, [user.id]))[0]
        if (!userRsvpPerson && parseInt(payload.attend) === 1) {
          rsvp = (await db.query(sql.rsvp.get.by.userId, [user.id]))[0]
          await db.query(sql.rsvpPerson.insert, [rsvp.id, user.first_name, user.last_name, user.id, null, null, null])
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