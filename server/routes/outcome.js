// const joi = require('@hapi/joi')

const handlers = {
  get: (request, h) => {
    const wasteData = request.yar.get('wasteData')
    const countryData = request.yar.get('countryData')
    const outcome = request.yar.get('outcome')

    console.log(outcome.outcomeInt)
    function generateOutcomeData() {
    if (outcome.outcomeInt === 1) {
      return {
        panelColor: '#FF0000', // Red
        panelTitle: 'Export is prohibited',
        panelText: 'The export of your waste to the selected country is not allowed by the Waste Shipments Regulation.'
      }
    } else if (outcome.outcomeInt === 2) {
      return {
        panelColor: '#00703c', // Green
        panelTitle: 'Notification Controls',
        panelText: 'The export of your waste to the selected country is subject to the most stringent controls called Notification Controls.'
      }
    } else if (outcome.outcomeInt === 3) {
      return {
        panelColor: '#00703c', // Green
        panelTitle: 'Article 18 Controls',
        panelText: 'The export of your waste to the selected country is subject to Article 18 controls, also known as Green List controls.'
      }
    } else if (outcome.outcomeInt === 4) {
      return {
        panelColor: '#FF9E00', // Amber
        panelTitle: 'More information is needed',
        panelText: 'More detailed information is needed to advise you on the controls that apply to the export of your waste to the selected country.'
      }
    }
  }
    // Get the data for the view based on the outcome result
    const { panelColor, panelTitle, panelText } = generateOutcomeData()

    return h.view('outcome', {
      panelColor: panelColor,
      panelTitle: panelTitle,
      panelText: panelText,
      wasteCode: wasteData.wasteCode,
      wasteName: wasteData.wasteName1,
      countryName: countryData.countryDisplayName
    })
  }
}

module.exports = [{
  method: 'GET',
  path: '/outcome',
  handler: handlers.get
}]
