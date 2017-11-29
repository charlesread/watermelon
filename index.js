'use strict'

const os = require('os')

const ip = require('ip')
const HMLS = require('hmls')

const hmlsOptions = {
  server: {
    host: os.hostname(),
    address: ip.address(),
    port: 8000
  }
}

const vc = new HMLS(hmlsOptions)

!async function () {
  await vc.init()
  await vc.start()
  console.log('server started: %s', vc.server.info.uri)
}()
  .catch((err) => {
    console.error(err.message)
  })