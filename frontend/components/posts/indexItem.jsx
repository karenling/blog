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
    var status;
    if (this.props.post.status) {
      status = <span className='post-status'> | { this.props.post.status }</span>
    }
    var postLink = "/posts/" + this.props.post.friendly_name
    return(
      <article>
        <div className='post-title'><Link to={ postLink }>{ this.props.post.title }</Link></div>
        <div className='post-detail'><em>By</em> Karen <em>on</em> { this.props.post.post_date } { status }</div>
        <div className='post-body' dangerouslySetInnerHTML={ this.createMarkup() } />
        <div className='post-more'><Link to={ postLink }>Read More</Link></div>
      </article>
    )
  }
});

module.exports = PostIndexItem;
