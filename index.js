const createServer = require('./server')

createServer()
  .then(server => server.start())
  .catch(err => {
    console.log(err)
    process.exit(1)
  })

// Ensure server.stop is called on interrupts so that buffered hits are sent to the Google Measurement Protocol API before shutdown
const shutdown = async (code = 0) => {
  await server.stop()
  process.exit(code)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
