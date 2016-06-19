var React = require('react');
var ClientActions = require('../../actions/clientActions');

var PostNew = React.createClass({
  getInitialState: function() {
    return({
      title: this.props.post.title,
      header_image: this.props.post.header_image || '',
      body: this.props.post.body,
      status: this.props.post.status,
      post_date: this.props.post.post_date_for_field,
      tag_list: this.props.post.tag_list,
      friendly_name: this.props.post.friendly_name
    });
  },
  handleChange: function(e) {
    change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  },
  onSubmit: function(e) {
    e.preventDefault();
    ClientActions.updatePost(this.state);
    this.toggleView();
  },
  toggleView: function() {
    this.props.toggleView();
  },
  render: function() {
    return(
      <div id='edit-post-wrapper'>
        <div id='edit-post'>
          <div className='exit-bar' onClick={ this.toggleView }>
            <i className='fa fa-close'></i>
          </div>
          <div className='new-post-body'>
            <form class='edit-post' onSubmit={ this.onSubmit }>
              <input type='text' onChange={ this.handleChange } name='title' value={ this.state.title } placeholder='Title' />
              <input type='text' onChange={ this.handleChange } name='header_image' value={ this.state.header_image } placeholder='Header Image' />
              <textarea onChange={ this.handleChange } name='body' value={ this.state.body } placeholder='Body'></textarea>
              <select onChange={ this.handleChange } name='status' value={ this.state.status }>
                <option value="0">private</option>
                <option value="1">draft</option>
                <option value="2">public</option>
              </select>
              <input type='datetime-local' onChange={ this.handleChange } name='post_date' value={ this.state.post_date } placeholder='Post Date' />
              <input type='text' onChange={ this.handleChange } name='tag_list' value={ this.state.tag_list } placeholder='Tags List' />
              <div className='submit-wrapper'>
                <button><i className='fa fa-pencil'></i>Edit Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = PostNew;
