// const joi = require('@hapi/joi')

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
      request.yar.set('countryData', { countryName: payload.selectCountryResult })
      return h.redirect('confirm')
    } else {
      const countryData = request.yar.get('countryData')

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
