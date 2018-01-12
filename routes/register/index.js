'use strict'

module.exports = [
  {
    method: 'get',
    path: '/register',
    config: {
      auth: 'facebook'
    },
    handler: async function (req, h) {
      return true
    }
  }
]