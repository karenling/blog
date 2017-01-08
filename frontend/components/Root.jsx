import React from 'react';

import { connect } from 'react-redux';

import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import Contact from './Contact';

import { fetchPosts } from '../actions';

class _Root extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="container">
        <NavigationBar />
        <div className="main">{this.props.children}</div>
        <Sidebar />
        <Contact />
      </div>
    );
  }
}

_Root.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  fetchPosts: React.PropTypes.func.isRequired,
};

const Root = connect(
  state => ({
    router: state.router,
  }),
  { fetchPosts },
)(_Root);

export default Root;
