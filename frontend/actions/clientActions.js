var ApiUtil = require('../util/apiUtil');

var ClientActions = {
  fetchPosts: function(limit) {
    ApiUtil.fetchPosts(limit);
  },
  fetchOnePost: function(friendlyName) {
    ApiUtil.fetchOnePost(friendlyName);
  },
  sendMessage: function(params, callback) {
    ApiUtil.sendMessage(params, callback);
  }
};

module.exports = ClientActions;
