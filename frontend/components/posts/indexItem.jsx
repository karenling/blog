var React = require('react');
var Link = require('react-router').Link;

var PostIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  createMarkup: function() {
    return { __html: this.props.post.body }
  },
  render: function() {
    var postLink = "/posts/" + this.props.post.friendly_name
    var editLink = "/posts/"  + this.props.post.friendly_name + "/edit"
    var status;
    if (this.props.post.status) {
      status = <span className='post-status'> | { this.props.post.status }</span>
      editLink = <span>| <Link to={ editLink }>Edit</Link></span>
    }

    var moreButton;
    if (this.props.showMoreButton) {
      moreButton = <div className='post-more'><Link to={ postLink }>Read More</Link></div>
    }

    return(
      <article>
        <div className='post-title'><Link to={ postLink }>{ this.props.post.title }</Link></div>
        <div className='post-detail'>
          <em>By</em> Karen <em>on</em> { this.props.post.post_date }
          { status } {editLink }
        </div>
        <div className='post-body' dangerouslySetInnerHTML={ this.createMarkup() } />
        { moreButton }
      </article>
    )
  }
});

module.exports = PostIndexItem;
