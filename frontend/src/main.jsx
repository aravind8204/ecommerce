import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {CookiesProvider} from "react-cookie"
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {AppProvider} from "./context/AppContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);