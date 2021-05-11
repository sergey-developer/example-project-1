import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import env from 'config/env';

import getRootReducerCreator from './rootReducer';
import rootSaga from './rootSaga';

const browserHistory = createBrowserHistory();

const configureAppStore = (initialState = {}) => {
  const createRootReducer = getRootReducerCreator(browserHistory);

  const sagaMiddleware = createSagaMiddleware();

  const enhancers = [
    createInjectorsEnhancer({
      // @ts-ignore
      createReducer: createRootReducer,
      runSaga: sagaMiddleware.run
    })
  ];

  const store = configureStore({
    reducer: createRootReducer(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false
      }).concat(sagaMiddleware),
    enhancers,
    preloadedState: initialState,
    devTools: env.get('isDev') as boolean
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export { browserHistory };

export default configureAppStore;
