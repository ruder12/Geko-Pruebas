import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminRouter from './router/AdminRouter'
import { BrowserRouter as Router } from 'react-router-dom'
import '../src/assets/style.css'
import { Provider } from 'react-redux'
import config from './Config/config'
import {store} from './store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <Router basename={config.basename}>
            <AdminRouter />
        </Router>
    </Provider>
  </React.StrictMode>
)
