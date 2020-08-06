const analyticsId = []

// Set a different analytics ID if in development
if (process.env.NODE_ENV !== 'development') {
  analyticsId.push({
    id: 'UA-173909743-1',
    hitTypes: ['pageview', 'event']
  })
}

module.exports = {
  plugin: require('@defra/hapi-gapi'),
  options: {
    propertySettings: analyticsId,
    sessionIdProducer: async request => {
      // Would normally use the request object rather than "return 'test-session'" to retrieve the proper session identifier
      return request.yar.id
    },
    batchSize: 20,
    batchInterval: 15000
  }
}
