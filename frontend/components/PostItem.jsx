import React from 'react';
import moment from 'moment';
import { Link } from 'redux-little-router';

class PostItem extends React.Component {
  getDate() {
    return moment(this.props.post.post_date, 'YYYY-MM-DD HH:MM:SSZZ').format('MMMM D, YYYY');
  }

  getPermalink() {
    return `/posts/${this.props.post.friendly_name}`;
  }

  getBody() {
    const body = this.props.postIndex ? this.props.post.preview : this.props.post.body;
    return (
      <div className="post--body" dangerouslySetInnerHTML={{ __html: body }} />
    );
  }

  getReadMore() {
    const { postIndex, post: { preview, body } } = this.props;
    if (postIndex && preview !== body) {
      return (
        <Link href={this.getPermalink()} className="btn btn--primary">
          Continue Reading
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
            <h3 className="post--title">{this.props.post.title}</h3>
          </Link>
          <div className="post--date">{this.getDate()}</div>
          {this.getBody()}
          {this.getReadMore()}
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
