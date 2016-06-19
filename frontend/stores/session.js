var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var SessionStore = new Store(Dispatcher);
var SessionConstants = require('../constants/sessionConstants');

_currentUser = {};
_currentUserHasBeenFetched = false;

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SessionConstants.RECEIVE_CURRENT_USER:
      _currentUser = payload.user;
      _currentUserHasBeenFetched = !!payload.user.email;
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUserHasBeenFetched = function() {
  return _currentUserHasBeenFetched;
};

SessionStore.currentUser = function() {
  return _currentUser;
};

SessionStore.isUserLoggedIn = function() {
  return !!_currentUser.email;
};

module.exports = SessionStore;
