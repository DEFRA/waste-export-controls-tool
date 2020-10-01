const handlers = {
  get: async (request, h) => {
    return h.view('feedback')
  },
  post: async (request, h) => {
    const payload = request.payload
    console.log(payload)

    let satisfaction = ' '
    if (payload.feedbackSatisfaction) {
      satisfaction = payload.feedbackSatisfaction
    }

    await request.ga.event({
      category: 'user feedback',
      action: satisfaction,
      label: payload.feedbackText
    })

    return h.redirect('/')
  }
}

module.exports = [{
  method: 'GET',
  path: '/feedback',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/feedback',
  handler: handlers.post
}]
