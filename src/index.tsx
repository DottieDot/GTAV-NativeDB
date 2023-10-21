import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './style.css'
import init from 'wasm-lib'
import { notifyUpdateReady } from './context'

const container = document.getElementById('root')
const root = createRoot(container!)

init().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({ onUpdate: (swRegistration) => notifyUpdateReady(swRegistration) })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
