var React = require('react');
var ClientActions = require('../../actions/clientActions');
var PostStore = require('../../stores/post');
var PostIndexItem = require('./indexItem');

var PostIndex = React.createClass({
  getInitialState: function() {
    return({
      posts: PostStore.all(),
      limit: parseInt(TwinkieandKaren.PER_PAGE),
      totalCount: PostStore.totalPosts()
    })
  },
  _onChange: function() {
    this.setState({
      posts: PostStore.all()
    })
  },
  componentDidMount: function() {
    this.listener = PostStore.addListener(this._onChange);
    ClientActions.fetchPosts(this.state.limit);
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  loadMorePosts: function() {
    this.setState({
      limit: this.state.limit += parseInt(TwinkieandKaren.PER_PAGE)
    })
    ClientActions.fetchPosts(this.state.limit);

  },
  loadMoreButton: function() {
    if (this.state.limit >= this.state.total) {
      return( <div>hi hi</div>)
    } else {
      return( <div onClick={ this.loadMorePosts }>Load More</div> )
    }
  },
  render: function() {
    return(
      <div id='react-posts'>
        { this.state.posts.map(function(post, idx) {
          return <PostIndexItem key={ idx } post={ post } showMoreButton={ true }/>
        })}
        { this.loadMoreButton() }
      </div>
    )
  }
});

module.exports = PostIndex;
