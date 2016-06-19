var React = require('react');
var ClientActions = require('../actions/clientActions');
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
  handleMessage: function(status, message) {
    if (status == 'success') {

    } else {
      this.setState({
        errorMessage: message
      })
    }
  },
  onSubmit: function(e) {
    e.preventDefault();
    ClientActions.login(this.state, this.handleMessage);
  },
  logout: function() {
    ClientActions.logout(this.handleMessage);
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
        { this.state.errorMessage }
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
