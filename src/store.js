import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

import reduxThunk from 'redux-thunk';
import * as reducers from './reducers';

export default function configureStore() {

  return createStore(
    combineReducers(reducers),
    compose(
      applyMiddleware(reduxThunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
