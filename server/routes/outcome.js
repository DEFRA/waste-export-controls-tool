// const joi = require('@hapi/joi')

const handlers = {
  get: (request, h) => {
    const wasteData = request.yar.get('wasteData')
    const countryData = request.yar.get('countryData')
    const outcome = request.yar.get('outcome')

    console.log(outcome.outcomeInt)

    return h.view('outcome', {
      panelColor: '#00703c',
      panelTitle: 'Export is controlled',
      panelText: `The export of ${wasteData.wasteCode} - ${wasteData.wasteName1} to ${countryData.countryDisplayName} is controlled`
    })
  },
  post: (request, h) => {
    return h.view('outcome', {
      title: 'Hello',
      message: 'World'
    })
  }
}

module.exports = [{
  method: 'GET',
  path: '/outcome',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/outcome',
  handler: handlers.post
}]
