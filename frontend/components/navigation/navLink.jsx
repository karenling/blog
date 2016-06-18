var React = require('react');

var NavLink = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return(
      { selected: false }
    )
  },
  selectLink: function() {
    this.context.router.push(this.props.route)
    this.setState({
      selected: !this.state.selected
    })
  },
  render: function() {
    if (this.state.selected) {
      style = 'small';
    } else {
      style = '';
    }
    return(
      <div className={ style } onClick={ this.selectLink }>{ this.props.name }</div>
    )
  }
});

module.exports = NavLink;
