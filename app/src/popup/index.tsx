import { createRoot } from 'react-dom/client'
import 'src/popup/index.css'
import { Popup } from 'src/popup/Popup'

const init = () => {
  const rootContainer = document.querySelector('#root-popup')!
  const root = createRoot(rootContainer)
  root.render(<Popup />)
}
init()
