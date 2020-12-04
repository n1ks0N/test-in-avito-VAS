import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import 'react-color-gradient-picker/dist/index.css'
import reportWebVitals from './reportWebVitals'

const render = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={state}
        dispatch={store.dispatch.bind(store)}
      />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render(store.getState())
store.subscribe(() => {
  const state = store.getState()
  render(state)
})

reportWebVitals()