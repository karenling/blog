var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PostStore = new Store(dispatcher);
var PostConstants = require('../constants/postConstants');

var _posts = {};
var _fullPosts = {}

PostStore.all = function() {
  return Object.keys(_posts).map(function(key) {
    return _posts[key];
  });
};

PostStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      addPosts(payload.posts.current_posts);
      PostStore.totalPosts(payload.posts.total_posts);
      PostStore.__emitChange();
      break;
    case PostConstants.POST_RECEIVED:
      resetFullPost(payload.post)
      PostStore.__emitChange();
      break;
  }
};

PostStore.totalPosts = function(totalPosts) {
  return totalPosts;
};

PostStore.findByFriendlyName = function(friendlyName) {
  return _fullPosts[friendlyName];
};

var addPosts = function(payloadPosts) {
  payloadPosts.forEach(function(post) {
    _posts[post.friendly_name] = post;
  });
};

var resetFullPost = function(payloadPost) {
  _fullPosts[payloadPost.friendly_name] = payloadPost;
};

module.exports = PostStore;
