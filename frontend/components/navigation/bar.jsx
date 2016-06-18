var React = require('react');
var NavLink = require('./navLink');

var Navigation = React.createClass({
  getInitialState: function() {
    return({
      'Home': '/',
      'About': '/about'
    })
  },
  render: function() {
    return(
      <div>
        { Object.keys(this.state).map(function(name, idx) {
          return( <NavLink key={ idx } name={ name } route={ this.state[name] }/>)
        }.bind(this))}
      </div>
    )
  }
})

module.exports = Navigation;
