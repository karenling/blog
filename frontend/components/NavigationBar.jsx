import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';
import classNames from 'classnames';

import { toggleContactModal } from '../actions';

class _NavigationBar extends React.Component {
  getClasses(title) {
    const routerTitle = this.props.router.result.title;
    return classNames({
      'navigationBar--link': true,
      'navigationBar--link-is-selected': title && title.indexOf(routerTitle) !== -1,
    });
  }

  getLink(link, icon, title) {
    return (
      <a
        className={this.getClasses(title)}
        rel="noopener noreferrer"
        target="_blank" href={link}
      >
        <i className={icon} />
      </a>
    );
  }

  render() {
    return (
      <nav className="navigationBar">
        <div className="navigationBar--inner">
          <Link href="/about" className={this.getClasses(['About'])}><i className="fa fa-user" /></Link>
          <Link href="/" className={this.getClasses(['Home', 'Post', 'Page'])}>
            <i className="fa fa-pencil" />
          </Link>
          <a onClick={this.props.toggleContactModal} className={this.getClasses()}>
            <i className="fa fa-envelope" />
          </a>
          {this.getLink('http://karenling.net', 'fa fa-folder')}
          {this.getLink('https://www.linkedin.com/in/karensling', 'fa fa-linkedin')}
          {this.getLink('https://github.com/karenling', 'fa fa-github')}
        </div>
      </nav>
    );
  }
}

_NavigationBar.propTypes = {
  toggleContactModal: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
};

const NavigationBar = connect(
  state => ({
    router: state.router,
  }),
  { toggleContactModal },
)(_NavigationBar);

export default NavigationBar;
