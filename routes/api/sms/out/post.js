'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'post',
    path: '/api/sms/out/self',
    config: {
      auth: 'auth0'
    },
    handler: async function (req) {
      try {
        const user = req.yar.get('user')
        const userRecord = (await db.query(sql.user.get.by.id, [user.id]))[0]
        if (userRecord.phone) {
          await sms.send(userRecord.phone, req.payload.message)
        }
        return true
      } catch (err) {
        log.error(err.message)
        log.debug(err.stack)
        return boom.badRequest(err.message)
      }
    }
  }
]