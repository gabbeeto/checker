import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './component/Header.jsx'
import Main from './component/Main.jsx'
import './styling/main.css'


export let root = ReactDOM.createRoot(document.getElementById('root'));
root.render((<>
  <Header />
  <Main />
</>))

export function reRender(){
 root.render((<>
  <Main />
</>))
}
