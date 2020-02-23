import React from 'react';
import Main from './components/Main';
import store, { initStore } from './store';
import { Provider } from 'react-redux';
initStore();
export default () => <Provider store={store}>
  <Main/>
</Provider>;
