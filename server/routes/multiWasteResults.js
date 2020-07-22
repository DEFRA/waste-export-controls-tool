// const joi = require('@hapi/joi')
const data = require('../../data/data.json')

const handlers = {
  get: (request, h) => {
    const wasteSearchResults = request.yar.get('wasteSearchResults')

    return h.view('multiWasteResults', {
      titleText: 'Select a Waste Type',
      hintText: 'Your search matched the following Waste Types. Please choose one or go back to search screen',
      itemData: wasteSearchResults
    })
  },
  post: (request, h) => {
    const payload = request.payload

    if (payload.selectWasteResult) {
      const wasteDetails = []

      data.forEach(element => {
        // Perform a search to see if the selectedWasteName exists within the wasteName string
        if (element.wasteCodeNameSuffix.toUpperCase().includes(payload.selectWasteResult.toUpperCase())) {
          // For every positive result add it to the wasteSearchResults
          wasteDetails.push({
            wasteCode: element.Title,
            wasteName: element.wasteName
          })
        }
      })

      request.yar.set('wasteData', {
        wasteCodeNameSuffix: payload.selectWasteResult,
        wasteCode: wasteDetails[0].wasteCode,
        wasteName: wasteDetails[0].wasteName
      })
      return h.redirect('exportTo')
    } else {
      const wasteSearchResults = request.yar.get('wasteSearchResults')

      return h.view('multiWasteResults', {
        titleText: 'Select a Waste Type',
        hintText: 'Your search matched the following Waste Types. Please choose one or go back to search screen',
        itemData: wasteSearchResults,
        errorMessage: 'Please select a waste type from the list or use the Back link to search again'
      })
    }
  }
}
module.exports = [{
  method: 'GET',
  path: '/multiWasteResults',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/multiWasteResults',
  handler: handlers.post
}]
