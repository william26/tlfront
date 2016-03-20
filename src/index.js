import 'babel-polyfill';

import {render} from 'react-dom';
import React from 'react';

import LayoutComponent from './components/layout';

import configureStore from './store';

const store = configureStore();

const elt = document.getElementById('root');

import {Provider} from 'react-redux';

render(
  <Provider store={store}>
    <LayoutComponent />
  </Provider>,
  elt
);
