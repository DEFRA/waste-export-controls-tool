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

  lab.test('GET /enterWaste without checkbox redirects to /', async () => {
    const options = {
      method: 'GET',
      url: '/enterWaste'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['content-type']).to.include('text/html')
    Code.expect(response.headers.location).to.equal('/')
  })

  lab.test('GET /enterWaste with checkbox loads page', async () => {
    const options = {
      method: 'GET',
      url: '/enterWaste',
      payload: {
        yar: {
          confirmCheckbox: true
        }
      }
    }

    const response = await server.inject(options)
    response.request.yar.set('confirmCheckbox', true)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
    Code.expect(response.headers.location).to.equal('enterWaste')
  })

})
