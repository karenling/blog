import React from 'react';
import { connect } from 'react-redux';

import PostItem from './PostItem'

const _PostIndex = props => (
  <div>
    {props.posts.map(post =>
      <PostItem key={post.id} post={post} postIndex />
    )}
  </div>
);

_PostIndex.propTypes = {
  posts: React.PropTypes.array.isRequired,
};

const PostIndex = connect(
  state => ({
    posts: state.posts.posts,
  }),
)(_PostIndex);

export default PostIndex;
