import React from 'react';
import ReactDOM from 'react-dom';
import {createGlobalStyle} from 'styled-components';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    padding: 0px;
    margin: 0px;
    font-size: 16px;
    letter-spacing: 0.1em;
    font-style: normal;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
