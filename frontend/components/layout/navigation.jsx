var React = require('react');
var Link = require('react-router').Link
var IndexLink = require('react-router').IndexLink

var Navigation = React.createClass({
  displayContactForm: function() {
    this.props.updateContactForm(true);
  },
  displayPostNewForm: function() {
    this.props.updatePostNewForm(true);
  },
  render: function() {
    return(
      <div id="navigation">
        <div></div>
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
          <li onClick={ this.displayPostNewForm }><i className="fa fa-pencil"></i></li>
        </ul>
      </div>
    )
  }
})

module.exports = Navigation;
