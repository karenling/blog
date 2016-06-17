var React = require('react');

var PostIndexItem = React.createClass({
  createMarkup: function() {
    return { __html: this.props.post.body }
  },
  render: function() {
    var status;
    if (this.props.post.status) {
      status = <div>{ this.props.post.status }</div>
    }

    return(
      <article>
        <div className='post-title'>{ this.props.post.title }</div>
        <div className='post-header-img'><img src={ this.props.post.header_image }></img></div>
        <div dangerouslySetInnerHTML={ this.createMarkup() } />
        <div>{ this.props.post.post_date }</div>
        { status }
      </article>
    )
  }
});

module.exports = PostIndexItem;
