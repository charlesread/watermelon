'use strict'

module.exports = [
  {
    method: 'get',
    path: '/register',
    config: {
      auth: 'facebook'
    },
    handler: function (req, reply) {
      reply()
    }
  }
]