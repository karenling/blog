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
      addPosts(payload.posts);
      PostStore.__emitChange();
      break;
    case PostConstants.POST_RECEIVED:
      resetPost(payload.post)
      PostStore.__emitChange();
      break;
  }
};

PostStore.findByFriendlyName = function(friendlyName) {
  return _posts[friendlyName];
};

var addPosts = function(payloadPosts) {
  payloadPosts.forEach(function(post) {
    _posts[post.friendly_name] = post;
  });
};

var resetPost = function(payloadPost) {
  _posts[payloadPost.friendly_name] = payloadPost;
};

module.exports = PostStore;
