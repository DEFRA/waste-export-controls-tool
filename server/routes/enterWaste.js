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
    const payload = request.payload
    console.log(payload)
    return h.view('home', {
      titleText: 'OMG has it worked:',
      listItem1: 'If this is a waste type it has....',
      listItem2: payload.selectedWasteName
    })
  }/* ,
  options: {
    validate: {
      payload: joi.object().keys({
        email: joi.string().email().required()
      })
    }
  } */
}]
