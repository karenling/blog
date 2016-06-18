var React = require('react');
var ClientActions = require('../../actions/clientActions');

var PostEdit = React.createClass({
  getInitialState: function() {
    return(this.blankState);
  },
  blankState: {
    title: '',
    header_image: '',
    body: '',
    status: 0,
    post_date: '',
    tag_list: ''
  },
  handleChange: function(e) {
    change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  },
  onSubmit: function(e) {
    e.preventDefault();
    ClientActions.createPost(this.state)
  },
  render: function() {
    return(
      <div>
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
          <button>Create Post</button>
        </form>
      </div>
    )
  }
});

module.exports = PostEdit;
