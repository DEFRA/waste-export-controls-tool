const handlers = {
  get: (request, h) => {
    // Check the checkbox if it has been set previously
    let checkboxChecked = false
    if (request.yar.get('confirmCheckbox')) {
      checkboxChecked = true
    }

    return h.view('home', {
      checkboxChecked: checkboxChecked
    })
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
