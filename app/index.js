/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import App from './components/App';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './main.scss';
const store = configureStore();

import { loadFavorites } from './actions/favoritesActions';
import { loadSettings } from './actions/settingsActions';
store.dispatch(loadSettings());
store.dispatch(loadFavorites());

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <NewApp />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
