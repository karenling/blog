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
      url: '/api/posts/' + friendlyName,
      dataType: 'JSON',
      success: function(post) {
        ServerActions.receiveOnePost(post);
      }
    });
  },
  sendMessage: function(params, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/send_contact',
      dataType: 'JSON',
      data: params,
      success: function(payload) {
        callback(payload.status, payload.message)
      },
      error: function(response, status) {
        callback(status, response.responseText)
      }
    })
  }
};

module.exports = ApiUtil;
