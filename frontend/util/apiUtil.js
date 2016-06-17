var ServerActions = require('../actions/serverActions');

var ApiUtil = {
  fetchAllPosts: function() {
    $.ajax({
      type: 'GET',
      url: '/api/posts',
      dataType: 'JSON',
      success: function(posts) {
        ServerActions.receiveAllPosts(posts);
      }
    });
  }
};

module.exports = ApiUtil;
