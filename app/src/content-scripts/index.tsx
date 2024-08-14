import browser from 'webextension-polyfill'

const GAME_NAME_SELECTOR = 'a[data-a-target="stream-game-link"] > span'
// Select the parent div where the game name is located. This div has a class name that starts with 'Layout-' and is not the chat div.
const PARENT_SELECTORS = {
  name: 'DIV',
  classNameRegex: /^Layout-/,
  exclude: { role: 'log' },
}

window.addEventListener('unload', () => {
  browser.runtime.sendMessage({ type: 'cs_unloaded' })
  observer.disconnect()
})

let found = false
let previousUrl = ''
let lastGameNameFounded: string | null = null

const observer = new MutationObserver(function (mutations) {
  if (!found) {
    for (const mutation of mutations) {
      const div = mutation.target as HTMLDivElement
      if (
        div.nodeName === PARENT_SELECTORS.name &&
        div.className.match(PARENT_SELECTORS.classNameRegex) &&
        div.role !== PARENT_SELECTORS.exclude.role
      ) {
        const gameName = document.querySelector(GAME_NAME_SELECTOR)?.textContent
        // "lastGameNameFounded" is seful because otherwise the first occurrence of the name found is the one preceding the url change.
        if (gameName && gameName !== lastGameNameFounded) {
          lastGameNameFounded = gameName
          found = true
          browser.runtime.sendMessage({ type: 'game_name', name: gameName })
        }
      }
    }
  }

  if (location.href !== previousUrl) {
    previousUrl = location.href
    found = false
  }
})

const config = { subtree: true, childList: true }
observer.observe(document, config)
