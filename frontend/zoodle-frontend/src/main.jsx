// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router';
import Header from './components/Header';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
