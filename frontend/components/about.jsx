import React from 'react';
import { connect } from 'react-redux';
import { toggleContactModal } from '../actions';

class _About extends React.Component {
  render() {
    return (
      <div className="post">
        <h2 className="post--title">About</h2>
        <div className="post--body">
          <p>
            Hi! My name is <strong>Karen</strong> and <strong>Twinkie</strong> is my amazing friend, who happens to be a
            dog. This blog was created as a way to keep my thoughts and write about my adventures
            with Twinkie.
          </p>
          <p>
            I'm a <strong>software engineer</strong> with a love for front end. Outside of coding,
            I dabble in photography, and eating carbs. I think <strong>focaccia bread</strong>{'\n'}
            is fantastic, I’ve never turned down a <strong>red velvet cupcake</strong> or{'\n'}
            <strong>banana or coconut cream pie</strong>, and I love{'\n'}
            <strong>Japanese ramen</strong>.{'\n'}
          </p>
          <p>
            <strong>Twinkie</strong>, on the otherhand, prefers liver and steak. Unfortunately,
            she is diabetic, so treats are very limited. 😔
          </p>
          <p>
            <a className="link-style" onClick={this.props.toggleContactModal}>
              Feel free to send me a message.
            </a>
          </p>
        </div>
      </div>
    );
  }
}

_About.propTypes = {
  toggleContactModal: React.PropTypes.func.isRequired,
};

const About = connect(
  null,
  { toggleContactModal },
)(_About);

export default About;
