const joi = require('@hapi/joi')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('home', {
      titleText: 'This tool will help you identify the appropriate classification code for waste which is intended for expert and the regulatory controls which apply to exports of those wastes to certain countries.',
      bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut commodo ligula, quis ornare nibh. Nunc ornare tempor pretium. Mauris feugiat viverra odio, at condimentum sapien sagittis cursus. Sed ac nisl fringilla tortor mattis sagittis. Phasellus rhoncus gravida massa id interdum. Maecenas quam velit, ornare sit amet lectus sit amet, viverra pharetra arcu. Mauris feugiat justo eu purus luctus gravida. In hac habitasse platea dictumst. Donec mollis neque ut leo elementum, id consequat ante ullamcorper. Vivamus placerat elit massa, ac vestibulum justo tempor vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam consectetur erat eget diam aliquam ultrices. Suspendisse condimentum posuere quam id pretium. Nam odio felis, blandit vel placerat ac, tempor ac lectus. Donec vitae ligula at nibh efficitur tempus. Phasellus cursus porttitor eros, quis tincidunt lorem tempus vitae.'
    })
  }
}, {
  method: 'POST',
  path: '/',
  handler: (request, h) => {
    return h.view('home', {
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
