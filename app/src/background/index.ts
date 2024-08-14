import browser from 'webextension-polyfill'

// import { fetchAppData } from 'src/background/fetchAppData'
// import { MessageType } from 'src/constants'
// import { findApp } from 'src/background/findApp'

console.log('background loaded')

browser.runtime.onMessage.addListener(message => {
  if (message.type === 'cs_loaded') {
    return Promise.resolve({ type: 'get_name' })
  }

  if (message.type === 'game_name') {
    console.log('==========')
    console.log('BG::game name: ', message.name)
    console.log('==========')
  }
})

// browser.runtime.onMessage.addListener(async message => {
//   console.log('BG::message received: ', message)
//   if (message.type == MessageType.FIND_APP) {
//     const appNumber = await findApp(message.name)
//     if (appNumber) {
//       await fetchAppData(appNumber)
//     }
//   }
// })
