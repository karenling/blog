var React = require('react');
var ReactDOM = require('react-dom');
ClientActions = require('./actions/clientActions');
var PostIndex = require('./components/posts/index');

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<PostIndex/>, document.getElementById('root'));
})
