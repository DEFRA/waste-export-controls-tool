module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    cookieOptions: {
      password: 'somePassword45656756u5thrs5w4aerhw45ujtmfth4wyh34uikr65rteyq35ygetjkr765etu3w45ht',
      isSecure: process.env.NODE_ENV !== 'development'
    },
    maxCookieSize: 1024
  }
}
