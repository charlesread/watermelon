'use strict'

const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')
const sms = require('~/lib/sms')

module.exports = [
  {
    method: 'get',
    path: '/api/place',
    handler: function (req, reply) {
      (async function () {
        const places = []
        const results = await db.query(sql.place.getAll)
        for (let i = 0; i < results.length; i++) {
          places.push({
            id: results[i].id,
            name: results[i].name,
            info: '<strong>' + results[i].name + '</strong><br>' + results[i].address1 + '<br>' + results[i].address2 + (results[i].note ? '<br><br>' + results[i].note : ''),
            address1: results[i].address1,
            address2: results[i].address2,
            lat: results[i].lat,
            long: results[i].long,
            note: results[i].note
          })
        }
        reply({places})
      })()
        .catch(function (err) {
          console.error(err.message)
          reply(boom.badRequest())
        })
    }
  }
]