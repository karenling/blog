var React = require('react');
var ClientActions = require('../actions/clientActions');

var Contact = React.createClass({
  getInitialState: function() {
    return this.blankState;
  },
  blankState: {
    name: '',
    email: '',
    message: '',
    errorMessage: '',
    successMessage: ''
  },
  handleChange: function(e) {
    var change = {}
    change[e.target.name] = e.target.value;
    this.setState(change)
  },
  handleMessage: function(status, message) {
    if (status === 'successful') {
      this.setState(this.blankState);
      this.setState({ successMessage: message })
    } else {
      this.setState({ errorMessage: message })
    }
  },
  onSubmit: function(e) {
    e.preventDefault();
    ClientActions.sendMessage(this.state, this.handleMessage)
  },
  closeContactModal: function() {
    this.props.updateformDisplay(false);
  },
  render: function() {
    if (this.state.successMessage.length > 0) {
      return(
        <div id='contact-wrapper'>
          <div id='contact'>
            <div className='exit-bar' onClick={ this.closeContactModal }>
              <i className='fa fa-close'></i>
            </div>
            <div className='message-body center'>
              <i className='fa fa-heart'></i>
              <div className='message-intro'>
                { this.state.successMessage }
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div id='contact-wrapper'>
          <div id='contact'>
            <div className='exit-bar' onClick={ this.closeContactModal }>
              <i className='fa fa-close'></i>
            </div>
            <div className='message-body'>
              <div className='message-intro'>
                Feel free to send me a comment, question, anything!
              </div>
              <div className='error-message'>{ this.state.errorMessage }</div>
              <form className='new-message' onSubmit={ this.onSubmit } >
                <input type='text' onChange={ this.handleChange } name='name' value={ this.state.name } placeholder='Name'/>
                <input type='text' onChange={ this.handleChange } name='email' value={ this.state.email } placeholder='Email'/>
                <textarea onChange={ this.handleChange } name='message' value={ this.state.message } placeholder='Message'></textarea>
                <div className='submit-wrapper'>
                  <button><i className='fa fa-paper-plane'></i>Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }

  }
})

module.exports = Contact;
