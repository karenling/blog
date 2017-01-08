import React from 'react';
import { connect } from 'react-redux';
import Modal from 'simple-react-modal';

import { toggleContactModal, sendMessage } from '../actions';

class _Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      success: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    if (this.state.success) {
      this.setState({
        name: '',
        email: '',
        message: '',
        success: false,
      });
    }
    this.props.toggleContactModal();
  }

  handleChange(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state, this.handleSuccess, this.handleError);
  }

  handleSuccess() {
    this.setState({
      success: true,
    });
  }

  handleError(jqXHR, textStatus, errorThrown) {
    console.log('error');
  }

  renderHeading() {
    if (this.state.success) {
      return (
        <div>
          <i className="fa fa-paper-plane contact--icon" />
          <div className="u-headingText">
            Thank you, {this.state.name}! Your message has been sent!
          </div>
        </div>
      );
    }
    return (
      <div>
        <i className="fa fa-envelope contact--icon" />
        <div className="u-headingText">Thank you for wanting to get in touch!</div>
      </div>
    );
  }

  renderForm() {
    return (
      <div className="modal--body">
        <form className="new-message" onSubmit={this.handleSubmit}>
          <div className="u-sideBySide">
            <input
              className="form--input"
              type="text"
              onChange={this.handleChange}
              name="name"
              value={this.state.name}
              placeholder="Name"
            />
            <input
              className="form--input"
              type="text"
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
              placeholder="Email"
            />
          </div>
          <input
            className="form--input u-fullWidth"
            onChange={this.handleChange}
            name="message"
            value={this.state.message}
            placeholder="Message"
          />
          <br />
          <br />
          <button className="btn btn--primary u-fullWidth">Send</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <Modal
        show={this.props.contactModal}
        onClose={this.handleClose}
        containerClassName="modal"
      >
        <div className="modal--heading">
          {this.renderHeading()}
        </div>
        {!this.state.success && this.renderForm()}
      </Modal>
    );
  }
}

_Contact.propTypes = {
  contactModal: React.PropTypes.bool,
  toggleContactModal: React.PropTypes.func.isRequired,
  sendMessage: React.PropTypes.func.isRequired,
};

const Contact = connect(
  state => ({
    contactModal: state.modals.contactModal,
  }),
  {
    toggleContactModal,
    sendMessage,
  },
)(_Contact);

export default Contact;
