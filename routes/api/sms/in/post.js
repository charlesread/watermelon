'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'post',
    path: '/api/sms/in',
    handler: function (req, reply) {
      log.trace('received request at /api/sms/in, payload: %j', req.payload)
      const body = req.payload.Body
      const bodyArray = body.split(' ')
      log.debug('body: %j', body)
      log.debug('bodyArray: %j', bodyArray)
      !async function () {
        reply()
      }()
        .catch(function (err) {
          log.error(err.message)
          log.debug(err.stack)
          reply(boom.badRequest())
        })
    }
  },
  {
    method: 'get',
    path: '/api/sms/in',
    handler: function (req, reply) {
      (async function () {
        console.log(req.payload)
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