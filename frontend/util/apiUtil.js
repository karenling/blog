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
  fetchOnePost: function(friendlyName, errorCallback) {
    $.ajax({
      type: 'GET',
      url: '/api/posts/' + friendlyName,
      dataType: 'JSON',
      success: function(post) {
        ServerActions.receiveOnePost(post);
      },
      error: function(response) {
        console.log(response.responseJSON.base);
        errorCallback();
      }
    });
  },
  createPost: function(params, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/posts',
      dataType: 'JSON',
      data: { post: params },
      success: function(post, status) {
        ServerActions.createPost(post);
        callback(status);
      },
      error: function(response, status) {
        callback(status, response.responseText);
      }
    });
  },
  updatePost: function(params, callback) {
    $.ajax({
      type: 'PUT',
      url: '/api/posts/' + params.friendly_name,
      dataType: 'JSON',
      data: { post: params },
      success: function(post, status) {
        ServerActions.updatePost(post)
        callback(status);
      },
      error: function(response, status) {
        callback(status, response.responseText);
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
        callback(payload.status, payload.message);
      },
      error: function(response, status) {
        callback(status, response.responseText);
      }
    });
  }
};

module.exports = ApiUtil;
