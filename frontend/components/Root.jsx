import React from 'react';

import { connect } from 'react-redux';

import NavigationBar from './NavigationBar';
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
      <div>
        <div className="container">
          <div className="main">{this.props.children}</div>
          <aside className="sidebar">
            <section className="sidebar--section">
              <img role="presentation" src={window.profile_url} width="100%" />
              <p>Hello! I{'\''}m Karen and Twinkie is my best friend!</p>
            </section>
            <section className="sidebar--section"><NavigationBar /></section>
          </aside>
        </div>
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
  router: React.PropTypes.object.isRequired,
};

const Root = connect(
  state => ({
    router: state.router,
  }),
  { fetchPost, fetchPosts },
)(_Root);

export default Root;
