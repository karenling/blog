var SessionApiUtil = {
  login: function(params) {
    $.ajax({
      type: 'POST',
      url: '/api/session',
      data: params,
      success: function(user) {
        console.log(user.email);
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
        console.log(user.email);
      },
      error: function(response) {
        console.log(response.responseJSON.base)
      }
    });
  },
  logout: function() {
    $.ajax({
      type: 'DELETE',
      url: '/api/session',
      success: function() {
        console.log(arguments);
      },
      error: function(response) {
        console.log(response.responseJSON.base)
      }
    });
  }
};

module.exports = SessionApiUtil;
