var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var SessionStore = new Store(Dispatcher);
var SessionConstants = require('../constants/sessionConstants');

_currentUser = {};
_currentUserHasBeenFetched = false;

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.user);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _logout();
      SessionStore.__emitChange();
      break;
  }
};

var _login = function(user) {
  _currentUser = user;
  _currentUserHasBeenFetched = true;
}

var _logout = function() {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
}
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
