const joi = require('@hapi/joi')

const handlers = {
  get: (request, h) => {
    const searchData = request.yar.get('searchData')
    const countryData = request.yar.get('countryData')

    return h.view('confirm', {
      wasteCode: searchData.wasteCode,
      wasteName: searchData.wasteName1,
      countryName: countryData.countryName
      })
    },
  post: (request, h) => {
      return h.view('confirm', {
      })
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