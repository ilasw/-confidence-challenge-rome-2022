import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import reportWebVitals from './reportWebVitals';
import App from './App';

const rootReducer = combineReducers({
  workspaces: () => [],
  activity: () => ({})
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
