const joi = require('@hapi/joi')

module.exports = [{
  method: 'GET',
  path: '/noResults',
  handler: (request, h) => {
    request.yar.reset()
    return h.view('noResults')
  }
}, {
  method: 'POST',
  path: '/noResults',
  handler: (request, h) => {
    return h.view('noResults', {
      title: 'Hello',
      message: 'World'
    })
  },
  options: {
    validate: {
      payload: joi.object().keys({
        email: joi.string().email().required()
      })
    }
  }
}]
