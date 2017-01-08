import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';

import { orderPostsSelector } from '../selectors';
import { fetchPosts } from '../actions';

import PostItem from './PostItem'

class _PostIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillUpdate() {
    this.props.fetchPosts();
  }

  renderPagination() {
    let start = (parseInt(this.props.router.params.page, 10) || 1) - 2;
    let arr = [];
    start = Math.max(1, start);
    let end = Math.min(start + 5, this.props.totalPages);
    for (let i=start; i <= end; i++) {
      arr = arr.concat(i);
    }

    return (
      <div>
        {start > 1 && '...'}
        {arr.map(i =>
          <Link href={`/posts/page/${i}`} key={`pagination-${i}`}>{i}</Link>
        )}
        {end < this.props.totalPages && '...'}
      </div>
    )
  }

  render() {
    if (this.props.posts) {
      return (
        <div>
          {(this.props.posts).map(post =>
            <PostItem key={post.id} post={post} postIndex />
          )}
          {this.renderPagination()}
        </div>
      );
    }
    return null;
  }
}

_PostIndex.propTypes = {
  posts: React.PropTypes.array,
  totalPages: React.PropTypes.number.isRequired,
};

const PostIndex = connect(
  state => ({
    router: state.router,
    posts: orderPostsSelector(state),
    totalPages: state.posts.totalPages,
  }),
  { fetchPosts },
)(_PostIndex);

export default PostIndex;
