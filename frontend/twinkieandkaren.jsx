import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { RouterProvider, routerForBrowser, AbsoluteFragment as Fragment } from 'redux-little-router';
import ReactDOM from 'react-dom';
import React from 'react';

import RootReducer from './reducers/';

// import Home from './components/Home';
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

const logger = createLogger();

const store = createStore(
  RootReducer,
  compose(
    routerEnhancer,
    applyMiddleware(routerMiddleware, thunk, logger),
  ),
);

class TwinkieAndKaren extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterProvider store={store}>
            <Root>
              <Fragment forRoutes={['/']}><PostIndex /></Fragment>
              <Fragment forRoutes={['/posts/:id']}><PostShow /></Fragment>
              <Fragment forRoutes={['/about']}><About /></Fragment>
            </Root>
        </RouterProvider>
      </Provider>
    );
  }
}
// var ReactGA = require('react-ga');
// ReactGA.initialize('UA-4234175-15');
//
// function logPageView() {
//   ReactGA.pageview(window.location.pathname);
// }
//
// function _ensureUserFetched(nextState, replace, asyncDoneCallback){
//   if ( SessionStore.currentUserHasBeenFetched() ) {
//     asyncDoneCallback();
//   } else {
//     SessionActions.fetchCurrentUser(asyncDoneCallback);
//   }
//   $.ajax({
//     type: 'POST',
//     data: { location: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1] },
//     url: '/events/set_timezone'
//   });
// }
//
// var _ensureLoggedIn = function(nextState, replace) {
//   if (!SessionStore.isUserLoggedIn()) {
//     replace('/login')
//   }
// }
//
// var routes = (
//   <Route path="/" component={ App } onEnter={ _ensureUserFetched } onUpdate={ logPageView }>
//     <IndexRoute component={ PostIndex } />
//     <Route path="/posts/:friendlyName" component={ PostShow }></Route>
//     <Route path="/about" component={ About }></Route>
//     <Route path="/login" component={ LoginForm }></Route>
//   </Route>
// );

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<TwinkieAndKaren />, document.getElementById('root'));
})
