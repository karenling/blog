import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { RouterProvider, routerForBrowser, AbsoluteFragment as Fragment, initializeCurrentLocation }
       from 'redux-little-router';
import ReactDOM from 'react-dom';
import React from 'react';

import RootReducer from './reducers/';

import Root from './components/Root';
import About from './components/About';
import PostIndex from './components/PostIndex';
import PostShow from './components/PostShow';

const routes = {
  '/': {
    title: 'Home',
  },
  '/posts/:id': {
    title: 'Post',
  },
  '/posts/page/:page': {
    title: 'Page',
  },
  '/posts/tagged/:tag': {
    title: 'Tag',
  },
  '/about': {
    title: 'About',
  },
};

const {
  routerEnhancer,
  routerMiddleware
} = routerForBrowser({
  routes,
});

// const logger = createLogger();

const store = createStore(
  RootReducer,
  compose(
    routerEnhancer,
    applyMiddleware(routerMiddleware, thunk),
  ),
);

const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

const TwinkieAndKaren = () => (
  <Provider store={store}>
    <RouterProvider store={store}>
      <Root>
        <Fragment forRoutes={['/']}><PostIndex /></Fragment>
        <Fragment forRoutes={['/posts/page/:page']}><PostIndex /></Fragment>
        <Fragment forRoutes={['/posts/tagged/:tag']}><PostIndex /></Fragment>
        <Fragment forRoutes={['/posts/:id']}><PostShow /></Fragment>
        <Fragment forRoutes={['/about']}><About /></Fragment>
      </Root>
    </RouterProvider>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.render(<TwinkieAndKaren />, root);
  }
});
