const data = require('../../data/data.json')

// Extract just the wasteName from the main data file
const wasteCodeNameSuffix = []
data.forEach(element => {
  wasteCodeNameSuffix.push(element.wasteCodeNameSuffix)
})

const handlers = {
  get: (request, h) => {
    // Respond with the view
    return h.view('enterWaste', {
      wasteCodeNameSuffix: wasteCodeNameSuffix,
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
      if (element.wasteCodeNameSuffix.toUpperCase().includes(payload.selectedWasteName.toUpperCase())) {
        // For every positive result add it to the wasteSearchResults
        wasteSearchResults.push({
          value: element.wasteCodeNameSuffix,
          text: element.wasteCodeNameSuffix
        })
        wasteDetails.push({
          wasteCode: element.Title,
          wasteName: element.wasteName
        })
      }
    })

    if (wasteSearchResults.length === 0) {
      return h.view('enterWaste', {
        wasteCodeNameSuffix: wasteCodeNameSuffix,
        textLine1: 'Search for your waste by the waste code or a key word',
        textLine2: 'For example, type in: A1010 or plastic',
        textLine3: 'Select your waste from the drop down list, or click “Continue” to see a full list of matches.',
        errorMessage: 'Waste not found, please try again.'
      })
    } else if (wasteSearchResults.length === 1) {
      request.yar.set('wasteData', {
        wasteCodeNameSuffix: wasteSearchResults[0].value,
        wasteCode: wasteDetails[0].wasteCode,
        wasteName: wasteDetails[0].wasteName
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
