const joi = require('@hapi/joi')
const data = require('../../data/data.json')


module.exports = [{
  method: 'GET',
  path: '/enterWaste',
  handler: (request, h) => {
    // Extract just the wasteName from the main data file
    const wasteName = []
    data.forEach(element => {
      wasteName.push(element.fields.wasteName)
    })

    return h.view('enterWaste', {
      wasteName: wasteName
    })
  }
}, {
  method: 'POST',
  path: '/enterWaste',
  handler: (request, h) => {
    const payload = request.payload
    console.log(payload)

    const searchResults =[]
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

    console.log(searchResults.length)

    return h.view('multiWasteResults', {
      titleText: 'Select a Waste Type',
      hintText: 'Your search matched the following Waste Types. Please choose one or go back to search screen',
      itemData: searchResults
    })
  }/* ,
  options: {
    validate: {
      payload: joi.object().keys({
        email: joi.string().email().required()
      })
    }
  } */
}]
