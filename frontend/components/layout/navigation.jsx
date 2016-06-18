var React = require('react');
var Link = require('react-router').Link
var IndexLink = require('react-router').IndexLink

var Navigation = React.createClass({
  render: function() {
    return(
      <div id="navigation">
        <ul id="navigation-links">
          <li><IndexLink to='/' activeClassName="active">Home</IndexLink></li>
          <li><Link to='/about/' activeClassName="active">About</Link></li>
          <li><Link to='/contact/' activeClassName="active">Contact</Link></li>
        </ul>
      </div>
    )
  }
})

module.exports = Navigation;
