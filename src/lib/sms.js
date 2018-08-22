'use strict'

let twilio = require('twilio')

const config = require('~/config')

let client = new twilio(config.twilio.accountSid, config.twilio.authToken)

module.exports = {
  send: function (to, message) {
    return client.messages.create({
      body: message,
      to: to,
      from: config.twilio.from
    })
  }
}
