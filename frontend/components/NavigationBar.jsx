import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';

import { toggleContactModal } from '../actions';

const _NavigationBar = props => (
  <nav className="navigationBar">
    <div className="navigationBar--inner">
      <Link href="/" className="navigationBar--link">Home</Link>
      <Link href="/about" className="navigationBar--link">About</Link>
      <a onClick={props.toggleContactModal} className="navigationBar--link">Contact</a>
    </div>
  </nav>
);

_NavigationBar.propTypes = {
  toggleContactModal: React.PropTypes.func.isRequired,
};

const NavigationBar = connect(
  state => ({
    router: state.router,
  }),
  { toggleContactModal },
)(_NavigationBar);

export default NavigationBar;
