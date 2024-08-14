import browser from 'webextension-polyfill'

import { MessageType } from 'src/constants'

export const Popup = (): JSX.Element => {
  return (
    <div>
      <h1>Popup</h1>
      <p>Popup content</p>
      <button
        onClick={() => {
          browser.runtime.sendMessage({
            type: MessageType.FIND_APP,
            name: 'The Slormancer',
          })
        }}
      >
        Fetch app data
      </button>
    </div>
  )
}
