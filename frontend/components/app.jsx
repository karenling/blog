var React = require('react');
var Navigation = require('./layout/navigation');
var Footer = require('./layout/footer');
var Contact = require('./contact');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var NewPostForm = require('./posts/new');

var App = React.createClass({
  getInitialState: function() {
    return {
      showContactForm: false,
      showPostNewForm: false
    }
  },
  handleUpdateFormDisplay: function(bool) {
    this.setState({ showContactForm: bool })
  },
  handleShowPostNewForm: function(bool) {
    this.setState({ showPostNewForm: bool })
  },
  render: function() {
    if (this.state.showContactForm) {
      contact = <Contact updateContactForm={ this.handleUpdateFormDisplay }></Contact>
    } else {
      contact = null
    }

    if (this.state.showPostNewForm) {
      postForm = <NewPostForm updatePostNewForm={ this.handleShowPostNewForm }></NewPostForm>
    } else {
      postForm = null
    }

    return(
      <div id='react-main'>
        <Navigation updatePostNewForm={ this.handleShowPostNewForm } updateContactForm={ this.handleUpdateFormDisplay }></Navigation>
        { this.props.children }
        <Footer></Footer>

        <ReactCSSTransitionGroup transitionName='auto' transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { contact }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName='auto' transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { postForm }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

module.exports = App;
