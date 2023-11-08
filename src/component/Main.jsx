import 'react'
import 'react-dom'
import PlayField from './mainExtras/PlayField.jsx'

window.stats = '';

export default function Main() {

  return (
    <main>
      <h1>playfield:</h1>
      <PlayField />
      <output>{window.stats}</output>
    </main>
  )


}
