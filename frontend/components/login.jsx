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
      user_password: ''
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
  _onChange: function() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push('/');
    }
  },
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.sessionListener.remove();
  },
  render: function() {
    return(
      <div>
        <form className='login-form' onSubmit={ this.onSubmit }>
          <input type='text' onChange={ this.handleChange } name='user_email' value={ this.state.user_email } />
          <input type='password' onChange={ this.handleChange } name='user_password' value={ this.state.user_password } />
          <button>Login</button>
        </form>
      </div>
    )
  }
});

module.exports = LoginForm;
