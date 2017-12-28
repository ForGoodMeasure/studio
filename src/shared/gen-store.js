import { createHistoryEnhancer, queryMiddleware } from 'farce';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';
import foundReducer from 'found/lib/foundReducer';
import Matcher from 'found/lib/Matcher';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';

import { routeConfig } from './routes';

import thunk from 'redux-thunk';
import { customReducer } from './reducer';

export default function genStore(historyProtocol, preloadedState) {

  let window = global.window || {};
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    combineReducers({
      found: foundReducer,
      data: customReducer
    }),
    preloadedState,
    composeEnhancers(
      applyMiddleware(thunk),
      createHistoryEnhancer({
        protocol: historyProtocol,
        middlewares: [queryMiddleware],
      }),
      createMatchEnhancer(
        new Matcher(routeConfig),
      ),
    ),
  );
}
