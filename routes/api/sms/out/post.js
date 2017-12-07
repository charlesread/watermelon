'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')

module.exports = [
  {
    method: 'post',
    path: '/api/sms/out/self',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      (async function () {
        const user = req.yar.get('user')
        const userRecord = (await db.query(sql.user.get.by.id, [user.id]))[0]
        if (userRecord.phone) {
          await sms.send(userRecord.phone, req.payload.message)
        }
        reply()
      })()
        .catch(function (err) {
          log.error(err.message)
          log.debug(err.stack)
          reply(boom.badRequest())
        })
    }
  }
]