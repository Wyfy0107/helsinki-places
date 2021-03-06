import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'

import 'mapbox-gl/dist/mapbox-gl.css'
import './index.css'

import ErrorBoundary from './components/Error/ErrorBoundary'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND as string

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
