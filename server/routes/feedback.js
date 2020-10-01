const handlers = {
  get: async (request, h) => {
    // Send an event to Google Analytics
    // await request.ga.event({
    //   category: 'feedback',
    //   action: "result"
    // })
    
    // Respond with the view */
    return h.view('feedback')    


  },
  post: async (request, h) => {
    const payload = request.payload
    console.log(payload)
     // Send an event to Google Analytics
    //  await request.ga.event({
    //    category: 'feedback',
    //    action: 'result'
    //  })

    return h.view('feedback', {

      titleText: "Tell us what you think about this service"

    
    })
  },
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
