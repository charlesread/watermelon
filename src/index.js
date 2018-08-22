'use strict'

require('require-self-ref')

const config = require('~/config')
const log = require('~/lib/logger')()

const HMLS = require('hmls')

const hmlsOptions = config.hmls

const plugins = [
  {
    // plugin: require('../hapi-auth-auth0'),
    plugin: require('hapi-auth-auth0'),
    options: config.hapiAuthAuth0
  },
  {
    plugin: require('hapi-acl-auth'),
    options: config.hapiAclAuth
  }
]

const vc = new HMLS(hmlsOptions)

!async function () {
  await vc.init()
  await vc.server.register(plugins)
  vc.server.auth.strategy('auth0', 'auth0')
  await vc.start()
  if (process.send) {
    process.send('online');
  }
  log.info('server started: %s', vc.server.info.uri)
}()
  .catch((err) => {
    log.error(err.message)
    log.debug(err.stack)
  })