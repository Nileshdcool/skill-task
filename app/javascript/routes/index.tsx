import React from 'react';
import { FC } from 'react';
import { Provider } from 'react-redux';

import store from 'store';

import Home from './Home';
import 'bootstrap/dist/css/bootstrap.css';

const Routes: FC = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default Routes;
