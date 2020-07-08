//const joi = require('@hapi/joi')
const data = require('../../data/data.json')


const handlers = {
  get: (request, h) => {
    const searchData = request.yar.get('searchData')
    const countryData = request.yar.get('countryData')

    return h.view('confirm', {
      wasteCode: searchData.wasteCode,
      wasteName: searchData.wasteName1,
      countryDisplayName: countryData.countryDisplayName
      })
    },
  post: (request, h) => {
    const wasteSearchData = request.yar.get('searchData')
    const countryData = request.yar.get('countryData')

    data.forEach(element => {
      // Perform a search to see if the selectedWasteName exists within the wasteName string
      if (element.fields.wasteName.toUpperCase().includes(wasteSearchData.wasteName.toUpperCase())) {
        // For every positive result add it to the wasteSearchResults
        const outcome = element.fields[countryData.countryName]
        console.log(outcome)
      }
    })

    return h.redirect('outcome')
    }
  }
  
 module.exports = [{
    method: 'GET',
    path: '/confirm',
    handler: handlers.get
  }, {
    method: 'POST',
    path: '/confirm',
    handler: handlers.post
  }]