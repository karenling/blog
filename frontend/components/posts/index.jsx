var React = require('react');
var ClientActions = require('../../actions/clientActions');
var PostStore = require('../../stores/post');
var PostIndexItem = require('./indexItem');

var PostIndex = React.createClass({
  getInitialState: function() {
    return({
      posts: PostStore.all()
    })
  },
  _onChange: function() {
    this.setState({
      posts: PostStore.all()
    })
  },
  componentDidMount: function() {
    this.listener = PostStore.addListener(this._onChange);
    ClientActions.fetchAllPosts();
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  render: function() {
    return(
      <div id='react-posts'>
        { this.state.posts.map(function(post, idx) {
          return <PostIndexItem key={ idx } post={ post }/>
        })}
      </div>
    )
  }
});

module.exports = PostIndex;
