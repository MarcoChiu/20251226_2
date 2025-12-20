import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/all.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
//import{ BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  // <BrowserRouter>
  <App />
  //</BrowserRouter>
  //</StrictMode>,
)
