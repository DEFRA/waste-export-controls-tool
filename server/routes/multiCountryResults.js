// const joi = require('@hapi/joi')
const colData = require('../../data/col_data.json')


const handlers = {
  get: (request, h) => {
    const countryData = request.yar.get('countryData')

    return h.view('multiCountryResults', {
      titleText: 'Select a country',
      hintText: 'Your search matched the following countries. Please choose one or go back to search screen',
      itemData: countryData.countrySearchResults
    })
  },
  post: (request, h) => {
    const payload = request.payload

    if (payload.selectCountryResult) {
      colData.forEach(element => {
        // Perform a search to find the selected country within the column data so we can find the user friendly name
        if (element.name.toUpperCase().includes(payload.selectCountryResult.toUpperCase())) {
          // For every positive save the columns display name
          request.yar.set('countryData', {
            countryName: payload.selectCountryResult,
            countryDisplayName: element.displayName
          })
        }
      })
      return h.redirect('confirm')
    } else {

      return h.view('multiCountryResults', {
        titleText: 'Select a country',
        hintText: 'Your search matched the following countries. Please choose one or go back to search screen',
        itemData: countryData.countrySearchResults,
        errorMessage: 'Please select a country from the list or use the Back link to search again'
      })
    }
  }
}
module.exports = [{
  method: 'GET',
  path: '/multiCountryResults',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/multiCountryResults',
  handler: handlers.post
}]
