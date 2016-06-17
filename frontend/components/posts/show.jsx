var React = require('react');
var ClientActions = require('../../actions/clientActions');
var PostStore = require('../../stores/post');
var PostIndexItem = require('./indexItem');

var PostShow = React.createClass({
  getInitialState: function() {
    return({
      post: PostStore.findByFriendlyName(this.props.params.friendlyName)
    })
  },
  componentWillReceiveProps: function() {
    debugger
    ClientActions.fetchOnePost(this.props.params.friendlyName);
  },
  _onChange: function() {
    this.setState({
      post: PostStore.findByFriendlyName(this.props.params.friendlyName)
    })
  },
  componentDidMount: function() {
    this.listener = PostStore.addListener(this._onChange);
    ClientActions.fetchOnePost(this.props.params.friendlyName);
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  render: function() {
    if (this.state.post === undefined) {
      return <div></div>
    } else {
      return <PostIndexItem post={ this.state.post }></PostIndexItem>
    }
  }
})

module.exports = PostShow;
