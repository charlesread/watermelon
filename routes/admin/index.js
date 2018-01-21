'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const log = require('~/lib/logger')()

module.exports = [
  {
    method: 'get',
    path: '/admin',
    config: {
      auth: 'auth0',
      plugins: {
        hapiAclAuth: {
          roles: ['admin'],
          secure: true
        }
      }
    },
    handler: async function (req) {
      const user = req.yar.get('user')
      return user
    }
  }
]