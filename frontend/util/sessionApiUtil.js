var ClientActions = require('../actions/clientActions');

var SessionApiUtil = {
  login: function(params, success) {
    $.ajax({
      type: 'POST',
      url: '/api/session',
      data: params,
      success: function(user) {
        success(user);
      },
      error: function(response, status) {
        console.log(response.responseJSON.base)
      }
    });
  },
  fetchCurrentUser: function(success, complete) {

    $.ajax({
      type: 'GET',
      url: '/api/session',
      success: function(user) {
        success(user);
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
      success: function() {
        success();
      },
      error: function(response, status) {
        console.log(response.responseJSON.base)
      }
    });
  }
};

module.exports = SessionApiUtil;
