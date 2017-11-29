'use strict'

const os = require('os')

const HMLS = require('hmls')

const hmlsOptions = {
  server: {
    host: os.hostname()
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