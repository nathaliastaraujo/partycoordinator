import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';
import Router from './Router';
import rootReducer from './reducers';

// const store = createStore(rootReducer, composeWithDevTools(
//   applyMiddleware(reduxThunk),
// ));

const enhance = composeWithDevTools({
  realtime: true,
  host: 'localhost',
  port: 8000
});

const store = createStore(rootReducer, enhance(applyMiddleware(reduxThunk)));

const EventsApp = prop => (

  <Provider store={store}>
    <Router/>
  </Provider>
  
)

export default EventsApp;