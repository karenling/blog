var SessionApiUtil = require('../util/sessionApiUtil');
var SessionConstants = require('../constants/sessionConstants');
var dispatcher = require('../dispatcher/dispatcher');
var BrowserHistory = require('react-router').browserHistory;

var SessionActions = {
  login: function(params) {
    SessionApiUtil.login(params, this.receiveCurrentUser);
  },
  logout: function() {
    SessionApiUtil.logout(this.removeCurrentUser);
  },
  fetchCurrentUser: function(complete) {
    SessionApiUtil.fetchCurrentUser(this.receiveCurrentUser, complete);
  },
  receiveCurrentUser: function(user) {
    dispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      user: user
    });
  },
  removeCurrentUser: function() {
    dispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    })
    BrowserHistory.push('/login')
  }
};

module.exports = SessionActions;
