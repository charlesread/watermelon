'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const userUtil = require('~/util/user')

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
        })
        .catch(function (err) {
          console.error(err.message)
          reply(boom.badRequest())
        })
    }
  }
]