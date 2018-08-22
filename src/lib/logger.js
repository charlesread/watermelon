'use strict'

const pino = require('pino')

const config = require('~/config')

let logger

module.exports = function (opts) {
  if (logger) {
    return logger
  }
  const options = opts || config.pino || {pretty: true}
  let pretty
  if (options.pretty) {
    pretty = pino.pretty()
    pretty.pipe(process.stdout)
  }
  logger = pino(options, pretty)
  return logger
}
