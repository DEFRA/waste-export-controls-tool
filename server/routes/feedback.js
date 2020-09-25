const handlers = {
    get: (request, h) => { 
        // Respond with the view */
        return h.view('feedback')
    },
    post: async (request, h) => {
     return h.view('feedback')
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
  } ]
  
