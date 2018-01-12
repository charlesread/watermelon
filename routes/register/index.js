'use strict'

module.exports = [
  {
    method: 'get',
    path: '/register',
    config: {
      auth: 'auth0'
    },
    handler: async function (req, h) {
      return true
    }
  }
]