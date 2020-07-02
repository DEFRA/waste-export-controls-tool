const colData = require('../../data/col_data.json')

// Extract just the wasteName from the main data file
const countryName = []
colData.forEach(element => {
  countryName.push(element.displayName)
})

const handlers = {
  get: (request, h) => {
    // Respond with the view
    return h.view('exportTo', {
      countryName: countryName,
      labelText: 'Search for your intended destination country',
      hintText: 'For example, type in: Belguim'
    })
  },
  post: (request, h) => {
    const payload = request.payload
    const countrySearchResults = []

    colData.forEach(element => {
      // Perform a search to see if the selectedCountry exists within the displayName string
      if (element.displayName.toUpperCase().includes(payload.selectedCountry.toUpperCase())) {
        // For every positive result add it to the countrySearchResults
        countrySearchResults.push({
          value: element.displayName,
          text: element.displayName
        })
      }
    })

    if (countrySearchResults.length === 0) {
      return h.view('exportTo', {
        countryName: countryName,
        labelText: 'Search for your intended destination country',
        hintText: 'For example, type in: Belguim',
        errorMessage: 'Country not found, please try again.'
      })
    } else if (countrySearchResults.length === 1) {
        request.yar.set('countryData', { countryName: countrySearchResults[0].value })
        return h.redirect('confirm')
    } else if (countrySearchResults.length > 1) {
        request.yar.set('countryData', { countrySearchResults: countrySearchResults })
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
