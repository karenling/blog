import React from 'react';
import { connect } from 'react-redux';

import { postSelector } from '../selectors';

import PostItem from './PostItem';

const _PostShow = props => (
  <PostItem post={props.post} />
);

_PostShow.propTypes = {
  post: React.PropTypes.object,
};

const PostShow = connect(
  state => ({
    post: postSelector(state),
  }),
)(_PostShow);

export default PostShow;
