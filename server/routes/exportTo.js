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
      countryName: countryName
    })
  },
  post: (request, h) => {
    const payload = request.payload
    return payload
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