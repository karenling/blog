var React = require('react');
var ClientActions = require('../../actions/clientActions');
var PostStore = require('../../stores/post');
var PostIndexItem = require('./indexItem');

var PostIndex = React.createClass({
  getInitialState: function() {
    return({
      posts: PostStore.all(),
      limit: parseInt(TwinkieandKaren.PER_PAGE),
      totalCount: PostStore.totalPosts(),
      safeToFetch: true
    })
  },
  _onChange: function() {
    this.setState({
      posts: PostStore.all(),
      totalCount: PostStore.totalPosts(),
      safeToFetch: true
    })
  },
  thresholdCallback: function() {
    var thresholdOfLoader = document.getElementById('footer').getBoundingClientRect().top + document.body.scrollTop;
    var bottomOfPage = window.pageYOffset + window.innerHeight;
    if (bottomOfPage > thresholdOfLoader) {
      this.loadMorePosts();
    }
  },
  componentDidMount: function() {
    this.listener = PostStore.addListener(this._onChange);
    ClientActions.fetchPosts(this.state.limit);
    window.addEventListener('scroll', this.thresholdCallback);
  },
  componentWillUnmount: function() {
    this.listener.remove();
    window.removeEventListener('scroll', this.thresholdCallback);
  },
  loadMorePosts: function() {
    if (this.state.safeToFetch) {
      this.setState({
        limit: this.state.limit += parseInt(TwinkieandKaren.PER_PAGE),
        safeToFetch: false
      })
      ClientActions.fetchPosts(this.state.limit);
    }
  },
  render: function() {
    return(
      <div id='react-posts'>
        { this.state.posts.map(function(post) {
          return <PostIndexItem key={ post.id } post={ post } showMoreButton={ true }/>
        })}
      </div>
    )
  }
});

module.exports = PostIndex;
