const data = require('../../data/data.json')

// Extract just the wasteName from the main data file
const wasteName = []
data.forEach(element => {
  wasteName.push(element.fields.wasteName)
})

const handlers = {
  get: (request, h) => {
    // Respond with the view
    return h.view('enterWaste', {
      wasteName: wasteName,
      textLine1: 'Search for your waste by the waste code or a key word',
      textLine2: 'For example, type in:  A1010 or plastic',
      textLine3: 'Select your waste from the drop down list, or click “Continue” to see a full list of matches.'
    })
  },
  post: (request, h) => {
    const payload = request.payload
    const wasteSearchResults = []
    const wasteDetails = []

    data.forEach(element => {
      // Perform a search to see if the selectedWasteName exists within the wasteName string
      if (element.fields.wasteName.toUpperCase().includes(payload.selectedWasteName.toUpperCase())) {
        // For every positive result add it to the wasteSearchResults
        wasteSearchResults.push({
          value: element.fields.wasteName,
          text: element.fields.wasteName
        })
        wasteDetails.push({
          wasteCode: element.fields.Title,
          wasteName1: element.fields.Name1
        })
      }
    })

    if (wasteSearchResults.length === 0) {
      return h.view('enterWaste', {
        wasteName: wasteName,
        textLine1: 'Search for your waste by the waste code or a key word',
        textLine2: 'For example, type in: A1010 or plastic',
        textLine3: 'Select your waste from the drop down list, or click “Continue” to see a full list of matches.',
        errorMessage: 'Waste not found, please try again.'
      })
    } else if (wasteSearchResults.length === 1) {
      request.yar.set('wasteData', {
        wasteName: wasteSearchResults[0].value,
        wasteCode: wasteDetails[0].wasteCode,
        wasteName1: wasteDetails[0].wasteName1
      })
      return h.redirect('exportTo')
    } else if (wasteSearchResults.length > 1) {
      request.yar.set('wasteData', { wasteSearchResults: wasteSearchResults })
      return h.redirect('multiWasteResults')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/enterWaste',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/enterWaste',
  handler: handlers.post
}]
