var dispatcher = require('../dispatcher/dispatcher');
var PostConstants = require('../constants/postConstants');
var posts = require('../stores/post');

var ServerActions = {
  receivePosts: function(posts) {
    dispatcher.dispatch({
      actionType: PostConstants.POSTS_RECEIVED,
      posts: posts
    });
  },
  receiveOnePost: function(post) {
    dispatcher.dispatch({
      actionType: PostConstants.POST_RECEIVED,
      post: post
    });
  },
  createPost: function(post) {
    dispatcher.dispatch({
      actionType: PostConstants.CREATE_POST,
      post: post
    });
  }
};

module.exports = ServerActions;
