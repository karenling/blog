var React = require('react');

var PostIndexItem = React.createClass({
  createMarkup: function() {
    return { __html: this.props.post.body }
  },
  render: function() {
    return(
      <article>
        <div className='post-title'>{ this.props.post.title }</div>
        <div dangerouslySetInnerHTML={ this.createMarkup() } />
        <div>{ this.props.post.post_date }</div>
      </article>
    )
  }
});

module.exports = PostIndexItem;
