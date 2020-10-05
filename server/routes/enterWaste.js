const data = require('../../data/data.json')

// Extract just the wasteName from the main data file
const wasteCodeNameSuffix = []
data.forEach(element => {
  wasteCodeNameSuffix.push(`${element.Title} ${element.wasteName} ${element.wasteSuffix}`)
})

const handlers = {
  get: (request, h) => {
    // Check to see if the confirmation box on the home page has been checked. If not redirect to '/'
    const confirmCheckbox = request.yar.get('confirmCheckbox')
    if (!confirmCheckbox) {
      return h.redirect('/')
    } else {
      // Respond with the view
      return h.view('enterWaste', {
        wasteCodeNameSuffix: wasteCodeNameSuffix,
        textLine1: 'Search for your waste by the waste code or a key word',
        textLine2: 'For example, A1010 or plastic',
        textLine3: 'Select your waste from the drop down list, or click <strong>Continue</strong> to see a full list of matches.',
        defaultValue: ''
      })
    }
  },
  post: async (request, h) => {
    const payload = request.payload
    const wasteSearchResults = []
    const wasteDetails = []
    const countryData = request.yar.get('countryData')

    data.forEach(element => {
      // Perform a search to see if the selectedWasteName exists within the wasteName string
      if (`${element.Title} ${element.wasteName} ${element.wasteSuffix}`.toUpperCase().includes(payload.selectedWasteName.toUpperCase())) {
        // For every positive result add it to the arrays
        wasteSearchResults.push({
          value: `${element.Title} ${element.wasteName} ${element.wasteSuffix}`,
          text: `${element.Title} ${element.wasteName} ${element.wasteSuffix}`
        })
        wasteDetails.push({
          wasteCode: element.Title,
          wasteName: `${element.wasteName} ${element.wasteSuffix}`
        })
      }
    })

    if (wasteSearchResults.length === 0) {
      // Send an event to Google Analytics
      await request.ga.event({
        category: 'waste search',
        action: 'failed',
        label: payload.selectedWasteName
      })
      return h.view('enterWaste', {
        wasteCodeNameSuffix: wasteCodeNameSuffix,
        textLine1: 'Search for your waste by the waste code or a key word',
        textLine2: 'For example, A1010 or plastic',
        textLine3: 'Select your waste from the drop down list, or click <strong>Continue</strong> to see a full list of matches.',
        errorMessage: 'Waste not found! Please try again or <a href="/wasteNotFound" class="govuk-link">click here</a> for further information.',
        defaultValue: payload.selectedWasteName
      })
    } else if (wasteSearchResults.length === 1) {
      // Send an event to Google Analytics
      await request.ga.event({
        category: 'waste search',
        action: 'single result',
        label: payload.selectedWasteName
      })
      request.yar.set('wasteData', {
        wasteCodeNameSuffix: wasteSearchResults[0].value,
        wasteCode: wasteDetails[0].wasteCode,
        wasteName: wasteDetails[0].wasteName
      })
      if (countryData) {
        return h.redirect('confirm')
      } else {
        return h.redirect('exportTo')
      }
    } else if (wasteSearchResults.length > 1) {
      // Send an event to Google Analytics
      await request.ga.event({
        category: 'waste search',
        action: 'multiple results',
        label: payload.selectedWasteName
      })
      request.yar.set('wasteSearchResults', wasteSearchResults)
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
