// const joi = require('@hapi/joi')

const handlers = {
  get: (request, h) => {
    const wasteData = request.yar.get('wasteData')
    const countryData = request.yar.get('countryData')
    const outcome = request.yar.get('outcome')

    console.log(outcome.outcomeInt)
    function generateOutcomeData () {
      if (outcome.outcomeInt === 1) {
        return {
          panelColor: '#FF0000', // Red
          panelTitle: 'Export is prohibited',
          panelText: 'The export of your waste to the selected country is not allowed by the Waste Shipments Regulation.',
          warningList: '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>This country’s regulatory authority has advised that they will not accept exports of this waste type.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>This means that you cannot export your waste to this country, even if you have a letter or contract with the site or reprocessor in that country.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>If you do export your waste to this country you will be breaking the law.</td></tr>'

        }
      } else if (outcome.outcomeInt === 2) {
        return {
          panelColor: '#00703c', // Green
          panelTitle: 'Notification Controls',
          panelText: 'The export of your waste to the selected country is subject to the most stringent controls called Notification Controls.',
          warningList: '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You can export your waste to this country but you must comply with the Notification controls.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must apply to the competent authority of the country from where the waste will be exported by completing a notification application and paying the correct fees.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must also have a financial guarantee, a contract with the business recovering your waste, insurance against liability for third parties, and permission from the competent authorities in all countries concerned.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>Full information on the <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#apply-for-import-or-export-notification-controls" class="govuk-link">notification procedure</a> and <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#notification-controls-how-to-comply" class="govuk-link">how to comply with your notification</a> are available on the waste import and export webpages.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>If you do not comply with all the Notification control requirements you will be breaking the law.</td></tr>'
        }
      } else if (outcome.outcomeInt === 3) {
        return {
          panelColor: '#00703c', // Green
          panelTitle: 'Article 18 Controls',
          panelText: 'The export of your waste to the selected country is subject to Article 18 controls, also known as Green List controls.',
          warningList: '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You can export your waste to this country but you must comply with the Article 18 (Green List) controls.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must complete and sign an Annex VII form and it must travel with the waste at all times.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>You must also check if there are any additional controls or requirements for the destination country.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td> Full information on shipping ‘Green List’ waste under <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#import-or-export-article-18-controls" class="govuk-link">Article 18 controls</a> is available on the waste import and export webpages.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>If you do not comply with all the Notification control requirements you will be breaking the law.</td></tr>'
        }
      } else if (outcome.outcomeInt === 4) {
        return {
          panelColor: '#FF9E00', // Amber
          panelTitle: 'More information is needed',
          panelText: 'More detailed information is needed to advise you on the controls that apply to the export of your waste to the selected country.',
          warningList: '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>More detailed information is required to determine the controls that apply to this export.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>For exports from England or Wales, please email the International Waste Shipments Team on <a href="mailto:askshipments@environment-agency.gov.uk" class="govuk-link">askshipments@environment-agency.gov.uk</a>.</td></tr>' +
                      '<tr><td><span class="govuk-warning-text__icon" aria-hidden="true">!</span></td><td>If you export your waste under the wrong controls you will be breaking the law.</td></tr>'
        }
      }
    }
    // Get the data for the view based on the outcome result
    const { panelColor, panelTitle, panelText, warningList } = generateOutcomeData()

    return h.view('outcome', {
      panelColor: panelColor,
      panelTitle: panelTitle,
      panelText: panelText,
      wasteCode: wasteData.wasteCode,
      wasteName: wasteData.wasteName1,
      countryName: countryData.countryDisplayName,
      warningList: warningList
    })
  }
}

module.exports = [{
  method: 'GET',
  path: '/outcome',
  handler: handlers.get
}]
