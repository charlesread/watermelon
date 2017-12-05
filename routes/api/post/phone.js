'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const userUtil = require('~/util/user')
const sms = require('~/lib/sms')

module.exports = [
  {
    method: 'post',
    path: '/api/phone',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      const user = req.yar.get('user')
      db.query(sql.phone.insert, [req.payload.phone, user.id])
        .then(function () {
          reply()
          sms.send(req.payload.phone, `Hey, ${user.first_name}! Thanks for updating your mobile number - we\'ll be in touch!`)
            .catch(function (err) {
              console.error('error sending %s a text: %s', req.payload.phone, err.message)
            })
        })
        .catch(function (err) {
          console.error(err.message)
          reply(boom.badRequest())
        })
    }
  }
]