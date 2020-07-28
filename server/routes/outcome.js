// const joi = require('@hapi/joi')

const handlers = {
  get: (request, h) => {
    const wasteData = request.yar.get('wasteData')
    const countryData = request.yar.get('countryData')
    const outcomeInt = request.yar.get('outcomeInt')

    function generateOutcomeData () {
      if (outcomeInt === 1) {
        return {
          panelColor: '#FF0000', // Red
          panelTitle: 'Export is prohibited',
          panelText: 'You are not allowed to export your waste to the country you selected under the Waste Shipments Regulation.',
          warningList: '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>This country’s regulatory authority has advised that they will not accept exports of this waste type.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>This means that you cannot export your waste to this country, even if you have a letter or contract with the site or reprocessor in that country.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>If you do export your waste to this country you will be breaking the law.</td></tr>'

        }
      } else if (outcomeInt === 2) {
        return {
          panelColor: '#00703c', // Green
          panelTitle: 'Notification controls',
          panelText: 'You must export your waste to the country you selected under notification controls.',
          warningList: '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You can export your waste to this country but you must comply with the Notification controls.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must apply to the <strong>competent authority</strong> of the country from where you will export the waste by completing a notification application and paying the correct fees.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must also have a <strong>financial guarantee, a contract</strong> with the business recovering your waste, <strong>insurance</strong> against liability for third parties, and <strong>permission</strong> from the competent authorities of dispatch, destination and transit.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must check with the <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#waste-shipment-controls" class="govuk-link">competent authorities</a> if there are any <strong>local controls</strong> that apply in any country involved in the journey of your waste (called ’transit’ and ’destination’ countries).</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>Check the <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#apply-for-import-or-export-notification-controls" class="govuk-link">notification procedure</a> and <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#notification-controls-how-to-comply" class="govuk-link">how to comply with your notification</a> on the waste import and export webpage.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>If you do not comply with all the notification control requirements you will be breaking the law.</td></tr>'
        }
      } else if (outcomeInt === 3) {
        return {
          panelColor: '#00703c', // Green
          panelTitle: 'Article 18 controls',
          panelText: 'You can export your waste to the country you selected under Article 18 controls, also known as ’green list’ controls.',
          warningList: '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You can export your waste to this country but you must comply with the Article 18 (Green List) controls.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must complete and sign an Annex VII form and it must travel with the waste at all times.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must check with the <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#waste-shipment-controls" class="govuk-link">competent authorities</a> if there are any <strong>local controls</strong> that apply in any country involved in the journey of your waste (called ’transit’ and ’destination’ countries).</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>Check how to ship ‘Green List’ waste under <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#import-or-export-article-18-controls" class="govuk-link">Article 18 controls</a> on the waste import and export webpages.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>If you do not comply with all the Article 18 control requirements you will be breaking the law.</td></tr>'
        }
      } else if (outcomeInt === 4) {
        return {
          panelColor: '#E68E00', // Amber
          panelTitle: 'More information is needed',
          panelText: 'We need more detailed information so we can advise you on the controls that apply to the export of your waste to the country you selected.',
          warningList: '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>More detailed information is needed to determine the controls that apply to this export.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>For exports from England, please email the International Waste Shipments Team at <a href="mailto:askshipments@environment-agency.gov.uk" class="govuk-link">askshipments@environment-agency.gov.uk</a>.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>If you export your waste under the wrong controls you will be breaking the law.</td></tr>'
        }
      }
    }
    // Get the data for the view based on the outcome result
    const { panelColor, panelTitle, panelText, warningList } = generateOutcomeData()

    // Send an event to Google Analytics
    request.ga.event({
      category: 'outcome',
      action: panelTitle
    })
    return h.view('outcome', {
      panelColor: panelColor,
      panelTitle: panelTitle,
      panelText: panelText,
      wasteCode: wasteData.wasteCode,
      wasteName: wasteData.wasteName,
      countryName: countryData.countryDisplayName,
      warningList: warningList
    })
  },
  post: (request, h) => {
    request.yar.reset()
    return h.redirect('enterWaste')
  }
}

module.exports = [{
  method: 'GET',
  path: '/outcome',
  handler: handlers.get
}, {
  method: 'POST',
  path: '/outcome',
  handler: handlers.post
}]
