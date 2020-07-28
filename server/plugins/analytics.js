module.exports = {
    plugin: require('@defra/hapi-gapi'),
    options: {
      propertySettings: [
        {
          id: 'UA-XXXXXX-XX',
          hitTypes: ['pageview', 'event', 'ecommerce']
        },
        {
          id: 'UA-YYYYYY-YY',
          hitTypes: ['pageview']
        }
      ],
      sessionIdProducer: async request => {
        // Would normally use the request object to retrieve the proper session identifier
        return 'test-session'
      },
      attributionProducer: async request => {
        // Would normally use the request object to return any attribution associated with the user's session
        return {
          campaign: 'attribution_campaign',
          source: 'attribution_source',
          medium: 'attribution_medium',
          content: 'attribution_content',
          term: 'attribution_term'
        }
      },
      batchSize: 20,
      batchInterval: 15000
    }
}
