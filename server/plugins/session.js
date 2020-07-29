const generator = require('generate-password')

const password = generator.generate({
  length: 40,
  numbers: true
})

module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    cookieOptions: {
      password: password,
      isSecure: process.env.NODE_ENV !== 'development'
    },
    maxCookieSize: 1024
  }
}
