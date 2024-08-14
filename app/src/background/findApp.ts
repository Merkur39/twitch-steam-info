import parse from 'node-html-parser'

import { STEAM_CHARTS_SEARCH_URL } from 'src/constants'

const REGEX_APP_NUMBER = /\/app\/(\d+)/

export const findApp = async (name: string) => {
  try {
    const searchURL = `${STEAM_CHARTS_SEARCH_URL}${encodeURIComponent(name)}`

    const resp = await fetch(searchURL)
    if (!resp.ok) {
      throw new Error(`Error HTTP : ${resp.status}`)
    }

    const htmlText = await resp.text()
    const root = parse(htmlText)

    const element = root.querySelector('tbody > tr > td > a')
    if (!element) {
      throw new Error(`Element not found in HTML: ${htmlText}`)
    }

    const href = element.getAttribute('href')
    if (!href) {
      throw new Error(`href attribut not found in element: ${element.toString()}`)
    }
    const match = href.match(REGEX_APP_NUMBER)
    if (!match) {
      throw new Error(`App number not found in href attribute value: ${href}`)
    }
    console.log('App number found:', match[1])

    return match[1]
  } catch (error) {
    console.error('Error while finding app:', error)
  }
}
