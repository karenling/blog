var ServerActions = require('../actions/serverActions');

var SessionApiUtil = {
  login: function(params, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/session',
      data: params,
      success: function(user) {
        ServerActions.receiveCurrentUser(user);
      },
      error: function(response) {
        console.log(response.responseJSON.base)
      } 
    });
  },
  fetchCurrentUser: function() {
    $.ajax({
      type: 'GET',
      url: '/api/session',
      success: function(user) {
        ServerActions.receiveCurrentUser(user);
      },
      error: function(response) {
        console.log(response.responseJSON.base)
      }
    });
  },
  logout: function(callback) {
    $.ajax({
      type: 'DELETE',
      url: '/api/session',
      success: function(user) {
        ServerActions.receiveCurrentUser(user);
      },
      error: function(response) {
        console.log(response.responseJSON.base)
      }
    });
  }
};

module.exports = SessionApiUtil;
