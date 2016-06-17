var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PostStore = new Store(dispatcher);
var PostConstants = require('../constants/postConstants');

var _posts = [];

PostStore.all = function() {
  return _posts;
};

PostStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      addPosts(payload.posts);
      PostStore.__emitChange();
      break;
  }
};

var addPosts = function(payloadPosts) {
  _posts = _posts.concat(payloadPosts);
};

module.exports = PostStore;
