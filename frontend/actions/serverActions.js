var dispatcher = require('../dispatcher/dispatcher');
var PostConstants = require('../constants/postConstants');
var SessionConstants = require('../constants/sessionConstants');

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
  },
  updatePost: function(post) {
    dispatcher.dispatch({
      actionType: PostConstants.UPDATE_POST,
      post: post
    });
  },
  receiveCurrentUser: function(user) {
    dispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  }
};

module.exports = ServerActions;
