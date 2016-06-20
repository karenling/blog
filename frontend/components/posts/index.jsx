var React = require('react');
var ClientActions = require('../../actions/clientActions');
var PostStore = require('../../stores/post');
var PostIndexItem = require('./indexItem');

var PostIndex = React.createClass({
  getInitialState: function() {
    return({
      posts: PostStore.all(),
      page: 1,
      totalCount: PostStore.totalPages(),
      safeToFetch: true
    })
  },
  _onChange: function() {
    this.setState({
      posts: PostStore.all(),
      totalCount: PostStore.totalPages(),
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
    ClientActions.fetchPosts(this.state.page);
    window.addEventListener('scroll', this.thresholdCallback);
  },
  componentWillUnmount: function() {
    this.listener.remove();
    window.removeEventListener('scroll', this.thresholdCallback);
  },
  loadMorePosts: function() {
    if (this.state.safeToFetch && this.state.page < this.state.totalCount) {
      this.setState({
        page: this.state.page += 1,
        safeToFetch: false
      })
      ClientActions.fetchPosts(this.state.page);
    }
  },
  render: function() {
    var loader;
    if (this.state.page < this.state.totalCount) {
      loader = <div className='loader'><div className='dot1'></div><div className='dot2'></div><div className='dot3'></div></div>
    }
    return(
      <div id='react-posts'>
        { this.state.posts.map(function(post) {
          return <PostIndexItem key={ post.id } post={ post } showMoreButton={ true }/>
        })}
        { loader }
      </div>
    )
  }
});

module.exports = PostIndex;
