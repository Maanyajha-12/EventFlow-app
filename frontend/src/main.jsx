import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// This will create the root and tells React to show 'App' inside the 'root' div
ReactDOM.createRoot(document.getElementById('root')).render(//renders react to browser dom
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
//entry point of react
