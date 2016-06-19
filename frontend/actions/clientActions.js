var ApiUtil = require('../util/apiUtil');
var SessionApiUtil = require('../util/sessionApiUtil');

var ClientActions = {
  fetchPosts: function(limit) {
    ApiUtil.fetchPosts(limit);
  },
  fetchOnePost: function(friendlyName) {
    ApiUtil.fetchOnePost(friendlyName);
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
  login: function(params, callback) {
    SessionApiUtil.login(params, callback);
  },
  logout: function(callback) {
    SessionApiUtil.logout(callback);
  }
};

module.exports = ClientActions;
