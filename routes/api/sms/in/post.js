'use strict'

const fs = require('fs')
const path = require('path')

const boom = require('boom')
const Handlebars = require('handlebars')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'post',
    path: '/api/sms/in',
    handler: function (req, reply) {
      let message
      log.trace('received request at /api/sms/in, payload: %j', req.payload)
      const body = req.payload.Body.toLowerCase()
      const bodyArray = body.split(' ')
      log.debug('body: %j', body)
      log.debug('bodyArray: %j', bodyArray)
      !async function () {
        const template = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'twiml', 'simpleResponse.xml')).toString()
        switch (bodyArray[0]) {
          case 'admin':
            switch (bodyArray[1]) {
              case 'stats':
                const res = await db.query(sql.sms.in.admin.stats.count, [bodyArray[3]])
                message = 123
                console.log(res)
                break
              default:
                message = 'oops'
                break
            }
            break
          default:
            message = 'Nice try!'
            break
        }
        const compiledTemplate = Handlebars.compile(template)({body: message})
        reply(compiledTemplate).header('Content-Type', 'application/xml')
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