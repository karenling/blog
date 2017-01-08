import React from 'react';
import { Link } from 'redux-little-router';

import Contact from './Contact';

const Root = props => (
  <div>
    <nav className="navigationBar">
      <Link href="/posts" className="navigationBar--link">Posts</Link>
      <Link href="/about" className="navigationBar--link">About</Link>
    </nav>
    {props.children}
    <Contact />
  </div>
);

Root.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default Root;
