import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';

import { orderPostsSelector } from '../selectors';
import { fetchPosts } from '../actions';

import PostItem from './PostItem';

class _PostIndex extends React.Component {
  constructor(props) {
    super(props);
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  getNextPage() {
    const page = parseInt(this.props.router.params.page || 1, 10) + 1;
    return page > this.props.totalPages ? null : page;
  }

  loadNextPage() {
    this.props.fetchPosts(this.getNextPage());
  }

  renderPagination() {
    const nextPage = this.getNextPage();
    if (nextPage) {
      return (
        <div>
          <Link
            replaceState
            onClick={this.loadNextPage}
            href={`/posts/page/${this.getNextPage()}`}
            className="btn btn--loadMore"
          >
            Load More
          </Link>
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.props.posts) {
      return (
        <div>
          {(this.props.posts).map(post =>
            <PostItem key={post.id} post={post} postIndex />,
          )}
          {this.renderPagination()}
        </div>
      );
    }
    return null;
  }
}

_PostIndex.propTypes = {
  router: React.PropTypes.object.isRequired,
  posts: React.PropTypes.array,
  totalPages: React.PropTypes.number.isRequired,
  fetchPosts: React.PropTypes.func.isRequired,
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
