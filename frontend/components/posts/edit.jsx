var React = require('react');

var PostNew = React.createClass({
  getInitialState: function() {
    return(this.blankState);
  },
  blankState: {
    title: '',
    headerImage: '',
    body: ''
  },
  handleChange: function(e) {
    change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  },
  onSubmit: function() {
    console.log('submit');
  },
  render: function() {
    return(
      <div>
        <form class='edit-post' onSubmit={ this.onSubmit }>
          <input type='text' onChange={ this.handleChange } name='title' value={ this.state.title } placeholder='Title' />
          <input type='text' onChange={ this.handleChange } name='headerImage' value={ this.state.headerImage } placeholder='Header Image' />
          <textarea onChange={ this.handleChange } name='body' value={ this.state.body } placeholder='Body'></textarea>
        </form>
      </div>
    )
  }
});

module.exports = PostNew;
