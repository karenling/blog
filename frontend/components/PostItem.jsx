import React from 'react';
import moment from 'moment';
import { Link } from 'redux-little-router';
import ReactDOM from 'react-dom';

class PostItem extends React.Component {
  componentDidMount() {
    const $lastParagraph = $(this.element).find('p:last-child');
    $lastParagraph.append($(`.${this.getContinueSelector()}`));
  }

  getContinueSelector() {
    return `js-continue-${this.props.post.id}`;
  }

  getDate() {
    return moment(this.props.post.post_date, 'X').format('MMMM D, YYYY');
  }

  getPermalink() {
    return `/posts/${this.props.post.friendly_name}`;
  }

  getBody() {
    const body = this.props.postIndex ? this.props.post.preview : this.props.post.body;
    return (
      <div className="post--body" ref={c => (this.element = c)}>
        <span dangerouslySetInnerHTML={{ __html: body }} />
        {this.getReadMore()}
      </div>
    );
  }

  getReadMore() {
    const { postIndex, post: { preview, body } } = this.props;
    if (postIndex && preview !== body) {
      return (
        <Link className={this.getContinueSelector()} href={this.getPermalink()}>
          {'\n'}Continue reading...
        </Link>
      );
    }
    return null;
  }

  render() {
    if (this.props.post) {
      return (
        <div className="post">
          <Link href={this.getPermalink()}>
            <h2 className="post--title">{this.props.post.title}</h2>
          </Link>
          <div className="post--date">{this.getDate()}</div>
          {this.getBody()}
        </div>
      );
    }
    return null;
  }
}

PostItem.propTypes = {
  post: React.PropTypes.object,
  postIndex: React.PropTypes.bool,
};

export default PostItem;
