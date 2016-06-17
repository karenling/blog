var ApiUtil = require('../util/apiUtil');

var ClientActions = {
  fetchAllPosts: function() {
    ApiUtil.fetchAllPosts();
  }
};

module.exports = ClientActions;
