var ServerActions = require('../actions/serverActions');

var ApiUtil = {
  fetchPosts: function(limit) {
    $.ajax({
      type: 'GET',
      url: '/api/posts',
      dataType: 'JSON',
      data: { limit: limit },
      success: function(posts) {
        ServerActions.receivePosts(posts);
      }
    });
  },
  fetchOnePost: function(friendlyName) {
    $.ajax({
      type: 'GET',
      url: 'api/posts/' + friendlyName,
      dataType: 'JSON',
      success: function(post) {
        ServerActions.receiveOnePost(post);
      }
    });
  }
};

module.exports = ApiUtil;
