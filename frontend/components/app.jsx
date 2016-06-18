var React = require('react');
var Navigation = require('./navigation/bar');

var App = React.createClass({
  render: function() {
    return(
      <div id='react-main'>
        <Navigation></Navigation>
        { this.props.children }
      </div>
    )
  }
});

module.exports = App;
