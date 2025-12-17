import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {CookiesProvider} from "react-cookie"
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
    <App />
    </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);