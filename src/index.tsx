import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './services/reducers';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
