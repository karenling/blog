var ApiUtil = require('../util/apiUtil');

var ClientActions = {
  fetchPosts: function(limit) {
    ApiUtil.fetchPosts(limit);
  },
  fetchOnePost: function(friendlyName) {
    ApiUtil.fetchOnePost(friendlyName);
  },
  createPost: function(params) {
    ApiUtil.createPost(params);
  },
  sendMessage: function(params, callback) {
    ApiUtil.sendMessage(params, callback);
  }
};

module.exports = ClientActions;
