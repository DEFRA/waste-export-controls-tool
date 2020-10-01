const routes = [].concat(
  require('../routes/home'),
  require('../routes/public'),
  require('../routes/enterWaste'),
  require('../routes/multiWasteResults'),
  require('../routes/exportTo'),
  require('../routes/multiCountryResults'),
  require('../routes/confirm'),
  require('../routes/outcome'),
  require('../routes/wasteNotFound'),
  require('../routes/feedback')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
