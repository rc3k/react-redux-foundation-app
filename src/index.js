import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import { CollectionContainer } from './components/Collection';
import { ItemContainer } from './components/Item';

// create store, set state, poll server
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);


// create routes
const routes = [
  <Route path="/:collection" exact component={CollectionContainer} />,
  <Route path="/:collection/:itemid" exact component={ItemContainer} />,
  <Route path="/:collection/item/add" exact component={ItemContainer} />,
];

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>{routes}</BrowserRouter>
  </Provider>,
  document.querySelector('#enrolments-app'),
);
