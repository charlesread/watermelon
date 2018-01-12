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
    handler: async function (req) {
      log.trace('/api/phone handler called')
      try {
        const user = req.yar.get('user')
        await db.query(sql.phone.insert, [req.payload.phone, user.id])
        sms.send(req.payload.phone, `Hey, ${user.first_name}! Thanks for updating your mobile number - we\'ll be in touch!`)
          .catch(function (err) {
            log.error('error sending %s a text: %s', req.payload.phone, err.message)
            log.debug(err.stack)
          })
        return true
      } catch (err) {
        log.error(err.message)
        log.debug(err.stack)
        return boom.badRequest(err.message)
      }
    }
  }
]