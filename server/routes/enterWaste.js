const joi = require('@hapi/joi')
const data = require('../../data/data.json')

// Extract just the wasteName from the main data file
const wasteName = []
data.forEach(element => {
  wasteName.push(element.fields.wasteName)
})



module.exports = [{
  method: 'GET',
  path: '/enterWaste',
  handler: (request, h) => {
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
      if (element.fields.wasteName.toUpperCase().includes(payload.selectedWasteName.toUpperCase())) {
        searchResults.push({
          value: element.fields.wasteName,
          text: element.fields.wasteName
        })
      }
    })

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
