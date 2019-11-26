import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import './index.css'
import { App } from './App'
import * as serviceWorker from './serviceWorker'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store.store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()

window.history.scrollRestoration = 'manual'

// Experimental: disable pinch to zoom in Safari
document.addEventListener('gesturestart', function(e) {
  e.preventDefault()
})

// Experimental: disable double tap to zoom in Safari
document.getElementById('root').addEventListener('click', () => {})
