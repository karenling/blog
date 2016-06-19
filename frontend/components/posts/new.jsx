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
    tag_list: '',
    errorMessage: ''
  },
  handleChange: function(e) {
    change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  },
  closeNewPostModal: function() {
    this.props.updatePostNewForm(false);
  },
  handleMessage: function(status, message) {
    if (status === 'success') {
      this.setState(this.blankState);
      this.props.updatePostNewForm(false);
    } else {
      this.setState({ errorMessage: message })
    }
  },
  onSubmit: function(e) {
    e.preventDefault();
    ClientActions.createPost(this.state, this.handleMessage)
  },
  render: function() {

    return(
      <div id='new-post-wrapper'>
        <div id='new-post'>
          <div className='exit-bar' onClick={ this.closeNewPostModal }>
            <i className='fa fa-close'></i>
          </div>
          <div className='new-post-body'>
            <div className='error-message'>{ this.state.errorMessage.slice(0, 200) }</div>
            <form class='new-post' onSubmit={ this.onSubmit }>
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
                <button><i className='fa fa-pencil'></i>Create Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )

  }
});

module.exports = PostEdit;
