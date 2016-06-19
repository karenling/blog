var React = require('react');
var ReactDOM = require('react-dom');
var BrowserHistory = require('react-router').browserHistory;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var App = require('./components/app');
var PostIndex = require('./components/posts/index');
var PostShow = require('./components/posts/show');
var PostEdit = require('./components/posts/edit')
var About = require('./components/about');
var LoginForm = require('./components/login');
var SessionStore = require('./stores/session');
var SessionActions = require('./actions/sessionActions');

function _ensureUserFetched(nextState, replace, asyncDoneCallback){
  if ( SessionStore.currentUserHasBeenFetched() ) {
    asyncDoneCallback();
  } else {
    SessionActions.fetchCurrentUser(asyncDoneCallback);
  }
}

var _ensureLoggedIn = function(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/login')
  }
}

var routes = (
  <Route path="/" component={ App } onEnter={ _ensureUserFetched }>
    <IndexRoute component={ PostIndex } />
    <Route path="/posts/:friendlyName/edit" component={ PostEdit }></Route>
    <Route path="/posts/:friendlyName" component={ PostShow }></Route>
    <Route path="/about" component={ About } onEnter={ _ensureLoggedIn }></Route>
    <Route path="/login" component={ LoginForm }></Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Router history={ BrowserHistory }>{ routes }</Router>, document.getElementById('root'));
})
