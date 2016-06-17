var ApiUtil = require('../util/apiUtil');

var ClientActions = {
  fetchPosts: function(limit) {
    ApiUtil.fetchPosts(limit);
  }
};

module.exports = ClientActions;
