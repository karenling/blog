var React = require('react');

var App = React.createClass({
  render: function() {
    return(
      <div id='react-main'>
        { this.props.children }
      </div>
    )
  }
});

module.exports = App;
