import React from 'react';
import { connect } from 'react-redux';

import { toggleContactModal } from '../actions';

const _link = (link, icon) => (
  <a
    className="sideBar--socialMediaLink"
    rel="noopener noreferrer"
    target="_blank" href={link}
  >
    <i className={icon} />
  </a>
);

const _Sidebar = props => (
  <div className="sidebar">
    <img
      role="presentation"
      className="sidebar--profileImage"
      src="https://dl.dropboxusercontent.com/u/2330299/blog/design/2016-07-19-profile.png"
    />
    <p className="sidebar--intro">
      <em>Just a personal blog to keep my thoughts and write about my adventures with Twinkie.</em>
    </p>
    <div className="sidebar--socialMedia">
      {_link('https://www.linkedin.com/in/karensling', 'fa fa-linkedin')}
      {_link('https://github.com/karenling', 'fa fa-github')}
      {_link('https://www.instagram.com/hellotwinkie/', 'fa fa-instagram')}
      <a
        onClick={props.toggleContactModal}
        className="sideBar--socialMediaLink"
      >
        <i className="fa fa-envelope" />
      </a>
      {_link('/feed', 'fa fa-rss')}
    </div>
  </div>
);

_Sidebar.propTypes = {
  toggleContactModal: React.PropTypes.func.isRequired,
};

const Sidebar = connect(
  null,
  { toggleContactModal },
)(_Sidebar);

export default Sidebar;
