const colData = require('../../data/col_data.json')

// Extract the country data
const countryDisplayName = []
// Set the initial text to be displayed in no JavaScript selectlist
const countryDisplayNameNoJs = [{
  value: 'XXX',
  text: ''
}]
colData.forEach(element => {
  countryDisplayName.push(element.displayName)
  countryDisplayNameNoJs.push({
    value: element.displayName,
    text: element.displayName
  })
})

const handlers = {
  get: (request, h) => {
    // Check to see if the confirmation box on the home page has been checked. If not redirect to '/'
    const confirmCheckbox = request.yar.get('confirmCheckbox')
    if(!confirmCheckbox) {
      return h.redirect('/')
    } else {   
      // Respond with the view
      return h.view('exportTo', {
        countryDisplayName: countryDisplayName.sort(),
        countryDisplayNameNoJs: countryDisplayNameNoJs.sort(),
        labelText: 'Search for the country you intend to export your waste to',
        hintText: 'For example, Belguim'
      })
    }
  },
  post: async (request, h) => {
    const payload = request.payload
    const countrySearchResults = []

    colData.forEach(element => {
      // Perform a search to see if the selectedCountry exists within the displayName string
      if (element.displayName.toUpperCase().includes(payload.selectedCountry.toUpperCase())) {
        // For every positive result add it to the countrySearchResults
        countrySearchResults.push({
          value: element.name,
          text: element.displayName
        })
      }
    })

    if (countrySearchResults.length === 0) {
      // Send an event to Google Analytics
      await request.ga.event({
        category: 'country search',
        action: 'failed',
        label: payload.selectedCountry
      })
      return h.view('exportTo', {
        countryDisplayName: countryDisplayName.sort(),
        countryDisplayNameNoJs: countryDisplayNameNoJs.sort(),
        labelText: 'Search for the country you intend to export your waste to',
        hintText: 'For example, Belguim',
        errorMessage: 'Country not found, please try again.'
      })
    } else if (countrySearchResults.length === 1) {
      // Send an event to Google Analytics
      await request.ga.event({
        category: 'country search',
        action: 'single result',
        label: payload.selectedCountry
      })
      request.yar.set('countryData', {
        countryName: countrySearchResults[0].value,
        countryDisplayName: countrySearchResults[0].text
      })
      return h.redirect('confirm')
    } else if (countrySearchResults.length > 1) {
      // Send an event to Google Analytics
      await request.ga.event({
        category: 'country search',
        action: 'multiple results',
        label: payload.selectedCountry
      })
      request.yar.set('countrySearchResults', countrySearchResults)
      return h.redirect('multiCountryResults')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/exportTo',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/exportTo',
  handler: handlers.post
}]
