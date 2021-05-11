import { Store as ReduxStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import configureAppStore from './configureAppStore';

const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;

export type Store = ReduxStore<RootState>;

// https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
