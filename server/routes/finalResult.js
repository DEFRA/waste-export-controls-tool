const joi = require('@hapi/joi')

module.exports = [{
  method: 'GET',
  path: '/finalResult',
  handler: (request, h) => {
    return h.view('finalResult', {
      titleText: 'Use this service to:',
      listItem1: 'check what types of waste can be exported to which countries',
      listItem2: 'what conditions apply to these exports'
    })
  }
}, {
  method: 'POST',
  path: '/finalResult',
  handler: (request, h) => {
    return h.view('finalResult', {
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
