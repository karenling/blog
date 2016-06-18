var React = require('react');
var Link = require('react-router').Link
var IndexLink = require('react-router').IndexLink

var Navigation = React.createClass({
  render: function() {
    return(
      <div>
        <IndexLink to='/' activeClassName="active">Home</IndexLink>
        <Link to='/about/' activeClassName="active">About</Link>
        <Link to='/contact/' activeClassName="active">Contact</Link>
      </div>
    )
  }
})

module.exports = Navigation;
