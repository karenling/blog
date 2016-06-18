var ServerActions = require('../actions/serverActions');

_block = false; // use block to make sure requests don't go on infinitely

var ApiUtil = {
  fetchPosts: function(limit) {
    if (_block) {
      return;
    }
    _block = true;
    $.ajax({
      type: 'GET',
      url: '/api/posts',
      dataType: 'JSON',
      data: { limit: limit },
      success: function(posts) {
        ServerActions.receivePosts(posts);
        _block = false;
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
