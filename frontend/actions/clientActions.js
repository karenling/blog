var ApiUtil = require('../util/apiUtil');

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
  updatePost: function(params) {
    ApiUtil.updatePost(params);
  },
  sendMessage: function(params, callback) {
    ApiUtil.sendMessage(params, callback);
  }
};

module.exports = ClientActions;
