module.exports = [{
  method: 'GET',
  path: '/wasteNotFound',
  handler: (request, h) => {
    return h.view('wasteNotFound')
  }
}]
