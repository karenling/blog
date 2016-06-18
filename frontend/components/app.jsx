var React = require('react');
var Navigation = require('./layout/navigation');
var Footer = require('./layout/footer');
var Contact = require('./contact');

var App = React.createClass({
  getInitialState: function() {
    return {
      showContactForm: false
    }
  },
  handleUpdateFormDisplay: function(bool) {
    this.setState({ showContactForm: bool })
  },
  render: function() {
    if (this.state.showContactForm) {
      contact = <Contact updateformDisplay={ this.handleUpdateFormDisplay }></Contact>
    } else {
      contact = null
    }
    return(
      <div id='react-main'>
        <Navigation updateformDisplay={ this.handleUpdateFormDisplay }></Navigation>
        { this.props.children }
        <Footer></Footer>
        { contact }
      </div>
    )
  }
});

module.exports = App;
