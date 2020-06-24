const joi = require('@hapi/joi')


module.exports = [{
  method: 'GET',
  path: '/multiWasteResults',
  handler: (request, h) => {
    const formData = request.yar.get('formData')

    return h.view('multiWasteResults', {
      titleText: 'Select a Waste Type',
      hintText: 'Your search matched the following Waste Types. Please choose one or go back to search screen',
      itemData: formData.searchResults
    })
  }
}, {
  method: 'POST',
  path: '/multiWasteResults',
  handler: (request, h) => {
    const payload = request.payload

    if (payload.selectWasteResult) {
      request.yar.set('formData', { wasteName: payload.selectWasteResult })
      return h.redirect('exportTo')
    } else {
      const formData = request.yar.get('formData')

      return h.view('multiWasteResults', {
        titleText: 'Select a Waste Type',
        hintText: 'Your search matched the following Waste Types. Please choose one or go back to search screenXXX',
        itemData: formData.searchResults,
        errorMessage: 'Please select a waste type from the list or use the Back link to search again'
      })
      }

  }
}]
