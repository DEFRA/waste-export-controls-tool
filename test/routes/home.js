const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('POST / route redirects to enterWaste when checkbox checked', async () => {
    const options = {
      method: 'POST',
      url: '/',
      payload: {
        confirmCheckbox: true
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['content-type']).to.include('text/html')
    Code.expect(response.headers.location).to.equal('enterWaste')
  })

  lab.test('POST / route does not redirect without checkbox ticked and produces an error message', async () => {
    const options = {
      method: 'POST',
      url: '/',
      payload: {
        confirmCheckbox: false
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
    Code.expect(response.payload).to.include('Please check this box once you have read the information')
  })

})
