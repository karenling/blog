var React = require('react');

var About = React.createClass({
  render: function() {
    return(
      <div id='about'>
        <article>
          <div className='about-title'>
            About
          </div>
          <div className='about-body'>
            <p>
              Hi! My name is <b>Karen</b>. Previously a Berkeley biology grad, and now a <b>software engineer</b>, and I could not be happier coding all day and all night (well, except to hang out with my amazing friend/dog, <b>Twinkie</b>!). Currently, I’m working in Berkeley, California, as a full-stack dev. I think <b>focaccia bread</b> is fantastic, I’ve never turned down a <b>red velvet cupcake</b> or <b>banana cream pie</b>, and I love <b>Japanese ramen</b>. I think carbs are amazing. Feel free to send me a message.
            </p>
          </div>
        </article>
      </div>
    )
  }
});

module.exports = About;
