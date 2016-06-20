var React = require('react');
var Link = require('react-router').Link
var IndexLink = require('react-router').IndexLink
var SessionStore = require('../../stores/session');
var SessionActions = require('../../actions/sessionActions');

var Navigation = React.createClass({
  displayContactForm: function() {
    this.props.updateContactForm(true);
  },
  displayPostNewForm: function() {
    this.props.updatePostNewForm(true);
  },
  logout: function() {
    SessionActions.logout();
  },
  render: function() {
    var newPostLink;
    var signOutLink;
    if (SessionStore.isUserLoggedIn()) {
      newPostLink = <li onClick={ this.displayPostNewForm }><i className="fa fa-pencil"></i></li>
      signOutLink = <li onClick={ this.logout }><i className='fa fa-sign-out'></i></li>
    }

    return(
      <div id="navigation">
        <div>
        </div>
        <ul id="navigation-links">
          <li><IndexLink to='/' activeClassName="active">
              <i className="fa fa-home"></i>
            </IndexLink>
          </li>
          <li><Link to='/about/' activeClassName="active">
              <i className="fa fa-user"></i>
            </Link>
          </li>
          <li onClick={ this.displayContactForm }><i className="fa fa-envelope"></i></li>
          { newPostLink }
          { signOutLink }
        </ul>
      </div>
    )
  }
})

module.exports = Navigation;
