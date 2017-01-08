import React from 'react';
import { connect } from 'react-redux';

import { postSelector } from '../selectors';

import PostItem from './PostItem';

const _PostShow = props => {
  if (props.post) {
    return <PostItem post={props.post} />;
  }
  return null;
};

_PostShow.propTypes = {
  post: React.PropTypes.object,
};

const PostShow = connect(
  state => ({
    post: postSelector(state),
  }),
)(_PostShow);

export default PostShow;
