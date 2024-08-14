import { parse } from 'node-html-parser'
import { STEAM_CHARTS_APP_URL } from 'src/constants'

export const fetchAppData = async (appNumber: string) => {
  try {
    const resp = await fetch(`${STEAM_CHARTS_APP_URL}${appNumber}`)

    if (!resp.ok) {
      throw new Error(`Erreur HTTP : ${resp.status}`)
    }
    const htmlText = await resp.text()
    const root = parse(htmlText)

    const elements = root.querySelectorAll('div.app-stat span.num')
    if (elements) {
      for (const element of elements) {
        const content = element.text
        console.log('Donnée récupérée :', content)
      }
    } else {
      console.log('Aucun élément trouvé avec la classe spécifiée.')
    }
  } catch (error) {
    console.log('ERROR : ', error)
  }
}
