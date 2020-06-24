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
      wasteName: wasteName
    })
  },
  post: (request, h) => {
    const payload = request.payload
    const searchResults = []

    data.forEach(element => {
      // Perform a search to see if the selectedWasteName exists within the wasteName string
      if (element.fields.wasteName.toUpperCase().includes(payload.selectedWasteName.toUpperCase())) {
        // For every positive result add it to the searchResults
        searchResults.push({
          value: element.fields.wasteName,
          text: element.fields.wasteName
        })
      }
    })


    if (searchResults.length == 0) {
      return h.view('enterWaste', {
        wasteName: wasteName,
        errorMessage: 'Waste not found, please try again.'
      })
    } else if (searchResults.length == 1) {
        request.yar.set('formData', { wasteName: searchResults })
        return h.redirect('exportTo')
      } else if (searchResults.length > 1) {
          request.yar.set('formData', { searchResults: searchResults })
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