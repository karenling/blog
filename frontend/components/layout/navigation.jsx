var React = require('react');
var Link = require('react-router').Link
var IndexLink = require('react-router').IndexLink

var Navigation = React.createClass({
  render: function() {
    return(
      <div id="navigation">
        <div>Twinkie and Karen</div>
        <ul id="navigation-links">
          <li><IndexLink to='/' activeClassName="active">
              <i className="fa fa-home"></i>
            </IndexLink>
          </li>
          <li><Link to='/about/' activeClassName="active">
              <i className="fa fa-user"></i>
            </Link>
          </li>
          <li><Link to='/contact/' activeClassName="active">
              <i className="fa fa-envelope"></i>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
})

module.exports = Navigation;
