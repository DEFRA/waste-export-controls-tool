const routes = [].concat(
  require('../routes/home'),
  require('../routes/about'),
  require('../routes/public'),
  require('../routes/enterWaste'),
  require('../routes/multiWasteResults'),
  require('../routes/exportTo'),
  require('../routes/finalResult'),
  require('../routes/confirm')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
