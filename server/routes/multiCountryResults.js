// const joi = require('@hapi/joi')

const handlers = {
  get: (request, h) => {
    const formData = request.yar.get('formData')

    return h.view('multiCountryResults', {
      titleText: 'Select a country',
      hintText: 'Your search matched the following countries. Please choose one or go back to search screen',
      itemData: formData.countrySearchResults
    })
  },
  post: (request, h) => {
    const payload = request.payload

    if (payload.selectCountryResult) {
      request.yar.set('formData', { countryName: payload.selectCountryResult })
      return h.redirect('confirm')
    } else {
      const formData = request.yar.get('formData')

      return h.view('multiCountryResults', {
        titleText: 'Select a country',
        hintText: 'Your search matched the following countries. Please choose one or go back to search screen',
        itemData: formData.countrySearchResults,
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
