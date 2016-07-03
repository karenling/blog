var ApiUtil = require('../util/apiUtil');
var BrowserHistory = require('react-router').browserHistory;

var ClientActions = {
  fetchPosts: function(page) {
    ApiUtil.fetchPosts(page);
  },
  fetchOnePost: function(friendlyName) {
    ApiUtil.fetchOnePost(friendlyName, this.errorRedirect);
  },
  createPost: function(params, callback) {
    ApiUtil.createPost(params, callback);
  },
  updatePost: function(params, callback) {
    ApiUtil.updatePost(params, callback);
  },
  sendMessage: function(params, callback) {
    ApiUtil.sendMessage(params, callback);
  },
  errorRedirect: function() {
    BrowserHistory.push('/')
  }
};

module.exports = ClientActions;
