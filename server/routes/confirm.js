const joi = require('@hapi/joi')

const handlers = {
get: (request, h) => {
    return h.view('confirm', {    
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