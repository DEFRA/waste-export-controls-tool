const handlers = {
  get: (request, h) => {
    request.yar.reset()
    return h.view('home')
  },
  post: (request, h) => {
    const payload = request.payload
    if (payload.confirmCheckbox) {
      request.yar.set('confirmCheckbox', payload.confirmCheckbox)
      return h.redirect('enterWaste')
    } else {
      return h.view('home', {
        errorMessage: 'Please check this box once you have read the information'
      })
    }
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
