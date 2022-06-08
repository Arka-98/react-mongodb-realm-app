import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client'
import './index.css';
import App from './App';

const root = ReactDOMClient.createRoot(document.getElementById('root'))

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)

// Legacy API
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
