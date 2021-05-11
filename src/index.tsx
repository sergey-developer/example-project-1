import 'styles/font-import.css';
import 'config/i18n';

import React from 'react';
import ReactDOM from 'react-dom';

import env from 'config/env';

import reportWebVitals from './reportWebVitals';

env.init().then(async () => {
  const AppModule = await import('./app/App');

  ReactDOM.render(
    <React.StrictMode>
      <AppModule.default />
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
