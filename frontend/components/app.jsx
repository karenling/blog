var React = require('react');
var Navigation = require('./layout/navigation');
var Footer = require('./layout/footer');
var Contact = require('./contact');

var App = React.createClass({
  render: function() {
    return(
      <div id='react-main'>
        <Navigation></Navigation>
        <Contact></Contact>
        { this.props.children }
        <Footer></Footer>         
      </div>
    )
  }
});

module.exports = App;
