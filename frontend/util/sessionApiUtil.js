var ClientActions = require('../actions/clientActions');

var SessionApiUtil = {
  login: function(params, successCallback) {
    $.ajax({
      type: 'POST',
      url: '/api/session',
      data: params,
      success: function(user) {
        successCallback();
        console.log('loggedin ')
      },
      error: function(response, status) {
        callback(status, response.responseJSON.base)
      }
    });
  },
  fetchCurrentUser: function(successCallback, complete) {
    $.ajax({
      type: 'GET',
      url: '/api/session',
      success: function(user) {
        successCallback();
      },
      complete: function() {
        complete()
      },
      error: function(response, status) {
        console.log(response.responseJSON.base);
      }
    });
  },
  logout: function(success) {
    $.ajax({
      type: 'DELETE',
      url: '/api/session',
      success: function(user) {
        success();
        console.log('logged out')
      },
      error: function(response, status) {
        console.log(response.responseJSON.base)
      }
    });
  }
};

module.exports = SessionApiUtil;
