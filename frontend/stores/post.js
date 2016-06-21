var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PostStore = new Store(dispatcher);
var PostConstants = require('../constants/postConstants');

var _posts = {};
var _fullPosts = {};
var _totalPosts;

function _compare(a, b) {
  if (a.friendly_name < b.friendly_name) {
    return 1;
  } else if (a.friendly_name > b.friendly_name) {
    return -1;
  } else {
    return 0;
  }
}

PostStore.all = function() {
  return Object.keys(_posts).map(function(key) {
    return _posts[key];
  }).sort(_compare);
};

PostStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      addPosts(payload.posts.current_posts);
      setTotalPosts(payload.posts.total_posts);
      PostStore.__emitChange();
      break;
    case PostConstants.POST_RECEIVED:
      resetFullPost(payload.post);
      PostStore.__emitChange();
      break;
    case PostConstants.CREATE_POST:
      addPost(payload.post.truncated_post);
      resetFullPost(payload.post.full_post);
      PostStore.__emitChange();
      break;
    case PostConstants.UPDATE_POST:
      addPost(payload.post.truncated_post);
      resetFullPost(payload.post.full_post);
      PostStore.__emitChange();
      break;
  }
};


PostStore.allFetched = function() {
  return Object.keys(_posts).length >= _totalPosts;
};

PostStore.findByFriendlyName = function(friendlyName) {
  var post;
  Object.keys(_fullPosts).forEach(function(id) {
    if (_fullPosts[id].friendly_name === friendlyName) {
      post = _fullPosts[id];
      return;
    }
  });
  return post;
};

var setTotalPosts = function(totalPosts) {
  _totalPosts = totalPosts;
};

var addPosts = function(payloadPosts) {
  payloadPosts.forEach(function(post) {
    _posts[post.id] = post;
  });
};

var addPost = function(payloadPost) {
  _posts[payloadPost.id] = payloadPost;
};

var resetFullPost = function(payloadPost) {
  _fullPosts[payloadPost.id] = payloadPost;
};

module.exports = PostStore;
