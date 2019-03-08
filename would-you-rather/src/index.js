import React from 'react'
import ReactDOM from 'react-dom'
import 'purecss/build/pure.css'
import 'purecss/build/grids-core.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './App.css'

import App from './components/App'
import reducers from './reducers'
import middleware from './middleware'

const store = createStore(reducers, middleware)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
    , document.getElementById('root')
  )
