'use strict'

require('require-self-ref')

const config = require('~/config')

const HMLS = require('hmls')

const hmlsOptions = config.hmls

const plugins = [
  {
    // register: require('hapi-auth-fb'),
    register: require('../hapi-auth-fb'),
    options: config.hapiAuthFb
  }
]

const vc = new HMLS(hmlsOptions)

!async function () {
  await vc.init()
  await vc.server.register(plugins)
  vc.server.auth.strategy('facebook', 'facebook')
  await vc.start()
  console.log('server started: %s', vc.server.info.uri)
}()
  .catch((err) => {
    console.error(err.message)
  })