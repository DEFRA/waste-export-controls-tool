// const joi = require('@hapi/joi')
const data = require('../../data/data.json')

const handlers = {
  get: (request, h) => {
    const wasteData = request.yar.get('wasteData')
    const countryData = request.yar.get('countryData')

    return h.view('confirm', {
      wasteCode: wasteData.wasteCode,
      wasteName: wasteData.wasteName,
      countryDisplayName: countryData.countryDisplayName
    })
  },
  post: (request, h) => {
    const wasteData = request.yar.get('wasteData')
    const countryData = request.yar.get('countryData')

    data.forEach(element => {
      // Perform a search to see if the selectedWasteName exists within the wasteName string
      if (element.wasteCodeNameSuffix.toUpperCase().includes(wasteData.wasteCodeNameSuffix.toUpperCase())) {
        // Add the result to yar. Expected values 1-4
        request.yar.set('outcome', {
          outcomeInt: element[countryData.countryName]
        })
      }
    })

    return h.redirect('outcome')
  }
}

module.exports = [{
  method: 'GET',
  path: '/confirm',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/confirm',
  handler: handlers.post
}]
