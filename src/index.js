import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {DataContextProvider} from './DataContext'
import './index.css'
import App from './App'

ReactDOM.render(
  <DataContextProvider>
    <Router>
      <App />
    </Router>
  </DataContextProvider>
,document.getElementById('root'));