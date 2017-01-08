import React from 'react';
import { connect } from 'react-redux';

import { orderPostsSelector } from '../selectors';

import PostItem from './PostItem'

const _PostIndex = props => {
  if (props.posts) {
    return (
      <div>
        {(props.posts).map(post =>
          <PostItem key={post.id} post={post} postIndex />
        )}
      </div>
    );
  }
  return null;
};

_PostIndex.propTypes = {
  posts: React.PropTypes.array,
};

const PostIndex = connect(
  state => ({
    posts: orderPostsSelector(state),
  }),
)(_PostIndex);

export default PostIndex;
