const joi = require('@hapi/joi')
const data = require('../../data/data.json')

const wasteName = []

data.forEach(element => {
  wasteName.push(element.fields.wasteName)
})

module.exports = [{
  method: 'GET',
  path: '/enterWaste',

  handler: (request, h) => {
    return h.view('enterWaste', {
      wasteName: wasteName
    })
  }
}, {
  method: 'POST',
  path: '/enterWaste',
  handler: (request, h) => {
    return h.view('home', {
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
