// Generate the warning messages
function generateWarning (warningText) {
  return `<span class="govuk-warning-text__icon" aria-hidden="true">!</span><span class="govuk-warning-text__text"><span class="govuk-warning-text__assistive">Warning</span>${ warningText }</span><br>`
}

// Determine the waste export outcome and generate page data
function generateOutcomeData (outcomeInt) {
  if (outcomeInt === 1) {
    return {
      panelColor: '#FF0000', // Red
      panelTitle: 'Export is prohibited',
      panelText: 'You are not allowed to export your waste to the country you selected under the Waste Shipments Regulation.',
      warningList: generateWarning('This country’s regulatory authority has advised that they will not accept exports of this waste type.') +
                    generateWarning('This means that you cannot export your waste to this country, even if you have a letter or contract with the site or reprocessor in that country.') +
                    generateWarning('If you do export your waste to this country you will be breaking the law.')
    }
  } else if (outcomeInt === 2) {
    return {
      panelColor: '#00703c', // Green
      panelTitle: 'Notification controls',
      panelText: 'You must export your waste to the country you selected under notification controls.',
      warningList: generateWarning('You can export your waste to this country but you must comply with the Notification controls.') +
                    generateWarning('You must apply to the <strong>competent authority</strong> of the country from where you will export the waste by completing a notification application and paying the correct fees.') +
                    generateWarning('You must also have a <strong>financial guarantee, a contract</strong> with the business recovering your waste, <strong>insurance</strong> against liability for third parties, and <strong>permission</strong> from the competent authorities of dispatch, destination and transit.') +
                    generateWarning('You must check with the <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#waste-shipment-controls" class="govuk-link">competent authorities</a> if there are any <strong>local controls</strong> that apply in any country involved in the journey of your waste (called ’transit’ and ’destination’ countries).') +
                    generateWarning('Check the <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#apply-for-import-or-export-notification-controls" class="govuk-link">notification procedure</a> and <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#notification-controls-how-to-comply" class="govuk-link">how to comply with your notification</a> on the waste import and export webpage.') +
                    generateWarning('If you do not comply with all the notification control requirements you will be breaking the law.')
    }
  } else if (outcomeInt === 3) {
    return {
      panelColor: '#00703c', // Green
      panelTitle: 'Article 18 controls',
      panelText: 'You can export your waste to the country you selected under Article 18 controls, also known as "Green List" controls.',
      warningList: generateWarning('You can export your waste to this country but you must comply with the Article 18 (Green List) controls.') +
                    generateWarning('You must complete and sign an Annex VII form and it must travel with the waste at all times.') +
                    generateWarning('You must check with the <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#waste-shipment-controls" class="govuk-link">competent authorities</a> if there are any <strong>local controls</strong> that apply in any country involved in the journey of your waste (called ’transit’ and ’destination’ countries).') +
                    generateWarning('Check how to ship "Green List" waste under <a href="https://www.gov.uk/guidance/importing-and-exporting-waste#import-or-export-article-18-controls" class="govuk-link">Article 18 controls</a> on the waste import and export webpages.') +
                    generateWarning('If you do not comply with all the Article 18 control requirements you will be breaking the law.')
    }
  } else if (outcomeInt === 4) {
    return {
      panelColor: '#E68E00', // Amber
      panelTitle: 'More information is needed',
      panelText: 'We need more detailed information so we can advise you on the controls that apply to the export of your waste to the country you selected.',
      warningList: generateWarning('More detailed information is needed to determine the controls that apply to this export.') +
                    generateWarning('For exports from England, please email the International Waste Shipments Team at <a href="mailto:askshipments@environment-agency.gov.uk" class="govuk-link">askshipments@environment-agency.gov.uk</a>.') +
                    generateWarning('If you export your waste under the wrong controls you will be breaking the law.')
    }
  }
}

const handlers = {
  get: async (request, h) => {
    // Check to see if the confirmation box on the home page has been checked. If not redirect to '/'
    const confirmCheckbox = request.yar.get('confirmCheckbox')
    if (!confirmCheckbox) {
      return h.redirect('/')
    } else {
      const wasteData = request.yar.get('wasteData')
      const countryData = request.yar.get('countryData')
      const outcomeInt = request.yar.get('outcomeInt')

      // Get the data for the view based on the outcome result
      const { panelColor, panelTitle, panelText, warningList } = generateOutcomeData(outcomeInt)

      // Send an event to Google Analytics
      await request.ga.event({
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
    }
  },
  post: async (request, h) => {
    // Clear countryData on a new search as it is used by enterWaste POST process to determine if a country needs to be entered
    // clear rather than reset() keeps the current yar session ID to be used to identify idividual user sessions in analytics
    request.yar.clear('countryData')

    // Send an event to Google Analytics
    await request.ga.event({
      category: 'outcome',
      action: 'new check initiated'
    })

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
