$(() => {
  // NOTE: values
  let isActive = false

  // NOTE: functions
  const getActive = () => {
    isActive = localStorage.getItem('mns-active') === 'true'

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, isActive)
    })

    $('#active').prop('checked', isActive)
  }
  const changeActive = (flag) => {
   localStorage.setItem('mns-active', flag)
   chrome.tabs.query({
     active: true,
     currentWindow: true
   }, function (tabs) {
     chrome.tabs.sendMessage(tabs[0].id, flag)
   })
  }

  // NOTE: init
  getActive()

  // NOTE: popup triggers
  $('#active').on('change', (val) => {
    $('#active:checked').each(() => {
      changeActive(true)
    })
    $('#active:not(:checked)').each(() => {
      changeActive(false)
    })
  })
})
