var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PostStore = new Store(dispatcher);
var PostConstants = require('../constants/postConstants');

var _posts = {};

PostStore.all = function() {
  return Object.keys(_posts).map(function(key) {
    return _posts[key];
  });
};

PostStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      resetPosts(payload.posts);
      PostStore.__emitChange();
      break;
  }
};

var resetPosts = function(posts) {
  _posts = {};
  posts.forEach(function(post) {
    _posts[post.id] = post;
  });
};

module.exports = PostStore;
