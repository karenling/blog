var React = require('react');
var SessionActions = require('../actions/sessionActions');
var SessionStore = require('../stores/session');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return({
      user_email: '',
      user_password: '',
      errorMessage: ''
    })
  },
  handleChange: function(e) {
    change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  },
  onSubmit: function(e) {
    e.preventDefault();
    SessionActions.login(this.state);
  },
  logout: function() {
    SessionActions.logout();
  },
  _onChange: function() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push('/');
    }
  },
  componentDidMount: function() {
    SessionStore.addListener(this._onChange);
  },
  render: function() {
    return(
      <div>
        <form className='login-form' onSubmit={ this.onSubmit }>
          <input type='text' onChange={ this.handleChange } name='user_email' value={ this.state.user_email } />
          <input type='text' onChange={ this.handleChange } name='user_password' value={ this.state.user_password } />
          <button>Login</button>
        </form>
        <div onClick={ this.logout }>Logout</div>
      </div>
    )
  }
});

module.exports = LoginForm;
