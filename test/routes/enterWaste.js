const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')

lab.experiment('Web test no checkbox', () => {
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
})
