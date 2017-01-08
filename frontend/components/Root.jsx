import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';

import Contact from './Contact';

import { toggleContactModal } from '../actions';

const _Root = props => (
  <div>
    <nav className="navigationBar">
      <Link href="/posts" className="navigationBar--link">Posts</Link>
      <Link href="/about" className="navigationBar--link">About</Link>
      <a onClick={props.toggleContactModal} className="navigationBar--link">Contact</a>
    </nav>
    {props.children}
    <Contact />
  </div>
);

_Root.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  toggleContactModal: React.PropTypes.func.isRequired,
};

const Root = connect(
  state => ({
    router: state.router,
  }),
  { toggleContactModal },
)(_Root);

export default Root;
