import React from 'react';

import { connect } from 'react-redux';

import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import Contact from './Contact';

import { fetchPost, fetchPosts } from '../actions';

class _Root extends React.Component {
  componentDidMount() {
    const router = this.props.router;

    if (router.params.id) {
      this.props.fetchPost();
    } else {
      this.props.fetchPosts();
    }
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
  fetchPost: React.PropTypes.func.isRequired,
  fetchPosts: React.PropTypes.func.isRequired,
};

const Root = connect(
  state => ({
    router: state.router,
  }),
  { fetchPost, fetchPosts },
)(_Root);

export default Root;
