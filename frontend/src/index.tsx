import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';

import { Routes } from './route';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
