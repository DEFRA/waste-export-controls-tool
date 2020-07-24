const joi = require('@hapi/joi')

const handlers = {
  get: (request, h) => {
    request.yar.reset()
    return h.view('home')
  },
  post: (request, h) => {
    const payload = request.payload
    console.log(`...and the value is....${payload.confirmCheckbox}`)
    request.yar.set('confirmCheckbox', payload.confirmCheckbox)
    return h.redirect('enterWaste')
  }
}


module.exports = [{
  method: 'GET',
  path: '/',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/',
  handler: handlers.post
}]
