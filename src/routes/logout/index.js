'use strict'

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const userUtil = require('~/util/user')
const log = require('~/lib/logger')()
const boom = require('boom')

module.exports = [
  {
    method: 'get',
    path: '/logout',
    handler: async function (req, h) {
      try {
        req.yar.clear('user')
        req.yar.clear('credentials')
        req.yar.reset()
        return h.redirect('/')
      } catch (err) {
        log.error(err.message)
        log.debug(err.stack)
        return boom.internal()
      }
    }
  }
]