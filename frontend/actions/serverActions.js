var dispatcher = require('../dispatcher/dispatcher');
var PostConstants = require('../constants/postConstants');
var posts = require('../stores/post');

var ServerActions = {
  receiveAllPosts: function(posts) {
    dispatcher.dispatch({
      actionType: PostConstants.POSTS_RECEIVED,
      posts: posts
    });
  }
};

module.exports = ServerActions;
