var React = require('react');
var ReactDOM = require('react-dom');
ClientActions = require('./actions/clientActions');
var HashHistory = require('react-router').hashHistory;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var App = require('./components/app');
var PostIndex = require('./components/posts/index');
var PostShow = require('./components/posts/show');
var About = require('./components/about');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={ PostIndex } />
    <Route path="/posts/:friendlyName" component={ PostShow }></Route>
    <Route path="/about" component={ About }></Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Router history={ HashHistory }>{ routes }</Router>, document.getElementById('root'));
})
