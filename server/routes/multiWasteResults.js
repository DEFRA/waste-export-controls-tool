const joi = require('@hapi/joi')

const itemData = [
  {
    value: 'antimony',
    text: 'Antimony'
  },
  {
    value: 'arsenic',
    text: 'Arsenic'
  },
  {
    value: 'lead',
    text: 'Lead'
  },
  {
    value: 'mercury',
    text: 'Mercury'
  },
  {
    value: 'selenium',
    text: 'Selenium'
  }
]

module.exports = [{
  method: 'GET',
  path: '/multiWasteResults',
  handler: (request, h) => {
    return h.view('multiWasteResults', {
      titleText: 'Select a Waste Type',
      hintText: 'Your search matched the following Waste Types. Please choose one or go back to search screen',
      itemData: itemData
    })
  }
}, {
  method: 'POST',
  path: '/multiWasteResults',
  handler: (request, h) => {
    return h.view('multiWasteResults', {
      title: 'Hello',
      message: 'World'
    })
  },
  options: {
    validate: {
      payload: joi.object().keys({
        email: joi.string().email().required()
      })
    }
  }
}]
