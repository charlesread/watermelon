'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'post',
    path: '/api/phone',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      log.trace('/api/phone handler called')
      const user = req.yar.get('user')
      db.query(sql.phone.insert, [req.payload.phone, user.id])
        .then(function () {
          reply()
          sms.send(req.payload.phone, `Hey, ${user.first_name}! Thanks for updating your mobile number - we\'ll be in touch!`)
            .catch(function (err) {
              log.error('error sending %s a text: %s', req.payload.phone, err.message)
              log.debug(err.stack)
            })
        })
        .catch(function (err) {
          log.error(err.message)
          log.debug(err.stack)
          reply(boom.badRequest())
        })
    }
  }
]