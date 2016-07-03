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
  _onChange: function() {
    this.setState({
      post: PostStore.findByFriendlyName(this.props.params.friendlyName)
    })
    PR.prettyPrint();
  },
  componentDidMount: function() {
    this.listener = PostStore.addListener(this._onChange);
    if (this.state.post == undefined) {
      ClientActions.fetchOnePost(this.props.params.friendlyName);
    }
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  render: function() {
    if (this.state.post === undefined) {
      return <div></div>
    } else {
      return(
        <div id='react-post'>
          <PostIndexItem post={ this.state.post } showMoreButton={ false }></PostIndexItem>
        </div>
      )
    }
  }
})

module.exports = PostShow;
