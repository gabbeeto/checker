import React from 'react'
import ReactDOM from 'react-dom/client'
import './styling/main.css'
import PlayField from './component/PlayField.jsx'

window.stats = '';

function Main() {
  return (
    <>
      <h1>playfield:</h1>
      <PlayField />
      <output>{window.stats}</output>
    </>
  )
}

export let root = ReactDOM.createRoot(document.querySelector('main'));
root.render(
  <Main />
)

export function reRender() {
  root.render(
    <Main />)
}
