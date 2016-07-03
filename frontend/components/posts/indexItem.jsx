var React = require('react');
var Link = require('react-router').Link;
var PostEdit = require('./edit');
var SessionStore = require('../../stores/session');

var PostIndexItem = React.createClass({
  getInitialState: function() {
    return({
      showEdit: false,
      postBody: this.props.postBody,
      showMoreButton: this.props.showMoreButton
    })
  },
  createMarkup: function() {
    var image;
    if (this.props.post.header_image) {
      var image = "<p><img src='" + this.props.post.header_image + "'/></p>"
    } else {
      image = ''
    }
    return { __html: image + this.state.postBody}
  },
  toggleView: function() {
    this.setState({
      showEdit: !this.state.showEdit
    })
  },
  toggleFullPost: function() {
    this.setState({
      postBody: this.props.post.body,
      showMoreButton: false
    })
    var route = '/posts/' + this.props.post.friendly_name;
    history.replaceState({}, route, route)
  },
  render: function() {
    var postLink = "/posts/" + this.props.post.friendly_name
    var editLink;
    var status;
    if (this.props.post.status) {
      status = <span className='post-status'> | { this.props.post.status }</span>
      editLink = <span>| <span className='link-style' onClick={ this.toggleView }>Edit</span></span>
    }

    var moreButton;
    if (this.state.showMoreButton) {
      moreButton = <div className='post-more'><span onClick={ this.toggleFullPost }>Read More</span></div>
    }

    var view;
    if (SessionStore.isUserLoggedIn() && this.state.showEdit) {
      view = <PostEdit key={ this.props.post.friendly_name + 'edit' } post={ this.props.post } toggleView={ this.toggleView }/>
    }

    return(
      <article>
        <div className='post-title'><Link to={ postLink }>{ this.props.post.title }</Link></div>
        <div className='post-detail'>
          <em>By</em> Karen <em>on</em> { this.props.post.post_date }
          { status } { editLink }
        </div>
        <div className='post-body' dangerouslySetInnerHTML={ this.createMarkup() } />
        { moreButton }
        { view }
      </article>
    )
  }
});

module.exports = PostIndexItem;
