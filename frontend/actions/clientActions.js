var ApiUtil = require('../util/apiUtil');

var ClientActions = {
  fetchPosts: function(limit) {
    ApiUtil.fetchPosts(limit);
  },
  fetchOnePost: function(friendlyName) {
    ApiUtil.fetchOnePost(friendlyName);
  }
};

module.exports = ClientActions;
