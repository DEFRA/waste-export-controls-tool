module.exports = [{
  method: 'GET',
  path: '/noResults',
  handler: (request, h) => {
    return h.view('noResults')
  }
}]
